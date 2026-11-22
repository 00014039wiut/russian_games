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

// Medical vocabulary: «На приёме у врача» (used by the Camera Quiz topic).
const medicalVocabulary = [
  { russian: "Записаться на приём", uzbek: "Qabulga yozilmoq" },
  { russian: "Принимать пациентов", uzbek: "Bemorlarni qabul qilmoq" },
  { russian: "Попасть к врачу", uzbek: "Shifokor ko‘rigiga kirmoq" },
  { russian: "Прийти на осмотр", uzbek: "Ko‘rikdan o‘tish uchun kelmoq" },
  { russian: "Жаловаться на боль", uzbek: "Og‘riqdan shikoyat qilmoq" },
  { russian: "Что вас беспокоит?", uzbek: "Sizni nima bezovta qilyapti?" },
  { russian: "Где именно болит?", uzbek: "Aynan qayeringiz og‘riyapti?" },
  { russian: "Как давно это началось?", uzbek: "Bu qachondan beri davom etyapti?" },
  { russian: "У меня есть жалобы", uzbek: "Menda shikoyatlar bor" },
  { russian: "Мне стало хуже", uzbek: "Ahvolim yomonlashdi" },
  { russian: "Мне стало лучше", uzbek: "Ahvolim yaxshilandi" },
  { russian: "Я плохо себя чувствую", uzbek: "O‘zimni yomon his qilyapman" },
  { russian: "У меня нет аппетита", uzbek: "Ishtaham yo‘q" },
  { russian: "Меня знобит", uzbek: "Etim uvishyapti" },
  { russian: "У меня кружится голова", uzbek: "Boshim aylanayapti" },
  { russian: "Меня тошнит", uzbek: "Ko‘nglim ayniyapti" },
  { russian: "У меня слабость", uzbek: "Holsizman" },
  { russian: "Я быстро устаю", uzbek: "Tez charchayman" },
  { russian: "У меня нет сил", uzbek: "Menda hol yo‘q" },
  { russian: "Я потерял сознание", uzbek: "Hushimdan ketdim" },
  { russian: "Мне трудно дышать", uzbek: "Nafas olishim qiyin" },
  { russian: "У меня бессонница", uzbek: "Uyqusizlikdan qiynalyapman" },
  { russian: "У меня озноб", uzbek: "Qaltirayapman" },
  { russian: "У меня болит голова", uzbek: "Boshim og‘riyapti" },
  { russian: "У меня болит горло", uzbek: "Tomog‘im og‘riyapti" },
  { russian: "У меня болит живот", uzbek: "Qornim og‘riyapti" },
  { russian: "У меня болит спина", uzbek: "Belim / orqam og‘riyapti" },
  { russian: "У меня болят суставы", uzbek: "Bo‘g‘imlarim og‘riyapti" },
  { russian: "У меня высокая температура", uzbek: "Isitmam baland" },
  { russian: "У меня кашель", uzbek: "Yo‘talyapman" },
  { russian: "У меня насморк", uzbek: "Burnim oqyapti" },
  { russian: "У меня заложен нос", uzbek: "Burnim bitib qolgan" },
  { russian: "У меня болит при глотании", uzbek: "Yutinganimda og‘riydi" },
  { russian: "Боль усиливается", uzbek: "Og‘riq kuchayyapti" },
  { russian: "Боль постепенно проходит", uzbek: "Og‘riq asta-sekin kamayib boryapti" },
  { russian: "Боль то появляется, то исчезает", uzbek: "Og‘riq goh paydo bo‘ladi, goh yo‘qoladi" },
  { russian: "У меня аллергия", uzbek: "Menda allergiya bor" },
  { russian: "Пройти обследование", uzbek: "Tekshiruvdan o‘tmoq" },
  { russian: "Сдать анализы", uzbek: "Tahlil topshirmoq" },
  { russian: "Сдать кровь", uzbek: "Qon topshirmoq" },
  { russian: "Сделать УЗИ", uzbek: "UZI qildirmoq" },
  { russian: "Сделать рентген", uzbek: "Rentgen qildirmoq" },
  { russian: "Измерить давление", uzbek: "Qon bosimini o‘lchamoq" },
  { russian: "Прослушать лёгкие", uzbek: "O‘pkani eshitib ko‘rmoq" },
  { russian: "Поставить диагноз", uzbek: "Tashxis qo‘ymoq" },
  { russian: "Назначить лечение", uzbek: "Davolashni belgilamoq" },
  { russian: "Прописать лекарства", uzbek: "Dori yozib bermoq" },
  { russian: "Пройти курс лечения", uzbek: "Davolanish kursini o‘tamoq" },
  { russian: "Соблюдать постельный режим", uzbek: "Yotoq rejimiga rioya qilmoq" },
  { russian: "Повторно прийти на приём", uzbek: "Qayta ko‘rikka kelmoq" },
  { russian: "Обезболивающее", uzbek: "Og‘riq qoldiruvchi" },
  { russian: "Жаропонижающее", uzbek: "Isitma tushiruvchi" },
  { russian: "Противовоспалительное средство", uzbek: "Yallig‘lanishga qarshi dori" },
  { russian: "Антибиотик", uzbek: "Antibiotik" },
  { russian: "Таблетки", uzbek: "Tabletkalar" },
  { russian: "Капли", uzbek: "Tomchilar" },
  { russian: "Мазь", uzbek: "Malham" },
  { russian: "Сироп", uzbek: "Sirop" },
  { russian: "Укол / инъекция", uzbek: "Ukol" },
  { russian: "Рецепт", uzbek: "Retsept" },
  { russian: "Побочные эффекты", uzbek: "Nojo‘ya ta’sirlar" },
  { russian: "Принимать лекарство", uzbek: "Dori ichmoq" },
  { russian: "Принимать три раза в день", uzbek: "Kuniga uch mahal ichmoq" },
  { russian: "До еды", uzbek: "Ovqatdan oldin" },
  { russian: "После еды", uzbek: "Ovqatdan keyin" },
  { russian: "Один раз в день", uzbek: "Kuniga bir marta" },
  { russian: "По назначению врача", uzbek: "Shifokor tavsiyasiga ko‘ra" },
  { russian: "Это опасно?", uzbek: "Bu xavflimi?" },
  { russian: "Мне нужно беспокоиться?", uzbek: "Xavotir olishim kerakmi?" },
  { russian: "Можно обойтись без уколов?", uzbek: "Ukolsiz davolansa bo‘ladimi?" },
  { russian: "Есть ли другие варианты лечения?", uzbek: "Davolanishning boshqa usullari bormi?" },
  { russian: "Сколько дней нужно принимать лекарство?", uzbek: "Dorini necha kun ichish kerak?" },
  { russian: "Через сколько я поправлюсь?", uzbek: "Qancha vaqtda tuzalib ketaman?" },
  { russian: "Можно ли заниматься спортом?", uzbek: "Sport bilan shug‘ullansam bo‘ladimi?" },
  { russian: "Мне нужен больничный", uzbek: "Menga kasallik varaqasi kerak" },
  { russian: "Я уже принимал эти лекарства", uzbek: "Men bu dorilarni oldin ham ichganman" },
  { russian: "У меня раньше было такое", uzbek: "Oldin ham menda shunday bo‘lgan" },
  { russian: "Лекарство мне не помогает", uzbek: "Dori menga yordam bermayapti" },
  { russian: "У меня появилась сыпь", uzbek: "Badanimga toshma chiqdi" }
];

