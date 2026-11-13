const originalTranslationVocabulary = [
  { russian: 'высокий', uzbek: 'baland' },
  { russian: 'широкий', uzbek: 'keng' },
  { russian: 'узкий', uzbek: 'tor' },
  { russian: 'карие', uzbek: 'jigarrang' },
  { russian: 'голубые', uzbek: 'moviy' },
  { russian: 'зелёные', uzbek: 'yashil' },
  { russian: 'серые', uzbek: 'kulrang' },
  { russian: 'чёрные', uzbek: 'qora' },
  { russian: 'большие', uzbek: 'katta' },
  { russian: 'маленькие', uzbek: 'kichkina' },
  { russian: 'круглые', uzbek: 'dumaloq' },
  { russian: 'узкие', uzbek: 'tor' },
  { russian: 'красивые', uzbek: 'chiroyli' },
  { russian: 'выразительные', uzbek: 'ifodali' },
  { russian: 'густые', uzbek: 'qalin' },
  { russian: 'тонкие', uzbek: 'ingichka' },
  { russian: 'широкие', uzbek: 'keng' },
  { russian: 'тёмные', uzbek: "to‘q rangli" },
  { russian: 'светлые', uzbek: "och rangli" },
  { russian: 'красивая', uzbek: 'chiroyli' },
  { russian: 'чистая', uzbek: 'toza' },
  { russian: 'современная', uzbek: 'zamonaviy' },
  { russian: 'модная', uzbek: 'urfdagi' },
  { russian: 'длинные', uzbek: 'uzun' },
  { russian: 'короткие', uzbek: 'kalta' },
  { russian: 'средней длины', uzbek: "o‘rtacha uzunlikdagi" },
  { russian: 'русые', uzbek: 'malla' },
  { russian: 'каштановые', uzbek: 'kashtan rang' },
  { russian: 'рыжие', uzbek: 'qizg‘ish' },
  { russian: 'седые', uzbek: 'oqargan' },
  { russian: 'прямые', uzbek: 'tekis' },
  { russian: 'кудрявые', uzbek: 'jingalak' },
  { russian: 'волнистые', uzbek: "to‘lqinsimon" },
  { russian: 'густые', uzbek: 'qalin' },
  { russian: 'редкие', uzbek: 'siyrak' },
  { russian: 'мягкие', uzbek: 'yumshoq' },
  { russian: 'светлая', uzbek: 'oq' },
  { russian: 'тёмная', uzbek: 'to‘q' },
  { russian: 'смуглая', uzbek: "bug‘doyrang" },
  { russian: 'белая', uzbek: 'oq' },
  { russian: 'чистая', uzbek: 'toza' },
  { russian: 'гладкая', uzbek: 'silliq' }
];

