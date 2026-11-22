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
  const QUESTION_SECONDS = 15; // time limit per question
  const START_COUNTDOWN = 3;   // 3-2-1 before the round begins
  const BASE_POINTS = 10;      // points for a correct answer, plus 1 per second left

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
  const timerEl = document.getElementById('cam-timer');
  const timerBar = document.getElementById('cam-timer-bar');
  const countdownEl = document.getElementById('cam-countdown');
  const boxes = Array.from(document.querySelectorAll('.cam-choice'));
  const topicsEl = document.getElementById('cam-topics');
  const topicGrid = document.getElementById('topic-grid');

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
    deadline: 0,        // performance.now() time when the current question expires
    timerId: null,
    roundId: 0,         // bumps on every new round / exit so stale timeouts do nothing
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

  // ---------- topics ----------
  // To add a topic, add one block here. Each word needs `russian` and `uzbek`.
  // A topic needs at least 4 words (one correct answer + three wrong ones).
  const CAMERA_TOPICS = [
    {
      id: 'appearance',
      icon: '👀',
      title: 'Внешность',
      subtitle: "Tashqi ko'rinish",
      words: originalTranslationVocabulary,
    },
    {
      id: 'phrases',
      icon: '💬',
      title: 'Фразы',
      subtitle: 'Iboralar',
      words: newVerbPhrases.map(({ russian, uzbek }) => ({ russian, uzbek })),
    },
    {
      id: 'medical',
      icon: '🩺',
      title: 'У врача',
      subtitle: 'Shifokor qabulida',
      words: medicalVocabulary, // defined in script.js
    },
    {
      id: 'instrumental-1',
      icon: '🤝',
      title: 'Творительный 1: Поведение и репутация',
      subtitle: 'Xulq-atvor va obro‘',
      words: instrumentalPart1, // №1–25, defined in script.js
    },
    {
      id: 'instrumental-2',
      icon: '🌪️',
      title: 'Творительный 2: Чувства и испытания',
      subtitle: 'His-tuyg‘ular va sinovlar',
      words: instrumentalPart2, // №26–55, defined in script.js
    },
  ].map((t) => ({ ...t, words: uniqueByRussian(t.words) }))
    .filter((t) => t.words.length >= 4);

  let vocab = CAMERA_TOPICS[0].words; // words of the topic being played

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
    applyAspect();
  }

  // Make the stage match the camera's aspect ratio so landmark coordinates map 1:1.
  // Phones held upright give a portrait stream, which switches to the portrait layout.
  function applyAspect() {
    if (!video.videoWidth || !video.videoHeight) return;
    const ar = video.videoWidth / video.videoHeight;
    stage.style.setProperty('--cam-ar', String(ar));
    stage.classList.toggle('portrait', ar < 1);
  }

  // Fires when the stream size changes, e.g. when the phone is rotated.
  video.addEventListener('resize', applyAspect);

  function stopCamera() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    if (stream) stream.getTracks().forEach((t) => t.stop());
    stream = null;
    video.srcObject = null;
    lastVideoTime = -1;
  }

  // ---------- screens ----------

  function renderTopics() {
    topicGrid.innerHTML = '';
    CAMERA_TOPICS.forEach((topic) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'topic-card';
      card.innerHTML = `
        <span class="topic-icon"></span>
        <span class="topic-title"></span>
        <span class="topic-subtitle"></span>
        <span class="topic-count"></span>`;
      card.querySelector('.topic-icon').textContent = topic.icon;
      card.querySelector('.topic-title').textContent = topic.title;
      card.querySelector('.topic-subtitle').textContent = topic.subtitle;
      card.querySelector('.topic-count').textContent = `${topic.words.length} слов`;
      card.addEventListener('click', () => open(topic));
      topicGrid.appendChild(card);
    });
  }

  function showTopics() {
    menuEl.classList.add('hidden');
    section.classList.add('hidden');
    document.body.classList.remove('cam-active');
    topicsEl.classList.remove('hidden');
    window.scrollTo(0, 0);
  }

  function showMenu() {
    topicsEl.classList.add('hidden');
    menuEl.classList.remove('hidden');
  }

  async function open(topic) {
    vocab = topic.words;
    topicsEl.classList.add('hidden');
    menuEl.classList.add('hidden');
    section.classList.remove('hidden');
    document.body.classList.add('cam-active');
    window.scrollTo(0, 0);
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
      // The player may have pressed Back while the camera was still loading.
      if (section.classList.contains('hidden')) {
        stopCamera();
        return;
      }
      setStatus('Держите указательный палец на ответе 1 секунду.');
      loop();
    } catch (err) {
      console.error(err);
      const denied = err && (err.name === 'NotAllowedError' || err.name === 'SecurityError');
      setStatus(denied
        ? 'Нет доступа к камере. Разрешите камеру в браузере или нажимайте на ответы мышкой.'
        : 'Не удалось запустить камеру. Можно нажимать на ответы мышкой.');
    }
    if (section.classList.contains('hidden')) return;
    startRound();
  }

  // Leave the game and go back to the topic list.
  function close() {
    stopCamera();
    stopTimer();
    game.roundId += 1;
    game.locked = true;
    cursor.classList.add('hidden');
    countdownEl.classList.add('hidden');
    showTopics();
  }

  // ---------- game flow ----------

  function startRound() {
    game.roundId += 1;
    const round = game.roundId;
    stopTimer();
    game.locked = true;
    game.questions = shuffleArr(vocab).slice(0, QUESTIONS_PER_ROUND);
    game.index = 0;
    game.score = 0;
    game.lives = START_LIVES;
    endEl.classList.add('hidden');
    promptEl.textContent = '';
    boxes.forEach((b) => { b.textContent = ''; b.dataset.word = ''; });
    resetBoxes();
    setTimerDisplay(QUESTION_SECONDS * 1000);
    updateHud();

    // 3… 2… 1… Старт!
    let n = START_COUNTDOWN;
    const tick = () => {
      if (round !== game.roundId) return;
      if (n > 0) {
        showCountdown(String(n));
        n -= 1;
        setTimeout(tick, 1000);
      } else {
        showCountdown('Старт!');
        setTimeout(() => {
          if (round !== game.roundId) return;
          countdownEl.classList.add('hidden');
          showQuestion();
        }, 600);
      }
    };
    tick();
  }

  function showCountdown(text) {
    countdownEl.textContent = text;
    countdownEl.classList.remove('hidden');
    // restart the pop animation
    countdownEl.classList.remove('pop');
    void countdownEl.offsetWidth;
    countdownEl.classList.add('pop');
  }

  // ---------- question timer ----------

  function startTimer() {
    stopTimer();
    game.deadline = performance.now() + QUESTION_SECONDS * 1000;
    game.timerId = setInterval(() => {
      const left = game.deadline - performance.now();
      setTimerDisplay(left);
      if (left <= 0) resolve(null); // time is up
    }, 100);
  }

  function stopTimer() {
    if (game.timerId) clearInterval(game.timerId);
    game.timerId = null;
  }

  function secondsLeft() {
    return Math.max(0, Math.ceil((game.deadline - performance.now()) / 1000));
  }

  function setTimerDisplay(msLeft) {
    const ms = Math.max(0, msLeft);
    const fraction = ms / (QUESTION_SECONDS * 1000);
    timerEl.textContent = `⏱ ${Math.ceil(ms / 1000)}`;
    timerBar.style.width = `${fraction * 100}%`;
    const urgent = ms <= 3000;
    timerBar.classList.toggle('urgent', urgent);
    timerEl.classList.toggle('urgent', urgent);
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
    startTimer();
  }

  function choose(box) {
    resolve(box);
  }

  // box = the chosen box, or null when the time ran out
  function resolve(box) {
    if (game.locked) return;
    game.locked = true;
    stopTimer();
    const round = game.roundId;
    const isCorrect = !!box && box.dataset.word === game.correct;

    if (isCorrect) {
      const bonus = secondsLeft();
      game.score += BASE_POINTS + bonus;
      box.classList.add('correct');
      setStatus(`Правильно! +${BASE_POINTS + bonus} (бонус за скорость: ${bonus})`);
    } else {
      game.lives -= 1;
      if (box) box.classList.add('wrong');
      boxes.find((b) => b.dataset.word === game.correct)?.classList.add('correct');
      setStatus(box ? `Неправильно. Ответ: ${game.correct}` : `Время вышло! Ответ: ${game.correct}`);
    }
    boxes.forEach((b) => { b.classList.remove('hover'); });
    updateHud();

    setTimeout(() => {
      if (round !== game.roundId || section.classList.contains('hidden')) return;
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
    stopTimer();
    endTextEl.textContent = game.lives <= 0
      ? `Жизни закончились! Счёт: ${game.score}`
      : `Отлично! Ваш счёт: ${game.score}`;
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

  renderTopics();
  document.getElementById('start-camera').addEventListener('click', showTopics);
  document.getElementById('topics-back').addEventListener('click', showMenu);
  document.getElementById('cam-back').addEventListener('click', close);
  document.getElementById('cam-menu').addEventListener('click', close);
  document.getElementById('cam-replay').addEventListener('click', startRound);
})();