// Творительный падеж — основы (easier vocabulary).
// `group` = section of the lesson; the Camera Quiz picks wrong answers from the same
// group first (e.g. под столом / над столом / за домом / перед домом).
const instrumentalBasics = [
  { russian: "писать ручкой", uzbek: "ruchka bilan yozmoq", group: 'instrument' },
  { russian: "рисовать карандашом", uzbek: "qalam bilan rasm chizmoq", group: 'instrument' },
  { russian: "резать ножом", uzbek: "pichoq bilan kesmoq", group: 'instrument' },
  { russian: "открывать ключом", uzbek: "kalit bilan ochmoq", group: 'instrument' },
  { russian: "вытирать полотенцем", uzbek: "sochiq bilan artmoq", group: 'instrument' },
  { russian: "копать лопатой", uzbek: "belkurak bilan kovlamoq", group: 'instrument' },
  { russian: "чистить щёткой", uzbek: "cho‘tka bilan tozalamoq", group: 'instrument' },
  { russian: "есть ложкой", uzbek: "qoshiq bilan yemoq", group: 'instrument' },
  { russian: "размешивать ложкой", uzbek: "qoshiq bilan aralashtirmoq", group: 'instrument' },
  { russian: "пользоваться телефоном", uzbek: "telefondan foydalanmoq", group: 'instrument' },
  { russian: "с другом", uzbek: "do‘st bilan", group: 'with' },
  { russian: "с подругой", uzbek: "dugona bilan", group: 'with' },
  { russian: "с родителями", uzbek: "ota-ona bilan", group: 'with' },
  { russian: "с коллегами", uzbek: "hamkasblar bilan", group: 'with' },
  { russian: "с преподавателем", uzbek: "o‘qituvchi bilan", group: 'with' },
  { russian: "с учениками", uzbek: "o‘quvchilar bilan", group: 'with' },
  { russian: "с соседями", uzbek: "qo‘shnilar bilan", group: 'with' },
  { russian: "с братом", uzbek: "aka / uka bilan", group: 'with' },
  { russian: "с сестрой", uzbek: "opa / singil bilan", group: 'with' },
  { russian: "с семьёй", uzbek: "oila bilan", group: 'with' },
  { russian: "с удовольствием", uzbek: "mamnuniyat bilan", group: 'with' },
  { russian: "с интересом", uzbek: "qiziqish bilan", group: 'with' },
  { russian: "с трудом", uzbek: "qiyinchilik bilan", group: 'with' },
  { russian: "с улыбкой", uzbek: "tabassum bilan", group: 'with' },
  { russian: "с осторожностью", uzbek: "ehtiyotkorlik bilan", group: 'with' },
  { russian: "над столом", uzbek: "stol ustida", group: 'place' },
  { russian: "над кроватью", uzbek: "karavot ustida", group: 'place' },
  { russian: "над городом", uzbek: "shahar uzra", group: 'place' },
  { russian: "над рекой", uzbek: "daryo uzra", group: 'place' },
  { russian: "над головой", uzbek: "bosh uzra", group: 'place' },
  { russian: "над домом", uzbek: "uy ustida", group: 'place' },
  { russian: "под столом", uzbek: "stol ostida", group: 'place' },
  { russian: "под кроватью", uzbek: "karavot ostida", group: 'place' },
  { russian: "под деревом", uzbek: "daraxt tagida", group: 'place' },
  { russian: "под мостом", uzbek: "ko‘prik ostida", group: 'place' },
  { russian: "под землёй", uzbek: "yer ostida", group: 'place' },
  { russian: "под дождём", uzbek: "yomg‘ir ostida", group: 'place' },
  { russian: "под солнцем", uzbek: "quyosh ostida", group: 'place' },
  { russian: "за домом", uzbek: "uy orqasida", group: 'place' },
  { russian: "за деревом", uzbek: "daraxt orqasida", group: 'place' },
  { russian: "за школой", uzbek: "maktab orqasida", group: 'place' },
  { russian: "за углом", uzbek: "burchak ortida", group: 'place' },
  { russian: "за дверью", uzbek: "eshik ortida", group: 'place' },
  { russian: "перед домом", uzbek: "uy oldida", group: 'place' },
  { russian: "перед зеркалом", uzbek: "ko‘zgu oldida", group: 'place' },
  { russian: "перед школой", uzbek: "maktab oldida", group: 'place' },
  { russian: "перед входом", uzbek: "kirish joyi oldida", group: 'place' },
  { russian: "передо мной", uzbek: "mening oldimda", group: 'place' },
  { russian: "перед работой", uzbek: "ishdan oldin", group: 'place' },
  { russian: "работать учителем", uzbek: "o‘qituvchi bo‘lib ishlamoq", group: 'profession' },
  { russian: "работать врачом", uzbek: "shifokor bo‘lib ishlamoq", group: 'profession' },
  { russian: "работать переводчиком", uzbek: "tarjimon bo‘lib ishlamoq", group: 'profession' },
  { russian: "стать директором", uzbek: "direktor bo‘lmoq", group: 'profession' },
  { russian: "стать специалистом", uzbek: "mutaxassis bo‘lmoq", group: 'profession' },
  { russian: "стать известным человеком", uzbek: "mashhur inson bo‘lmoq", group: 'profession' },
  { russian: "быть хорошим другом", uzbek: "yaxshi do‘st bo‘lmoq", group: 'profession' },
  { russian: "быть ответственным человеком", uzbek: "mas’uliyatli inson bo‘lmoq", group: 'profession' },
  { russian: "заниматься спортом", uzbek: "sport bilan shug‘ullanmoq", group: 'verbs' },
  { russian: "заниматься музыкой", uzbek: "musiqa bilan shug‘ullanmoq", group: 'verbs' },
  { russian: "заниматься наукой", uzbek: "ilm bilan shug‘ullanmoq", group: 'verbs' },
  { russian: "интересоваться искусством", uzbek: "san’atga qiziqmoq", group: 'verbs' },
  { russian: "увлекаться фотографией", uzbek: "fotografiyaga qiziqmoq", group: 'verbs' },
  { russian: "гордиться родителями", uzbek: "ota-onasi bilan faxrlanmoq", group: 'verbs' },
  { russian: "любоваться природой", uzbek: "tabiatdan zavqlanmoq", group: 'verbs' },
  { russian: "управлять машиной", uzbek: "mashinani boshqarmoq", group: 'verbs' },
  { russian: "руководить коллективом", uzbek: "jamoaga rahbarlik qilmoq", group: 'verbs' },
  { russian: "пользоваться компьютером", uzbek: "kompyuterdan foydalanmoq", group: 'verbs' },
  { russian: "владеть иностранным языком", uzbek: "chet tilini bilmoq", group: 'verbs' },
  { russian: "следить за порядком", uzbek: "tartibni kuzatib turmoq", group: 'verbs' },
  { russian: "идти быстрым шагом", uzbek: "tez qadamlar bilan yurmoq", group: 'manner' },
  { russian: "говорить тихим голосом", uzbek: "past ovozda gapirmoq", group: 'manner' },
  { russian: "говорить громким голосом", uzbek: "baland ovozda gapirmoq", group: 'manner' },
  { russian: "смотреть грустными глазами", uzbek: "g‘amgin ko‘zlar bilan qaramoq", group: 'manner' },
  { russian: "отвечать уверенным голосом", uzbek: "ishonchli ovoz bilan javob bermoq", group: 'manner' },
  { russian: "работать целыми днями", uzbek: "kun bo‘yi ishlamoq", group: 'manner' },
  { russian: "идти лесной дорогой", uzbek: "o‘rmon yo‘lidan yurmoq", group: 'manner' },
  { russian: "ехать ночным поездом", uzbek: "tungi poyezdda ketmoq", group: 'manner' },
  { russian: "заниматься любимым делом", uzbek: "sevimli ishi bilan shug‘ullanmoq", group: 'phrases' },
  { russian: "интересоваться современной музыкой", uzbek: "zamonaviy musiqaga qiziqmoq", group: 'phrases' },
  { russian: "разговаривать с близким человеком", uzbek: "yaqin inson bilan suhbatlashmoq", group: 'phrases' },
  { russian: "делиться своими мыслями", uzbek: "o‘z fikrlari bilan bo‘lishmoq", group: 'phrases' },
  { russian: "управлять собственным временем", uzbek: "o‘z vaqtini boshqarmoq", group: 'phrases' },
  { russian: "гордиться своими достижениями", uzbek: "o‘z yutuqlari bilan faxrlanmoq", group: 'phrases' },
  { russian: "следить за своим здоровьем", uzbek: "o‘z sog‘lig‘iga e’tibor bermoq", group: 'phrases' },
  { russian: "справляться с трудностями", uzbek: "qiyinchiliklarni yengib o‘tmoq", group: 'phrases' },
  { russian: "встречаться со старыми друзьями", uzbek: "eski do‘stlar bilan uchrashmoq", group: 'phrases' },
  { russian: "прощаться с родными", uzbek: "yaqinlari bilan xayrlashmoq", group: 'phrases' }
];