const newVerbPhrases = [
  { russian: "Проводить время с друзьями", uzbek: "Do'stlar bilan vaqt o'tkazmoq", verb: "Проводить", noun: "время", question: "Что проводить?", completePhrase: "Проводить время с друзьями" },
  { russian: "Что ты обычно делаешь?", uzbek: "Sen odatda nima qilasan?", verb: "делать", noun: "дела", question: "Что ты обычно делаешь?", completePhrase: "Что ты обычно делаешь?" },
  { russian: "Что ты делал вчера?", uzbek: "Kecha nima qilding?", verb: "делать", noun: "вчера", question: "Что ты делал вчера?", completePhrase: "Что ты делал вчера?" },
  { russian: "Что ты будешь делать завтра?", uzbek: "Ertaga nima qilasan?", verb: "делать", noun: "завтра", question: "Что ты будешь делать завтра?", completePhrase: "Что ты будешь делать завтра?" },
  { russian: "По моему мнению...", uzbek: "Mening fikrimcha...", verb: "думать", noun: "мнение", question: "По моему мнению...", completePhrase: "По моему мнению..." },
  { russian: "Объяснить свой выбор", uzbek: "O'z tanlovini tushuntirmoq", verb: "Объяснить", noun: "выбор", question: "Что объяснить?", completePhrase: "Объяснить свой выбор" },
  { russian: "Высказать своё мнение", uzbek: "O'z fikrini bildirmoq", verb: "Высказать", noun: "мнение", question: "Что высказать?", completePhrase: "Высказать своё мнение" },
  { russian: "Согласиться с собеседником", uzbek: "Subbatdoshning fikriga qo'shilmoq", verb: "Согласиться", noun: "собеседником", question: "С кем согласиться?", completePhrase: "Согласиться с собеседником" },
  { russian: "Не согласиться с мнением", uzbek: "Fikrga qo'shilmaslik", verb: "Не согласиться", noun: "мнением", question: "С чем не согласиться?", completePhrase: "Не согласиться с мнением" },
  { russian: "Привести пример", uzbek: "Misol keltirmoq", verb: "Привести", noun: "пример", question: "Что привести?", completePhrase: "Привести пример" },
  { russian: "Сколько это стоит?", uzbek: "Bu qancha turadi?", verb: "стоить", noun: "стоимость", question: "Сколько это стоит?", completePhrase: "Сколько это стоит?" },
  { russian: "Это слишком дорого", uzbek: "Bu juda qimmat", verb: "стоить", noun: "дорого", question: "Это слишком дорого", completePhrase: "Это слишком дорого" },
  { russian: "У меня возникла проблема", uzbek: "Menda muammo paydo bo'ldi", verb: "возникнуть", noun: "проблема", question: "У меня возникла проблема", completePhrase: "У меня возникла проблема" },
  { russian: "Попросить о помощи", uzbek: "Yordam so'ramoq", verb: "Попросить", noun: "помощи", question: "О чём попросить?", completePhrase: "Попросить о помощи" },
  { russian: "Найти выход из ситуации", uzbek: "Vaziyatdan chiqish yo'lini topmoq", verb: "Найти", noun: "выход", question: "Что найти?", completePhrase: "Найти выход из ситуации" },
  { russian: "Что мне делать?", uzbek: "Men nima qilsam kerak?", verb: "делать", noun: "дело", question: "Что мне делать?", completePhrase: "Что мне делать?" },
  { russian: "Почему ты так думаешь?", uzbek: "Nega bunday deb o'ylaysan?", verb: "думать", noun: "мысль", question: "Почему ты так думаешь?", completePhrase: "Почему ты так думаешь?" },
  { russian: "Что ты имеешь в виду?", uzbek: "Nima demoqchisiz?", verb: "иметь", noun: "в виду", question: "Что ты имеешь в виду?", completePhrase: "Что ты имеешь в виду?" },
  { russian: "Можешь объяснить подробнее?", uzbek: "Batafsilroq tushuntira olasanmi?", verb: "объяснить", noun: "подробнее", question: "Можешь объяснить подробнее?", completePhrase: "Можешь объяснить подробнее?" },
  { russian: "Я не совсем согласен", uzbek: "Men unchalik qo'shilmayman?", verb: "согласен", noun: "согласие", question: "Я не совсем согласен", completePhrase: "Я не совсем согласен" },
  { russian: "На самом деле", uzbek: "Aslida", verb: "дело", noun: "деле", question: "На самом деле", completePhrase: "На самом деле" },
  { russian: "Дай мне подумать", uzbek: "O'ylab olishimga vaqt ber", verb: "подумать", noun: "время", question: "Что дать?", completePhrase: "Дай мне подумать" },
  { russian: "Как сказать это по-русски?", uzbek: "Buni rus tilida qanday aytish mumkin?", verb: "сказать", noun: "по-русски", question: "Как сказать это по-русски?", completePhrase: "Как сказать это по-русски?" },
  { russian: "Сначала... потом...", uzbek: "Avval..., keyin...", verb: "делать", noun: "сначала", question: "Сначала... потом...", completePhrase: "Сначала... потом..." },
  { russian: "Давай попробуем...", uzbek: "Keling,... qilib ko'ramiz", verb: "пробовать", noun: "попробуем", question: "Давай попробуем...", completePhrase: "Давай попробуем..." }
];

const translationVocabulary = [...originalTranslationVocabulary, ...newVerbPhrases];

