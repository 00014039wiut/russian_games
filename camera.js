// Camera Quiz: the player sees themselves on camera and picks the correct
// Russian word by holding their index finger over one of four boxes.
// Hand tracking runs entirely in the browser with MediaPipe — no server needed.

(() => {
  const MP_VERSION = '0.10.14';
  const MP_BASE = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VERSION}`;
  const MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';

  const QUESTIONS_PER_ROUND = 10;
  const START_LIVES = 3;
  const HOLD_MS = 1000;        // how long the finger must stay on a box to select it
  const FEEDBACK_MS = 1400;    // pause after an answer before the next question
  const SMOOTHING = 0.5;       // 0 = no smoothing, closer to 1 = smoother but laggier
  const INDEX_FINGER_TIP = 8;

  const section = document.getElementById('camera-game');
  const menuEl = document.getElementById('menu');
  const stage = document.getElementById('cam-stage');
  const video = document.getElementById('cam-video');
  const cursor = document.getElementById('cam-cursor');
  const promptEl = document.getElementById('cam-prompt');
  const statusEl = document.getElementById('cam-status');
  const scoreEl = document.getElementById('cam-score');
  const livesEl = document.getElementById('cam-lives');
  const progressEl = document.getElementById('cam-progress');
  const endEl = document.getElementById('cam-end');
  const endTextEl = document.getElementById('cam-end-text');
  const boxes = Array.from(document.querySelectorAll('.cam-choice'));

  let handLandmarker = null;
  let stream = null;
  let rafId = null;
  let lastVideoTime = -1;

  const game = {
    questions: [],
    index: 0,
    score: 0,
    lives: START_LIVES,
    correct: null,
    locked: true,       // true while showing feedback / not playing
    armed: false,       // finger must leave all boxes before a new selection can start
    hoverBox: null,
    hoverStart: 0,
    cursor: null,       // smoothed {x, y} in stage pixels
  };

  // ---------- vocabulary ----------

  function shuffleArr(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function uniqueByRussian(items) {
    const seen = new Set();
    return items.filter((item) => {
      if (seen.has(item.russian)) return false;
      seen.add(item.russian);
      return true;
    });
  }

  // Single words fit the boxes best, so use the word list (not the long phrases).
  const vocab = uniqueByRussian(originalTranslationVocabulary);

  function buildChoices(q) {
    // Exclude words with the same Uzbek meaning (e.g. "tor" = узкий / узкие),
    // otherwise two boxes could both be correct.
    const wrong = shuffleArr(vocab.filter((v) => v.uzbek !== q.uzbek && v.russian !== q.russian))
      .slice(0, 3)
      .map((v) => v.russian);
    return shuffleArr([q.russian, ...wrong]);
  }

  // ---------- setup / teardown ----------

  async function loadHandLandmarker() {
    if (handLandmarker) return handLandmarker;
    const { FilesetResolver, HandLandmarker } = await import(`${MP_BASE}/vision_bundle.mjs`);
    const fileset = await FilesetResolver.forVisionTasks(`${MP_BASE}/wasm`);
    const options = (delegate) => ({
      baseOptions: { modelAssetPath: MODEL_URL, delegate },
      runningMode: 'VIDEO',
      numHands: 1,
    });
    try {
      handLandmarker = await HandLandmarker.createFromOptions(fileset, options('GPU'));
    } catch (err) {
      console.warn('GPU delegate failed, falling back to CPU', err);
      handLandmarker = await HandLandmarker.createFromOptions(fileset, options('CPU'));
    }
    return handLandmarker;
  }

  async function startCamera() {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
      audio: false,
    });
    video.srcObject = stream;
    await video.play();
    // Make the stage match the camera's aspect ratio so landmark coordinates map 1:1.
    stage.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
  }

  function stopCamera() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    if (stream) stream.getTracks().forEach((t) => t.stop());
    stream = null;
    video.srcObject = null;
    lastVideoTime = -1;
  }

  async function open() {
    menuEl.classList.add('hidden');
    section.classList.remove('hidden');
    endEl.classList.add('hidden');
    resetBoxes();
    promptEl.textContent = '';
    setStatus('Загрузка камеры и модели… / Kamera va model yuklanmoqda…');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus('Этот браузер не поддерживает камеру. Можно нажимать на ответы мышкой.');
      startRound();
      return;
    }

    try {
      await Promise.all([startCamera(), loadHandLandmarker()]);
      setStatus('Держите указательный палец на ответе 1 секунду.');
      loop();
    } catch (err) {
      console.error(err);
      const denied = err && (err.name === 'NotAllowedError' || err.name === 'SecurityError');
      setStatus(denied
        ? 'Нет доступа к камере. Разрешите камеру в браузере или нажимайте на ответы мышкой.'
        : 'Не удалось запустить камеру. Можно нажимать на ответы мышкой.');
    }
    startRound();
  }

  function close() {
    stopCamera();
    game.locked = true;
    section.classList.add('hidden');
    menuEl.classList.remove('hidden');
  }

  // ---------- game flow ----------

  function startRound() {
    game.questions = shuffleArr(vocab).slice(0, QUESTIONS_PER_ROUND);
    game.index = 0;
    game.score = 0;
    game.lives = START_LIVES;
    endEl.classList.add('hidden');
    updateHud();
    showQuestion();
  }

  function showQuestion() {
    const q = game.questions[game.index];
    game.correct = q.russian;
    promptEl.textContent = q.uzbek;
    buildChoices(q).forEach((word, i) => {
      boxes[i].textContent = word;
      boxes[i].dataset.word = word;
    });
    resetBoxes();
    game.hoverBox = null;
    game.armed = false;
    game.locked = false;
    updateHud();
  }

  function choose(box) {
    if (game.locked) return;
    game.locked = true;
    const isCorrect = box.dataset.word === game.correct;
    box.classList.add(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      game.score += 1;
    } else {
      game.lives -= 1;
      boxes.find((b) => b.dataset.word === game.correct)?.classList.add('correct');
    }
    updateHud();

    setTimeout(() => {
      if (section.classList.contains('hidden')) return;
      game.index += 1;
      if (game.lives <= 0 || game.index >= game.questions.length) {
        finish();
      } else {
        showQuestion();
      }
    }, FEEDBACK_MS);
  }

  function finish() {
    game.locked = true;
    const total = game.questions.length;
    endTextEl.textContent = game.lives <= 0
      ? `Жизни закончились! Счёт: ${game.score}`
      : `Отлично! Вы набрали ${game.score} из ${total}`;
    endEl.classList.remove('hidden');
  }

  function updateHud() {
    scoreEl.textContent = String(game.score);
    livesEl.textContent = '❤'.repeat(Math.max(game.lives, 0)) + '♡'.repeat(START_LIVES - Math.max(game.lives, 0));
    const shown = Math.min(game.index + 1, game.questions.length || QUESTIONS_PER_ROUND);
    progressEl.textContent = `${shown} / ${game.questions.length || QUESTIONS_PER_ROUND}`;
  }

  function resetBoxes() {
    boxes.forEach((b) => {
      b.classList.remove('correct', 'wrong', 'hover');
      b.style.setProperty('--fill', '0');
    });
  }

  function setStatus(text) {
    statusEl.textContent = text;
  }

  // ---------- hand tracking loop ----------

  function loop() {
    rafId = requestAnimationFrame(loop);
    if (!handLandmarker || video.readyState < 2) return;
    if (video.currentTime === lastVideoTime) return;
    lastVideoTime = video.currentTime;

    const result = handLandmarker.detectForVideo(video, performance.now());
    const hand = result.landmarks && result.landmarks[0];

    if (!hand) {
      game.cursor = null;
      cursor.classList.add('hidden');
      updateHover(null);
      return;
    }

    const tip = hand[INDEX_FINGER_TIP];
    const rect = stage.getBoundingClientRect();
    // The video is mirrored on screen, so flip x.
    const target = { x: (1 - tip.x) * rect.width, y: tip.y * rect.height };
    game.cursor = game.cursor
      ? {
          x: game.cursor.x * SMOOTHING + target.x * (1 - SMOOTHING),
          y: game.cursor.y * SMOOTHING + target.y * (1 - SMOOTHING),
        }
      : target;

    cursor.classList.remove('hidden');
    cursor.style.transform = `translate(${game.cursor.x}px, ${game.cursor.y}px)`;
    updateHover(boxAt(game.cursor.x, game.cursor.y, rect));
  }

  function boxAt(x, y, stageRect) {
    return boxes.find((b) => {
      const r = b.getBoundingClientRect();
      const left = r.left - stageRect.left;
      const top = r.top - stageRect.top;
      return x >= left && x <= left + r.width && y >= top && y <= top + r.height;
    }) || null;
  }

  function updateHover(box) {
    if (game.locked) return;

    if (!box) {
      game.armed = true;
    }
    if (!game.armed) return; // finger was already on a box when the question appeared

    if (box !== game.hoverBox) {
      if (game.hoverBox) {
        game.hoverBox.classList.remove('hover');
        game.hoverBox.style.setProperty('--fill', '0');
      }
      game.hoverBox = box;
      game.hoverStart = performance.now();
      if (box) box.classList.add('hover');
      return;
    }

    if (box) {
      const progress = Math.min((performance.now() - game.hoverStart) / HOLD_MS, 1);
      box.style.setProperty('--fill', String(progress));
      if (progress >= 1) {
        box.classList.remove('hover');
        choose(box);
      }
    }
  }

  // ---------- events ----------

  // Mouse / touch fallback, also handy for testing without a camera.
  boxes.forEach((box) => box.addEventListener('click', () => choose(box)));

  document.getElementById('start-camera').addEventListener('click', open);
  document.getElementById('cam-back').addEventListener('click', close);
  document.getElementById('cam-menu').addEventListener('click', close);
  document.getElementById('cam-replay').addEventListener('click', startRound);
})();