// Творительный падеж — продвинутая лексика, №1–25 (learned).
const instrumentalPart1 = [
  { russian: "руководствоваться здравым смыслом", uzbek: "sog‘lom fikrga tayanmoq" },
  { russian: "делиться переживаниями", uzbek: "kechinmalari bilan bo‘lishmoq" },
  { russian: "располагать к себе окружающих", uzbek: "atrofdagilarda iliq taassurot uyg‘otmoq" },
  { russian: "манипулировать чужими чувствами", uzbek: "boshqalarning his-tuyg‘ularini boshqarmoq" },
  { russian: "пренебрегать чужим мнением", uzbek: "boshqalarning fikrini mensimaslik" },
  { russian: "дорожить близкими людьми", uzbek: "yaqin insonlarini qadrlamoq" },
  { russian: "жертвовать собственными интересами", uzbek: "o‘z manfaatlarini qurbon qilmoq" },
  { russian: "считаться с чужими обстоятельствами", uzbek: "boshqalarning sharoitini inobatga olmoq" },
  { russian: "мириться с несправедливостью", uzbek: "adolatsizlikka ko‘nmoq" },
  { russian: "распрощаться с иллюзиями", uzbek: "xomxayollardan voz kechmoq" },
  { russian: "руководствоваться личными убеждениями", uzbek: "shaxsiy e'tiqodlariga tayanmoq" },
  { russian: "аргументировать позицию фактами", uzbek: "pozitsiyasini dalillar bilan asoslamoq" },
  { russian: "подкреплять слова конкретными примерами", uzbek: "so‘zlarini aniq misollar bilan mustahkamlamoq" },
  { russian: "добиваться результата упорным трудом", uzbek: "tinimsiz mehnat bilan natijaga erishmoq" },
  { russian: "решать конфликты мирным путём", uzbek: "nizolarni tinch yo‘l bilan hal qilmoq" },
  { russian: "реагировать на критику сдержанностью", uzbek: "tanqidga vazminlik bilan munosabat bildirmoq" },
  { russian: "отвечать за свои поступки", uzbek: "o‘z xatti-harakatlari uchun javob bermoq" },
  { russian: "распоряжаться собственным временем", uzbek: "o‘z vaqtini tasarruf etmoq" },
  { russian: "стать востребованным специалистом", uzbek: "talab yuqori bo‘lgan mutaxassisga aylanmoq" },
  { russian: "зарекомендовать себя профессионалом", uzbek: "o‘zini professional sifatida ko‘rsata olmoq" },
  { russian: "слыть авторитетным человеком", uzbek: "obro‘li inson sifatida tanilmoq" },
  { russian: "ощущать себя чужаком", uzbek: "o‘zini begona his qilmoq" },
  { russian: "оставаться самим собой", uzbek: "o‘zligicha qolmoq" },
  { russian: "стать заложником обстоятельств", uzbek: "vaziyatlar qurboniga aylanmoq" },
  { russian: "прослыть ненадёжным человеком", uzbek: "ishonchsiz inson sifatida nom chiqarmoq" }
];