const genderNouns = [
  { russian: 'Жизнь', uzbek: 'hayot', gender: 'Женский' },
  { russian: 'Лошадь', uzbek: 'ot', gender: 'Женский' },
  { russian: 'Медаль', uzbek: 'medal', gender: 'Женский' },
  { russian: 'Тетрадь', uzbek: 'daftar', gender: 'Женский' },
  { russian: 'Кровать', uzbek: 'karavot', gender: 'Женский' },
  { russian: 'Дверь', uzbek: 'eshik', gender: 'Женский' },
  { russian: 'Ночь', uzbek: 'tun', gender: 'Женский' },
  { russian: 'Цепь', uzbek: 'zanjir', gender: 'Женский' },
  { russian: 'Любовь', uzbek: 'sevgi', gender: 'Женский' },
  { russian: 'Осень', uzbek: 'kuz', gender: 'Женский' },
  { russian: 'Соль', uzbek: 'tuz', gender: 'Женский' },
  { russian: 'Нефть', uzbek: 'neft', gender: 'Женский' },
  { russian: 'Память', uzbek: 'xotira', gender: 'Женский' },
  { russian: 'Степень', uzbek: 'daraja', gender: 'Женский' },
  { russian: 'Часть', uzbek: 'qism', gender: 'Женский' },
  { russian: 'Область', uzbek: 'soha / hudud', gender: 'Женский' },
  { russian: 'Роль', uzbek: 'rol', gender: 'Женский' },
  { russian: 'Болезнь', uzbek: 'kasallik', gender: 'Женский' },
  { russian: 'Вещь', uzbek: 'narsa', gender: 'Женский' },
  { russian: 'Власть', uzbek: 'hokimiyat', gender: 'Женский' },
  { russian: 'Деталь', uzbek: 'detal / qismlar', gender: 'Женский' },
  { russian: 'Кость', uzbek: 'suyak', gender: 'Женский' },
  { russian: 'Кровь', uzbek: 'qon', gender: 'Женский' },
  { russian: 'Помощь', uzbek: 'yordam', gender: 'Женский' },
  { russian: 'День', uzbek: 'kun', gender: 'Мужской' },
  { russian: 'Конь', uzbek: 'ot (erkak oti)', gender: 'Мужской' },
  { russian: 'Огонь', uzbek: 'olov', gender: 'Мужской' },
  { russian: 'Словарь', uzbek: "lug‘at", gender: 'Мужской' },
  { russian: 'Рояль', uzbek: 'royal (fortepiano turi)', gender: 'Мужской' },
  { russian: 'Корабль', uzbek: 'kema', gender: 'Мужской' },
  { russian: 'Дождь', uzbek: "yomg‘ir", gender: 'Мужской' },
  { russian: 'Портфель', uzbek: 'portfel', gender: 'Мужской' },
  { russian: 'Шампунь', uzbek: 'shampun', gender: 'Мужской' },
  { russian: 'Голубь', uzbek: 'kabutar (erkak kabutar)', gender: 'Мужской' },
  { russian: 'Гость', uzbek: 'mehmon', gender: 'Мужской' },
  { russian: 'Зверь', uzbek: 'hayvon', gender: 'Мужской' },
  { russian: 'Картофель', uzbek: 'kartoshka', gender: 'Мужской' },
  { russian: 'Кашель', uzbek: "yo‘tal", gender: 'Мужской' },
  { russian: 'Контроль', uzbek: 'nazorat', gender: 'Мужской' },
  { russian: 'Путь', uzbek: "yo‘l", gender: 'Мужской' },
  { russian: 'Уголь', uzbek: "ko‘mir", gender: 'Мужской' },
  { russian: 'Фестиваль', uzbek: 'festival', gender: 'Мужской' },
  { russian: 'Лагерь', uzbek: 'lager / oromgoh', gender: 'Мужской' },
  { russian: 'Двигатель', uzbek: 'dvigatel / motor', gender: 'Мужской' },
  { russian: 'Циркуль', uzbek: 'sirkul', gender: 'Мужской' },
  { russian: 'Календарь', uzbek: 'kalendar', gender: 'Мужской' },
  { russian: 'Кремль', uzbek: 'Kreml', gender: 'Мужской' },
  { russian: 'Зритель', uzbek: 'tomoshabin', gender: 'Мужской' }
];

const phrasePractice = newVerbPhrases.map(item => ({ ...item }));
const phraseMatchVocabulary = newVerbPhrases.map(item => ({ ...item }));
const verbScrambleVocabulary = [
  'проводить',
  'делать',
  'объяснить',
  'высказать',
  'согласиться',
  'привести',
  'сказать',
  'попросить',
  'найти',
  'думать',
  'ждать',
  'читать',
  'слушать',
  'покупать',
  'готовить',
  'пить',
  'есть',
  'убирать',
  'мыть',
  'открывать',
  'закрывать',
  'искать',
  'брать',
  'надевать',
  'встречать',
  'учить'
];

