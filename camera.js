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
  // Gestures (MediaPipe gives 21 hand points; distances are divided by the hand's
  // size so they work whether the hand is near or far from the camera).
  const PINCH_ON = 0.3;        // thumb–index distance below this = pinch starts
  const PINCH_OFF = 0.5;       // …and above this = pinch released (gap avoids flicker)
  const PALM_HOLD_MS = 700;    // open palm must be held this long to pause / resume
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
  const pausedEl = document.getElementById('cam-paused');
  const pauseBtn = document.getElementById('cam-pause');

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
    paused: false,
    pausedRemaining: 0, // ms left on the question timer when paused
    pinching: false,
    palmSince: 0,       // when the open palm was first seen (0 = not showing)
    palmLatched: false, // palm already toggled pause; must close the hand before it can again
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
      id: 'instrumental-basics',
      icon: '✏️',
      title: 'Творительный: Основы',
      subtitle: 'Asosiy so‘z birikmalari',
      words: instrumentalBasics, // defined in script.js, words have a `group`
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
    const candidates = vocab.filter((v) => v.uzbek !== q.uzbek && v.russian !== q.russian);
    // If the topic has groups, take wrong answers from the same group first
    // (под столом vs над столом is a better test than под столом vs работать врачом).
    const sameGroup = q.group ? shuffleArr(candidates.filter((v) => v.group === q.group)) : [];
    const others = shuffleArr(candidates.filter((v) => !sameGroup.includes(v)));
    const wrong = [...sameGroup, ...others].slice(0, 3).map((v) => v.russian);
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
      setStatus('☝ Держите палец на ответе 1 сек. или 🤏 сожмите пальцы. ✋ Ладонь — пауза.');
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
    clearPause();
    cursor.classList.add('hidden');
    countdownEl.classList.add('hidden');
    showTopics();
  }

  // ---------- game flow ----------

  function startRound() {
    game.roundId += 1;
    const round = game.roundId;
    stopTimer();
    clearPause();
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

  function startTimer(ms = QUESTION_SECONDS * 1000) {
    stopTimer();
    game.deadline = performance.now() + ms;
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

  // ---------- pause ----------

  // Pausing is only possible while a question is being answered
  // (not during the 3-2-1 countdown, the answer feedback, or the end screen).
  function canPause() {
    return !game.paused && !game.locked && game.timerId !== null;
  }

  function pause() {
    if (!canPause()) return;
    game.paused = true;
    game.pausedRemaining = Math.max(0, game.deadline - performance.now());
    stopTimer();
    game.locked = true;
    if (game.hoverBox) {
      game.hoverBox.classList.remove('hover');
      game.hoverBox.style.setProperty('--fill', '0');
    }
    game.hoverBox = null;
    pausedEl.classList.remove('hidden');
    pauseBtn.textContent = '▶ Продолжить';
  }

  function resume() {
    if (!game.paused) return;
    game.paused = false;
    pausedEl.classList.add('hidden');
    pauseBtn.textContent = '⏸ Пауза';
    game.locked = false;
    game.armed = false; // move the finger off the boxes before a new hold starts
    startTimer(game.pausedRemaining);
  }

  function togglePause() {
    if (game.paused) resume();
    else pause();
  }

  // Reset pause state without resuming (new round / leaving the game).
  function clearPause() {
    game.paused = false;
    pausedEl.classList.add('hidden');
    pauseBtn.textContent = '⏸ Пауза';
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
      game.pinching = false;
      game.palmSince = 0;
      game.palmLatched = false;
      cursor.classList.add('hidden');
      cursor.classList.remove('pinch', 'palm');
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

    const box = boxAt(game.cursor.x, game.cursor.y, rect);
    const { pinch, palm } = readGestures(hand);
    cursor.classList.toggle('pinch', pinch);
    cursor.classList.toggle('palm', palm);

    handlePalm(palm);
    if (game.paused) return;

    // Pinch = select instantly. Only on the moment the pinch starts, so keeping
    // the fingers together doesn't also answer the next question.
    if (pinch && !game.pinching && !game.locked) {
      const target = box || game.hoverBox; // fingers drift a bit while pinching
      if (target) choose(target);
    }
    game.pinching = pinch;

    // An open palm is for pausing, so it shouldn't also fill up a box.
    updateHover(palm ? null : box);
  }

  // ---------- gestures ----------

  // Hand points used (MediaPipe numbering):
  //   0 wrist · 4 thumb tip · 5 index base · 9 middle base
  //   index 6→8, middle 10→12, ring 14→16, pinky 18→20 (middle joint → tip)
  function readGestures(hand) {
    const w = video.videoWidth || 1;
    const h = video.videoHeight || 1;
    const dist = (a, b) => Math.hypot((hand[a].x - hand[b].x) * w, (hand[a].y - hand[b].y) * h);
    const handSize = dist(0, 9) || 1; // wrist → middle-finger base

    const pinchRatio = dist(4, 8) / handSize;
    const pinch = game.pinching ? pinchRatio < PINCH_OFF : pinchRatio < PINCH_ON;

    // A finger is straight if its tip is clearly farther from the wrist than its middle joint.
    const straight = (tip, joint) => dist(tip, 0) > dist(joint, 0) * 1.1;
    const fourFingers = straight(8, 6) && straight(12, 10) && straight(16, 14) && straight(20, 18);
    const thumbOut = dist(4, 5) / handSize > 0.45;
    const palm = fourFingers && thumbOut && !pinch;

    return { pinch, palm };
  }

  // Open palm held for PALM_HOLD_MS toggles pause. After toggling, the hand has to
  // close (or leave) first, so one long palm doesn't pause and resume repeatedly.
  function handlePalm(palm) {
    if (!palm) {
      game.palmSince = 0;
      game.palmLatched = false;
      return;
    }
    if (game.palmLatched) return;
    if (!game.palmSince) game.palmSince = performance.now();
    if (performance.now() - game.palmSince >= PALM_HOLD_MS) {
      game.palmLatched = true;
      togglePause();
    }
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
  pauseBtn.addEventListener('click', togglePause);
  pausedEl.addEventListener('click', resume);

  // Pause automatically when the player switches tabs or apps.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !section.classList.contains('hidden')) pause();
  });
})();