// Творительный падеж — продвинутая лексика, №26–55.
const instrumentalPart2 = [
  { russian: "испытывать гордость за достигнутое", uzbek: "erishgan yutuqlaridan faxrlanmoq" },
  { russian: "мучиться угрызениями совести", uzbek: "vijdon azobida qiynalmoq" },
  { russian: "переполняться противоречивыми чувствами", uzbek: "qarama-qarshi his-tuyg‘ularga to‘lib-toshmoq" },
  { russian: "проникнуться чужой болью", uzbek: "boshqalarning dardini chuqur his qilmoq" },
  { russian: "наслаждаться долгожданным покоем", uzbek: "uzoq kutilgan osoyishtalikdan zavqlanmoq" },
  { russian: "тяготиться одиночеством", uzbek: "yolg‘izlikdan qiynalmoq" },
  { russian: "утратить интерес к происходящему", uzbek: "sodir bo‘layotgan voqealarga qiziqishini yo‘qotmoq" },
  { russian: "преисполниться решимостью", uzbek: "qat'iyatga to‘lmoq" },
  { russian: "столкнуться с серьёзными препятствиями", uzbek: "jiddiy to‘siqlarga duch kelmoq" },
  { russian: "смириться с утратой", uzbek: "yo‘qotishga ko‘nikmoq" },
  { russian: "справиться с эмоциональным напряжением", uzbek: "ruhiy zo‘riqishni yengib o‘tmoq" },
  { russian: "распрощаться с прежними привычками", uzbek: "eski odatlari bilan xayrlashmoq" },
  { russian: "столкнуться с предвзятым отношением", uzbek: "noxolis munosabatga duch kelmoq" },
  { russian: "бороться с внутренними противоречиями", uzbek: "ichki ziddiyatlar bilan kurashmoq" },
  { russian: "покончить с неопределённостью", uzbek: "noaniqlikka chek qo‘ymoq" },
  { russian: "задуматься над собственным поведением", uzbek: "o‘z xulq-atvori haqida chuqur o‘ylab ko‘rmoq" },
  { russian: "работать над собой", uzbek: "o‘z ustida ishlamoq" },
  { russian: "взять верх над эмоциями", uzbek: "his-tuyg‘ularini jilovlamoq" },
  { russian: "находиться под постоянным давлением", uzbek: "doimiy bosim ostida bo‘lmoq" },
  { russian: "оказаться перед лицом неизвестности", uzbek: "noma'lumlik qarshisida qolmoq" },
  { russian: "разрываться между обязанностями и желаниями", uzbek: "majburiyatlar va istaklar o‘rtasida ikkilanmoq" },
  { russian: "стоять между двух огней", uzbek: "ikki o‘t orasida qolmoq" },
  { russian: "поступать вопреки собственным убеждениям", uzbek: "o‘z e'tiqodlariga zid ravishda ish tutmoq" },
  { russian: "ограничиваться поверхностными суждениями", uzbek: "yuzaki fikrlar bilan cheklanib qolmoq" },
  { russian: "злоупотреблять предоставленными полномочиями", uzbek: "berilgan vakolatlardan suiiste'mol qilmoq" },
  { russian: "довольствоваться достигнутым", uzbek: "erishganlari bilan kifoyalanmoq" },
  { russian: "обладать исключительными способностями", uzbek: "noyob qobiliyatlarga ega bo‘lmoq" },
  { russian: "пренебрегать элементарными правилами", uzbek: "oddiy qoidalarga bepisand munosabatda bo‘lmoq" },
  { russian: "руководствоваться исключительно личной выгодой", uzbek: "faqat shaxsiy manfaatni ko‘zlab ish tutmoq" },
  { russian: "справляться с возложенными обязанностями", uzbek: "zimmasiga yuklatilgan vazifalarni uddalamoq" }
];

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
  'брать', 'взять',
  'включать', 'включить',
  'выбирать', 'выбрать',
  'выключать', 'выключить',
  'готовить', 'приготовить',
  'делать', 'сделать',
  'есть', 'съесть',
  'заказывать', 'заказать',
  'закрывать', 'закрыть',
  'искать', 'поискать',
  'исправлять', 'исправить',
  'менять', 'поменять',
  'мыть', 'вымыть',
  'обсуждать', 'обсудить',
  'открывать', 'открыть',
  'переводить', 'перевести',
  'петь', 'спеть',
  'пить', 'выпить',
  'повторять', 'повторить',
  'покупать', 'купить',
  'получать', 'получить',
  'принимать', 'принять',
  'приносить', 'принести',
  'проверять', 'проверить',
  'рисовать', 'нарисовать',
  'стирать', 'постирать',
  'строить', 'построить',
  'терять', 'потерять',
  'убирать', 'убрать',
  'учить', 'выучить',
  'читать', 'прочитать',
  'забывать', 'забыть',
  'решать', 'решить',
  'будить', 'разбудить',
  'видеть', 'увидеть',
  'встречать', 'встретить',
  'ждать', 'подождать',
  'поздравлять', 'поздравить',
  'понимать', 'понять',
  'приглашать', 'пригласить',
  'спрашивать', 'спросить',
  'говорить', 'сказать',
  'давать', 'дать',
  'писать', 'написать',
  'посылать', 'послать',
  'отправлять', 'отправить',
  'звонить', 'позвонить',
  'видеться', 'увидеться',
  'встречаться', 'встретиться',
  'договориваться', 'договориться',
  'знакомиться', 'познакомиться',
  'гулять', 'погулять',
  'отдыхать', 'отдохнуть',
  'мочь', 'смочь',
  'думать', 'подумать',
  'отвечать', 'ответить',
  'платить', 'заплатить',
  'играть', 'поиграть',
  'возвращаться', 'вернуться',
  'опаздывать', 'опоздать',
  'ложиться', 'лечь',
  'вставать', 'встать',
  'болеть', 'заболеть',
  'одеваться', 'одеться',
  'раздеваться', 'раздеться'
];

const fullLessonVerbs = [...new Set(verbScrambleVocabulary)];

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
const verbListPanel = document.getElementById('verb-list-panel');
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
const verbList = document.getElementById('verb-list');

let state = {
  mode: null,
  questions: [],
  index: 0,
  score: 0,
  answered: false,
};

document.querySelectorAll('#menu .btn[data-mode]').forEach((btn) => {
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

document.getElementById('show-verb-list').addEventListener('click', () => {
  renderVerbList();
  menu.classList.add('hidden');
  verbListPanel.classList.remove('hidden');
});

document.getElementById('close-verb-list').addEventListener('click', () => {
  verbListPanel.classList.add('hidden');
  menu.classList.remove('hidden');
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
  verbListPanel.classList.add('hidden');
  menu.classList.remove('hidden');
  state = { mode: null, questions: [], index: 0, score: 0, answered: false };
  answerInput.value = '';
}

function renderVerbList() {
  verbList.innerHTML = '';
  fullLessonVerbs.forEach((verb) => {
    const li = document.createElement('li');
    li.textContent = verb;
    verbList.appendChild(li);
  });
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