function shuffle(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getRandomUnique(items, limit) {
  return shuffle(items).slice(0, limit);
}

function normalizeRussianAnswer(value) {
  return String(value).trim().replace(/\s+/g, ' ').toLowerCase();
}

const menu = document.getElementById('menu');
const quiz = document.getElementById('quiz');
const end = document.getElementById('end');
const modeTitle = document.getElementById('mode-title');
const questionText = document.getElementById('question-text');
const optionsEl = document.getElementById('options');
const currentEl = document.getElementById('current');
const totalEl = document.getElementById('total');
const scoreEl = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const feedbackEl = document.getElementById('feedback');
const finalScoreEl = document.getElementById('final-score');
const phraseForm = document.getElementById('phrase-form');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');

let state = {
  mode: null,
  questions: [],
  index: 0,
  score: 0,
  answered: false,
};

document.querySelectorAll('#menu .btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    startQuiz(btn.dataset.mode);
  });
});

document.getElementById('next-btn').addEventListener('click', () => {
  if (!state.answered) return;
  nextQuestion();
});

document.getElementById('restart-btn').addEventListener('click', () => {
  startQuiz(state.mode);
});

document.getElementById('back-btn').addEventListener('click', () => {
  backToMenu();
});

document.getElementById('replay-btn').addEventListener('click', () => {
  startQuiz(state.mode);
});

document.getElementById('menu-btn').addEventListener('click', () => {
  backToMenu();
});

submitBtn.addEventListener('click', handlePhraseSubmit);
answerInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handlePhraseSubmit();
  }
});

function backToMenu() {
  quiz.classList.add('hidden');
  end.classList.add('hidden');
  menu.classList.remove('hidden');
  state = { mode: null, questions: [], index: 0, score: 0, answered: false };
  answerInput.value = '';
}

function startQuiz(mode) {
  state.mode = mode;
  state.index = 0;
  state.score = 0;
  state.answered = false;
  scoreEl.textContent = '0';
  answerInput.value = '';

  if (mode === 'translation') {
    modeTitle.textContent = 'Russian → Uzbek';
    state.questions = getRandomUnique(translationVocabulary, 20);
  } else if (mode === 'gender') {
    modeTitle.textContent = 'Russian Noun Gender';
    state.questions = getRandomUnique(genderNouns, 20);
  } else if (mode === 'phrase') {
    modeTitle.textContent = 'Complete the Russian Phrase';
    state.questions = shuffle(phrasePractice);
  } else if (mode === 'phrase-match') {
    modeTitle.textContent = 'Russian Phrase Match';
    state.questions = getRandomUnique(phraseMatchVocabulary, 10);
  } else if (mode === 'verb-scramble') {
    modeTitle.textContent = 'Russian Verb Scramble';
    state.questions = getRandomUnique(verbScrambleVocabulary, 10);
  }

  menu.classList.add('hidden');
  end.classList.add('hidden');
  quiz.classList.remove('hidden');
  renderQuestion();
}

function renderQuestion() {
  const q = state.questions[state.index];
  currentEl.textContent = String(state.index + 1);
  totalEl.textContent = String(state.questions.length);
  progressBar.style.width = `${(state.index / state.questions.length) * 100}%`;
  feedbackEl.className = 'feedback hidden';
  feedbackEl.textContent = '';
  state.answered = false;
  optionsEl.innerHTML = '';
  phraseForm.classList.add('hidden');
  answerInput.value = '';

  if (state.mode === 'translation') {
    renderTranslationQuestion(q);
  } else if (state.mode === 'gender') {
    renderGenderQuestion(q);
  } else if (state.mode === 'phrase') {
    renderPhraseQuestion(q);
  } else if (state.mode === 'phrase-match') {
    renderPhraseMatchQuestion(q);
  } else if (state.mode === 'verb-scramble') {
    renderVerbScrambleQuestion(q);
  }
}

function renderTranslationQuestion(q) {
  questionText.textContent = q.russian;
  const correct = q.uzbek;
  const used = new Set([correct]);
  const wrongOptions = [];
  const pool = shuffle(translationVocabulary
    .map((item) => item.uzbek)
    .filter((value) => !used.has(value)));

  while (wrongOptions.length < 3 && pool.length > 0) {
    const option = pool.pop();
    if (option && !used.has(option)) {
      wrongOptions.push(option);
      used.add(option);
    }
  }

  while (wrongOptions.length < 3) {
    const fallback = 'qora';
    if (!used.has(fallback)) {
      wrongOptions.push(fallback);
      used.add(fallback);
    } else {
      wrongOptions.push('toza');
    }
  }

  const options = shuffle([correct, ...wrongOptions]);
  options.forEach((option) => {
    const btn = document.createElement('div');
    btn.className = 'option';
    btn.textContent = option;
    btn.addEventListener('click', () => handleTranslationAnswer(btn, correct));
    optionsEl.appendChild(btn);
  });
}

function renderGenderQuestion(q) {
  questionText.textContent = `${q.russian} — ${q.uzbek}`;
  const options = shuffle(['Мужской род', 'Женский род', 'Средний род']);
  options.forEach((option) => {
    const btn = document.createElement('div');
    btn.className = 'option';
    btn.textContent = option;
    btn.addEventListener('click', () => handleGenderAnswer(btn, q));
    optionsEl.appendChild(btn);
  });
}

function renderPhraseQuestion(q) {
  questionText.textContent = `Verb: ${q.verb}\nUzbek hint: ${q.uzbek}\nQuestion: ${q.question}`;
  phraseForm.classList.remove('hidden');
  answerInput.focus();
}

function renderPhraseMatchQuestion(q) {
  questionText.textContent = q.russian;
  const correct = q.uzbek;
  const wrongOptions = [];
  const pool = shuffle(phraseMatchVocabulary
    .map((item) => item.uzbek)
    .filter((value) => value !== correct));

  while (wrongOptions.length < 3 && pool.length > 0) {
    const item = pool.pop();
    if (item && item !== correct && !wrongOptions.includes(item)) {
      wrongOptions.push(item);
    }
  }

  while (wrongOptions.length < 3) {
    const fallback = 'Do\'stni ko\'rmoq';
    if (!wrongOptions.includes(fallback) && fallback !== correct) {
      wrongOptions.push(fallback);
    } else {
      wrongOptions.push('Musiqa tinglamoq');
    }
  }

  const options = shuffle([correct, ...wrongOptions.slice(0, 3)]);
  options.forEach((option) => {
    const btn = document.createElement('div');
    btn.className = 'option';
    btn.textContent = option;
    btn.addEventListener('click', () => handlePhraseMatchAnswer(btn, correct));
    optionsEl.appendChild(btn);
  });
}

function handleTranslationAnswer(btn, correct) {
  if (state.answered) return;
  state.answered = true;
  const chosen = btn.textContent;
  const optionNodes = Array.from(optionsEl.children);

  if (chosen === correct) {
    btn.classList.add('correct');
    feedbackEl.textContent = 'Правильно!';
    feedbackEl.className = 'feedback correct';
    state.score += 1;
  } else {
    btn.classList.add('wrong');
    optionNodes.forEach((node) => {
      if (node.textContent === correct) node.classList.add('correct');
    });
    feedbackEl.textContent = `Неправильно. Правильный ответ: ${correct}`;
    feedbackEl.className = 'feedback wrong';
  }

  scoreEl.textContent = String(state.score);
  progressBar.style.width = `${((state.index + 1) / state.questions.length) * 100}%`;
}

function handleGenderAnswer(btn, q) {
  if (state.answered) return;
  state.answered = true;
  const chosen = btn.textContent;
  const correct = q.gender === 'Мужской' ? 'Мужской род' : 'Женский род';
  const optionNodes = Array.from(optionsEl.children);

  if (chosen === correct) {
    btn.classList.add('correct');
    feedbackEl.textContent = `Правильно! ${q.russian} — ${q.gender.toLowerCase()} род.`;
    feedbackEl.className = 'feedback correct';
    state.score += 1;
  } else {
    btn.classList.add('wrong');
    optionNodes.forEach((node) => {
      if (node.textContent === correct) node.classList.add('correct');
    });
    feedbackEl.textContent = `Неправильно. Правильный ответ: ${q.russian} — ${q.gender.toLowerCase()} род.`;
    feedbackEl.className = 'feedback wrong';
  }

  scoreEl.textContent = String(state.score);
  progressBar.style.width = `${((state.index + 1) / state.questions.length) * 100}%`;
}

function handlePhraseSubmit() {
  if (state.mode !== 'phrase' || state.answered) return;

  const answer = normalizeRussianAnswer(answerInput.value);
  const current = state.questions[state.index];

  if (!answer) {
    feedbackEl.textContent = 'Пожалуйста, введите ответ.';
    feedbackEl.className = 'feedback wrong';
    return;
  }

  if (answer === normalizeRussianAnswer(current.noun)) {
    feedbackEl.textContent = `Правильно! ${current.completePhrase}`;
    feedbackEl.className = 'feedback correct';
    state.score += 1;
    scoreEl.textContent = String(state.score);
    state.answered = true;
    progressBar.style.width = `${((state.index + 1) / state.questions.length) * 100}%`;
    submitBtn.disabled = true;
    return;
  }

  feedbackEl.textContent = `Неправильно. Правильный ответ: ${current.noun}. Полная фраза: ${current.completePhrase}`;
  feedbackEl.className = 'feedback wrong';
  state.answered = true;
  progressBar.style.width = `${((state.index + 1) / state.questions.length) * 100}%`;
  submitBtn.disabled = true;
  scoreEl.textContent = String(state.score);
}

function handlePhraseMatchAnswer(btn, correct) {
  if (state.answered) return;
  state.answered = true;
  const chosen = btn.textContent;
  const optionNodes = Array.from(optionsEl.children);

  if (chosen === correct) {
    btn.classList.add('correct');
    feedbackEl.textContent = 'Правильно!';
    feedbackEl.className = 'feedback correct';
    state.score += 1;
  } else {
    btn.classList.add('wrong');
    optionNodes.forEach((node) => {
      if (node.textContent === correct) node.classList.add('correct');
    });
    feedbackEl.textContent = `Неправильно. Правильный ответ: ${correct}`;
    feedbackEl.className = 'feedback wrong';
  }

  scoreEl.textContent = String(state.score);
  progressBar.style.width = `${((state.index + 1) / state.questions.length) * 100}%`;
}

function scrambleWord(word) {
  const letters = word.split('');
  let scrambled = letters.slice();
  let attempts = 0;
  while (attempts < 20) {
    scrambled = shuffle(letters.slice());
    if (scrambled.join('') !== word) {
      return scrambled.join('');
    }
    attempts += 1;
  }
  return word.split('').reverse().join('');
}

function renderVerbScrambleQuestion(word) {
  questionText.textContent = `Соберите глагол из букв: ${scrambleWord(word)}`;
  phraseForm.classList.remove('hidden');
  answerInput.focus();
}

function handleVerbScrambleSubmit() {
  if (state.mode !== 'verb-scramble' || state.answered) return;

  const answer = normalizeRussianAnswer(answerInput.value);
  const current = state.questions[state.index];

  if (!answer) {
    feedbackEl.textContent = 'Пожалуйста, введите ответ.';
    feedbackEl.className = 'feedback wrong';
    return;
  }

  if (answer === normalizeRussianAnswer(current)) {
    feedbackEl.textContent = `Правильно! Это — ${current}.`;
    feedbackEl.className = 'feedback correct';
    state.score += 1;
    state.answered = true;
  } else {
    feedbackEl.textContent = `Неправильно. Правильный ответ: ${current}.`;
    feedbackEl.className = 'feedback wrong';
    state.answered = true;
  }

  scoreEl.textContent = String(state.score);
  progressBar.style.width = `${((state.index + 1) / state.questions.length) * 100}%`;
  submitBtn.disabled = true;
}

submitBtn.addEventListener('click', () => {
  if (state.mode === 'verb-scramble') {
    handleVerbScrambleSubmit();
  } else {
    handlePhraseSubmit();
  }
});

function nextQuestion() {
  state.index += 1;
  submitBtn.disabled = false;

  if (state.index >= state.questions.length) {
    finishRound();
    return;
  }

  renderQuestion();
}

function finishRound() {
  quiz.classList.add('hidden');
  end.classList.remove('hidden');
  const total = state.questions.length;
  const percent = Math.round((state.score / total) * 100);
  finalScoreEl.textContent = `Вы набрали ${state.score} из ${total} (${percent}%)`;
}
