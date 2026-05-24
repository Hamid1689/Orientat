import { useState, useRef, useEffect } from "react";

/* ══ COLORS ══
   Purple:  #2D2752
   Red:     #D50D1F
   White:   #FFFFFF
   BG:      #FFFFFF (white page)
*/
const C = {
  purple:      "#2D2752",
  red:         "#D50D1F",
  white:       "#FFFFFF",
  bg:          "#F4F6FB",
  cardBg:      "#FFFFFF",
  cardHover:   "#F0F3FA",
  purpleLight: "#EEF0FA",
  border:      "#D8DCF0",
  textDark:    "#1A1640",
  textMid:     "#3D3A6B",
  textMuted:   "#7B7A9D",
};

const Logo = ({ size = 38 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="58" fill={C.purple}/>
    <circle cx="60" cy="60" r="58" fill="none" stroke={C.red} strokeWidth="3"/>
    <polygon points="60,18 104,44 60,54 16,44" fill={C.white}/>
    <rect x="57.5" y="54" width="5" height="18" fill={C.white}/>
    <circle cx="60" cy="75" r="4" fill={C.white}/>
    <polygon points="36,57 60,90 84,57 78,57 60,80 42,57" fill={C.red}/>
    <text x="26" y="70" fontSize="10" fill={C.white} textAnchor="middle">★</text>
    <text x="94" y="70" fontSize="10" fill={C.white} textAnchor="middle">★</text>
    <circle cx="60" cy="36" r="9" fill={C.red}/>
    <circle cx="60" cy="36" r="6" fill={C.white}/>
    <circle cx="60" cy="36" r="3" fill={C.purple}/>
  </svg>
);

const PROGRAMS = {
  comp_eng:   {faculty:"fi",emoji:"🖥️",kr:378000,int:432000,lang:"Англ.",ru:{name:"Компьютерная инженерия",desc:"Проектирование аппаратных и программных систем, компьютерных сетей. Одна из наиболее оплачиваемых IT-специальностей."},kg:{name:"Компьютердик инженерия",desc:"Аппараттык жана программалык системаларды долбоорлоо. Эң жогору акы төлөнүүчү IT адистиктеринин бири."},en:{name:"Computer Engineering",desc:"Design of hardware/software systems and networks. One of the highest-paying IT specialties."}},
  cyber:      {faculty:"fi",emoji:"🔐",kr:315000,int:387000,lang:"Англ.",ru:{name:"Кибербезопасность и этичный хакинг",desc:"Защита систем, пентестинг, анализ уязвимостей и цифровая криминалистика."},kg:{name:"Киберкоопсуздук жана этикалык хакинг",desc:"Системаларды коргоо, пентестинг жана санариптик криминалистика."},en:{name:"Cybersecurity & Ethical Hacking",desc:"System protection, penetration testing and digital forensics."}},
  creative:   {faculty:"fi",emoji:"🎨",kr:315000,int:387000,lang:"Англ.",ru:{name:"Основы креативных индустрий",desc:"Цифровой дизайн, медиапроизводство, анимация и UX/UI. Программа на стыке технологий и творчества."},kg:{name:"Чыгармачыл индустриялардын негиздери",desc:"Санариптик дизайн, медиа өндүрүш жана UX/UI. Технология менен чыгармачылыктын чегиндеги программа."},en:{name:"Creative Industries Foundation",desc:"Digital design, media production and UX/UI. A programme at the intersection of technology and creativity."}},
  data_sci:   {faculty:"fi",emoji:"📊",kr:315000,int:387000,lang:"Англ.",ru:{name:"Анализ данных и интеллект. системы",desc:"Машинное обучение, большие данные, статистика. Data Scientist — профессия №1 по перспективности."},kg:{name:"Маалыматтарды анализ жана интел. системалар",desc:"Машиналык үйрөнүү, big data, статистика. Data Scientist — №1 перспективдүү кесип."},en:{name:"Data Science & Intelligent Systems",desc:"Machine learning, big data and statistics. Data Scientist is the #1 most in-demand career."}},
  apmath:     {faculty:"fi",emoji:"📐",kr:252000,int:387000,lang:"Англ.",ru:{name:"Прикл. математика и информатика в образовании",desc:"Математические методы в информатике и подготовка преподавателей STEM-дисциплин."},kg:{name:"Билим берүүдөгү колдонмо математика",desc:"Информатикадагы математикалык методдор жана STEM дисциплиналарын окутуу."},en:{name:"Applied Math & Informatics in Education",desc:"Mathematical methods in informatics and training STEM subject teachers."}},
  ai_robo:    {faculty:"fi",emoji:"🤖",kr:270000,int:387000,lang:"Англ.",ru:{name:"Искусственный интеллект и робототехника",desc:"Нейросети, компьютерное зрение и разработка роботов — технологии завтрашнего дня."},kg:{name:"Жасалма интеллект жана роботтехника",desc:"Нейросеттер, компьютердик көрүү жана роботторду иштеп чыгуу."},en:{name:"AI & Robotics",desc:"Neural networks, computer vision and robotics — the technologies of tomorrow."}},
  it_mgmt:    {faculty:"fi",emoji:"⚙️",kr:270000,int:387000,lang:"Англ.",ru:{name:"Менеджмент качества в ИТ",desc:"DevOps, Agile, Scrum-методологии и управление IT-командами и продуктами."},kg:{name:"ITде сапат менеджменти",desc:"DevOps, Agile, Scrum методологиялары жана IT командаларды башкаруу."},en:{name:"Quality Management in IT",desc:"DevOps, Agile and Scrum methodologies and IT product management."}},
  econ_biz:   {faculty:"fe",emoji:"💼",kr:288000,int:360000,lang:"Англ.",ru:{name:"Экономика (межд. экономика и бизнес)",desc:"Международная торговля, анализ глобальных рынков. Карьера в международных корпорациях."},kg:{name:"Экономика (эл аралык экономика жана бизнес)",desc:"Эл аралык соода жана глобалдык рынктарды анализ. Эл аралык корпорацияларда карьера."},en:{name:"Economics (Int'l Economics & Business)",desc:"International trade and global market analysis. Career in international corporations."}},
  econ_fin:   {faculty:"fe",emoji:"💰",kr:288000,int:360000,lang:"Англ.",ru:{name:"Экономика (финансы и кредит)",desc:"Банковское дело, инвестиции и финансовые рынки. Карьера в банках и инвестиционных фондах."},kg:{name:"Экономика (финансы жана кредит)",desc:"Банк иши, инвестициялар жана каржы рынктары. Банктарда карьера."},en:{name:"Economics (Finance & Credit)",desc:"Banking, investments and financial markets. Career in banks and investment funds."}},
  econ_audit: {faculty:"fe",emoji:"📑",kr:288000,int:360000,lang:"Англ.",ru:{name:"Экономика (межд. бухучёт и аудит)",desc:"МСФО, аудит и налогообложение. Высокий спрос в аудиторских компаниях Big Four."},kg:{name:"Экономика (эл аралык бухгалтердик эсеп жана аудит)",desc:"МСФО, аудит жана салыктоо. Big Four аудиторлук компанияларында суранычта."},en:{name:"Economics (Int'l Accounting & Audit)",desc:"IFRS, auditing and taxation. High demand in Big Four accounting firms."}},
  econ_env:   {faculty:"fe",emoji:"🌱",kr:288000,int:360000,lang:"Англ.",ru:{name:"Экономика (экономика окруж. среды)",desc:"Устойчивое развитие, зелёная экономика и ESG-стратегии."},kg:{name:"Экономика (айлана-чөйрө экономикасы)",desc:"Туруктуу өнүгүү, жашыл экономика жана ESG стратегиялар."},en:{name:"Economics (Environmental Economics)",desc:"Sustainable development, green economy and ESG strategies."}},
  mgmt:       {faculty:"fe",emoji:"📋",kr:297000,int:360000,lang:"Англ.",ru:{name:"Менеджмент",desc:"Управление организациями, стратегическое планирование, HR и лидерство."},kg:{name:"Менеджмент",desc:"Уюмдарды башкаруу, стратегиялык пландоо жана лидерлик."},en:{name:"Management",desc:"Organisational management, strategic planning, HR and leadership."}},
  mgmt_dist:  {faculty:"fe",emoji:"💻",kr:180000,int:225000,lang:"Англ.",ru:{name:"Менеджмент (дистанционное обучение)",desc:"Менеджерские компетенции в гибком онлайн-формате. Самая доступная программа AIU."},kg:{name:"Менеджмент (алыстан окутуу)",desc:"Менеджердик компетенциялар онлайн форматта. МУАдагы эң арзан программа."},en:{name:"Management (Distance Learning)",desc:"Management skills in a flexible online format. The most affordable programme at AIU."}},
  mgmt_hosp:  {faculty:"fe",emoji:"🏨",kr:297000,int:360000,lang:"Англ.",ru:{name:"Менеджмент (гостеприимство и туризм)",desc:"Управление отелями, туристическими компаниями и ресторанным бизнесом."},kg:{name:"Менеджмент (мейманкана жана туризм)",desc:"Мейманканаларды, туристтик компанияларды жана ресторандарды башкаруу."},en:{name:"Management (Hospitality & Tourism)",desc:"Managing hotels, tourist companies and restaurant businesses."}},
  law:        {faculty:"fe",emoji:"⚖️",kr:270000,int:333000,lang:"Англ.",ru:{name:"Юриспруденция (межд. и бизнес право)",desc:"Международное право, корпоративные сделки и коммерческое право."},kg:{name:"Юриспруденция (эл аралык жана бизнес укуку)",desc:"Эл аралык укук, корпоративдик бүтүмдөр жана коммерциялык укук."},en:{name:"Jurisprudence (Int'l & Business Law)",desc:"International law, corporate transactions and commercial law."}},
  philology:  {faculty:"fo",emoji:"📖",kr:234000,int:360000,lang:"Англ.",ru:{name:"Филология (англ. язык и литература)",desc:"Глубокое изучение английского языка, мировой литературы и культуры."},kg:{name:"Филология (англис тили жана адабияты)",desc:"Англис тилин жана дүйнөлүк адабиятты терең изилдөө."},en:{name:"Philology (English Language & Literature)",desc:"In-depth study of the English language, world literature and culture."}},
  phil_edu:   {faculty:"fo",emoji:"📝",kr:234000,int:360000,lang:"Англ.",ru:{name:"Филологическое образование",desc:"Преподавание языков и литературы в школах. Программа для будущих учителей."},kg:{name:"Филологиялык билим берүү",desc:"Мектептерде тил жана адабиятты окутуу. Келечектеги мугалимдер үчүн."},en:{name:"Philological Education",desc:"Teaching languages and literature in schools. Designed for future teachers."}},
  linguistics:{faculty:"fo",emoji:"🗣️",kr:234000,int:360000,lang:"Англ.",ru:{name:"Лингвистика (перевод и переводоведение)",desc:"Устный и письменный перевод на английском, турецком и китайском языках."},kg:{name:"Лингвистика (котормо жана котормо таануу)",desc:"Англис, түрк жана кытай тилдеринде оозеки жана жазуу котормо."},en:{name:"Linguistics (Translation Studies)",desc:"Oral and written translation in English, Turkish and Chinese."}},
  pedagogy:   {faculty:"fo",emoji:"📚",kr:216000,int:333000,lang:"Англ.+Русс.",ru:{name:"Педагогика",desc:"Методика преподавания в начальной школе, педагогическая психология и развитие детей."},kg:{name:"Педагогика",desc:"Баштапкы мектептеги окутуу методикасы жана балдардын өнүгүүсү."},en:{name:"Pedagogy",desc:"Teaching methodology for primary school, educational psychology and child development."}},
  stem:       {faculty:"fo",emoji:"🔬",kr:252000,int:333000,lang:"Англ.+Русс.",ru:{name:"Педагогика (STEM образование)",desc:"Интеграция науки, технологий и математики в образование через эксперименты."},kg:{name:"Педагогика (STEM билим берүү)",desc:"Илим, технология жана математиканы билим берүүгө интеграциялоо."},en:{name:"Pedagogy (STEM Education)",desc:"Integrating science, technology and maths into education through experiments."}},
  speech:     {faculty:"fo",emoji:"💬",kr:225000,int:333000,lang:"Англ.+Русс.",ru:{name:"Логопедия",desc:"Диагностика и коррекция речевых нарушений у детей и взрослых."},kg:{name:"Логопедия",desc:"Сүйлөө бузулууларын диагностикалоо жана оңдоо."},en:{name:"Speech Therapy (Logopedics)",desc:"Diagnosing and correcting speech disorders in children and adults."}},
  ir:         {faculty:"fs",emoji:"🌐",kr:288000,int:360000,lang:"Англ.",ru:{name:"Международные отношения",desc:"Дипломатия, международная политика и право ООН. Карьера в МИД, посольствах и НПО."},kg:{name:"Эл аралык мамилелер",desc:"Дипломатия, эл аралык саясат жана БУУ укугу. СИМде жана элчиликтерде карьера."},en:{name:"International Relations",desc:"Diplomacy, international politics and UN law. Career in the MFA, embassies and NGOs."}},
  psych:      {faculty:"fs",emoji:"🧠",kr:270000,int:333000,lang:"Англ.",ru:{name:"Психология",desc:"Общая, клиническая и организационная психология. Карьера в клиниках и корпорациях."},kg:{name:"Психология",desc:"Жалпы, клиникалык жана уюмдук психология. Клиникаларда жана корпорацияларда карьера."},en:{name:"Psychology",desc:"General, clinical and organisational psychology. Career in clinics and corporations."}},
  soc_psych:  {faculty:"fs",emoji:"👥",kr:225000,int:333000,lang:"Англ.",ru:{name:"Социальная психология",desc:"Групповая динамика, социальное поведение и HR. Для специалистов по управлению командами."},kg:{name:"Социалдык психология",desc:"Топтук динамика, социалдык жүрүм-турум жана HR."},en:{name:"Social Psychology",desc:"Group dynamics, social behaviour and HR. For team and people management specialists."}},
  journalism: {faculty:"fs",emoji:"📰",kr:243000,int:333000,lang:"Англ.",ru:{name:"Медиа, коммуникация и дизайн (Журналистика)",desc:"Мультимедийная журналистика, видеопроизводство и медиадизайн."},kg:{name:"Медиа, коммуникация жана дизайн (Журналистика)",desc:"Мультимедиялык журналистика жана медиадизайн."},en:{name:"Media, Communication & Design (Journalism)",desc:"Multimedia journalism, video production and media design."}},
  pr:         {faculty:"fs",emoji:"📣",kr:252000,int:333000,lang:"Англ.",ru:{name:"Реклама и связь с общественностью",desc:"PR-кампании, брендинг и digital-маркетинг. Высокий спрос в корпорациях и агентствах."},kg:{name:"Жарнама жана коомчулук менен байланыш",desc:"PR кампаниялар, брендинг жана digital маркетинг."},en:{name:"PR & Advertising",desc:"PR campaigns, branding and digital marketing. High demand in corporations and agencies."}},
  medicine:   {faculty:"med",emoji:"🩺",kr:297000,int:405000,lang:"Англ.",ru:{name:"Лечебное дело (General Medicine)",desc:"6-летняя клиническая программа на английском. Практика с 1-го семестра в больницах Бишкека."},kg:{name:"Дарылоо иши (General Medicine)",desc:"Англис тилинде 6 жылдык клиникалык программа. 1-семестрден Бишкек ооруканаларында практика."},en:{name:"General Medicine",desc:"A 6-year English clinical programme with hospital practice from semester 1 in Bishkek."}},
};

const FACULTIES = {
  ru:[
    {id:"fi",name:"Инженерия и Информатика",emoji:"💻",color:"#0F766E",ort:110,ortExtra:"Математика + Физика (доп. тест, мин. 60 каждый)",desc:"Компьютерная инженерия, кибербезопасность, AI, Data Science, творческие технологии"},
    {id:"fe",name:"Экономика и Управление",emoji:"📊",color:"#B45309",ort:110,ortExtra:null,desc:"Экономика, финансы, менеджмент, гостеприимство, юриспруденция"},
    {id:"fo",name:"Образование",emoji:"📚",color:"#15803D",ort:110,ortExtra:null,desc:"Филология, лингвистика, педагогика, STEM образование, логопедия"},
    {id:"fs",name:"Социальные науки",emoji:"🌍",color:"#7E22CE",ort:110,ortExtra:null,desc:"Международные отношения, психология, журналистика, PR и реклама"},
    {id:"med",name:"Медицинский факультет",emoji:"🩺",color:"#C2410C",ort:110,ortExtra:"Биология + Химия (доп. тест, мин. 60 каждый) — ОБЯЗАТЕЛЬНО",desc:"General Medicine — 6-летняя программа на английском с клинической практикой"},
  ],
  kg:[
    {id:"fi",name:"Инженерия жана Информатика",emoji:"💻",color:"#0F766E",ort:110,ortExtra:"Математика + Физика (кошумча тест, мин. 60 ар бири)",desc:"Компьютердик инженерия, киберкоопсуздук, AI, Data Science, чыгармачыл технологиялар"},
    {id:"fe",name:"Экономика жана Башкаруу",emoji:"📊",color:"#B45309",ort:110,ortExtra:null,desc:"Экономика, каржы, менеджмент, мейманкана, юриспруденция"},
    {id:"fo",name:"Билим берүү",emoji:"📚",color:"#15803D",ort:110,ortExtra:null,desc:"Филология, лингвистика, педагогика, STEM билим берүү, логопедия"},
    {id:"fs",name:"Социалдык илимдер",emoji:"🌍",color:"#7E22CE",ort:110,ortExtra:null,desc:"Эл аралык мамилелер, психология, журналистика, PR жана жарнама"},
    {id:"med",name:"Медицина факультети",emoji:"🩺",color:"#C2410C",ort:110,ortExtra:"Биология + Химия (кошумча тест, мин. 60 ар бири) — МИЛДЕТТҮҮ",desc:"General Medicine — 6 жылдык англис тилиндеги программа, клиникалык практика менен"},
  ],
  en:[
    {id:"fi",name:"Engineering & Informatics",emoji:"💻",color:"#0F766E",ort:110,ortExtra:"Math + Physics (extra test, min 60 each)",desc:"Computer engineering, cybersecurity, AI, data science, creative technologies"},
    {id:"fe",name:"Economics & Management",emoji:"📊",color:"#B45309",ort:110,ortExtra:null,desc:"Economics, finance, management, hospitality, jurisprudence"},
    {id:"fo",name:"Education",emoji:"📚",color:"#15803D",ort:110,ortExtra:null,desc:"Philology, linguistics, pedagogy, STEM education, speech therapy"},
    {id:"fs",name:"Social Sciences",emoji:"🌍",color:"#7E22CE",ort:110,ortExtra:null,desc:"International relations, psychology, journalism, PR & advertising"},
    {id:"med",name:"Medicine",emoji:"🩺",color:"#C2410C",ort:110,ortExtra:"Biology & Chemistry (extra test, min 60 each) — REQUIRED",desc:"General Medicine — 6-year English programme with clinical practice from semester 1"},
  ],
};

const QUIZ_DATA = {
  ru:[
    {q:"Какие предметы тебе нравятся больше всего?",opts:[{l:"Математика, физика, информатика",t:["fi"]},{l:"История, экономика, обществознание",t:["fe","fs"]},{l:"Языки и литература",t:["fo"]},{l:"Биология и химия",t:["med"]}]},
    {q:"Где ты видишь себя через 10 лет?",opts:[{l:"Создаю технологии или цифровой контент",t:["fi"]},{l:"Управляю бизнесом или работаю в праве",t:["fe"]},{l:"Преподаю, перевожу или занимаюсь наукой",t:["fo"]},{l:"Работаю врачом или психологом",t:["med","fs"]}]},
    {q:"Какой стиль работы тебе ближе?",opts:[{l:"Решать технические задачи или создавать дизайн",t:["fi"]},{l:"Анализировать данные и принимать решения",t:["fe"]},{l:"Общаться, писать, объяснять",t:["fo","fs"]},{l:"Работать с людьми и помогать им физически",t:["med"]}]},
    {q:"Что тебя вдохновляет больше всего?",opts:[{l:"Новые технологии, AI, программирование",t:["fi"]},{l:"Глобальная экономика и международный бизнес",t:["fe"]},{l:"Языки, культуры, обучение детей",t:["fo"]},{l:"Медицина, жизнь человека, психология",t:["med","fs"]}]},
    {q:"Как ты предпочитаешь учиться?",opts:[{l:"Проекты, хакатоны, лабораторные работы",t:["fi"]},{l:"Кейсы, презентации, командная работа",t:["fe"]},{l:"Дискуссии, творческие задания",t:["fo","fs"]},{l:"Клинические занятия, изучение случаев",t:["med"]}]},
    {q:"Насколько важна стоимость обучения?",opts:[{l:"Ищу самую доступную программу",t:["fo","fs"]},{l:"Готов(а) платить больше за топ-специальность",t:["fi","med"]},{l:"Важно соотношение цены и качества",t:["fe"]},{l:"Стоимость — не главный критерий",t:["fi","fe","fo","fs","med"]}]},
    {q:"Насколько важен английский язык?",opts:[{l:"Хочу работать в международных IT-компаниях",t:["fi"]},{l:"Ключевой для карьеры в бизнесе",t:["fe"]},{l:"Страстно люблю языки и перевод",t:["fo"]},{l:"Нужен для работы врачом за рубежом",t:["med"]}]},
    {q:"Как проводишь свободное время?",opts:[{l:"Программирую, рисую, снимаю видео",t:["fi"]},{l:"Слежу за новостями экономики и политики",t:["fe","fs"]},{l:"Читаю, пишу, работаю с детьми",t:["fo"]},{l:"Интересуюсь медициной и психологией",t:["med","fs"]}]},
  ],
  kg:[
    {q:"Кайсы предметтер сага жагат?",opts:[{l:"Математика, физика, информатика",t:["fi"]},{l:"Тарых, экономика, коомтаануу",t:["fe","fs"]},{l:"Тилдер жана адабият",t:["fo"]},{l:"Биология жана химия",t:["med"]}]},
    {q:"10 жылдан кийин кайда болосуң?",opts:[{l:"Технология же санариптик мазмун жаратам",t:["fi"]},{l:"Бизнес жүргүзөм же укук менен иштейм",t:["fe"]},{l:"Окутам, котором же илим менен алектенем",t:["fo"]},{l:"Дарыгер же психолог болом",t:["med","fs"]}]},
    {q:"Кандай иш стили сага жакын?",opts:[{l:"Техникалык маселелерди чечүү же дизайн",t:["fi"]},{l:"Маалыматтарды анализ кылуу",t:["fe"]},{l:"Баарлашуу, жазуу, түшүндүрүү",t:["fo","fs"]},{l:"Адамдарга жардам берүү",t:["med"]}]},
    {q:"Сени эмне шыктандырат?",opts:[{l:"Жаңы технологиялар, AI, программалоо",t:["fi"]},{l:"Глобалдык экономика жана бизнес",t:["fe"]},{l:"Тилдер, маданияттар, балдарды окутуу",t:["fo"]},{l:"Медицина, психология",t:["med","fs"]}]},
    {q:"Окуу форматы?",opts:[{l:"Долбоорлор, хакатондор, лаборатория",t:["fi"]},{l:"Кейстер, презентациялар, команда",t:["fe"]},{l:"Талкуулар, чыгармачыл тапшырмалар",t:["fo","fs"]},{l:"Клиникалык сабактар",t:["med"]}]},
    {q:"Окуу наркы маанилүүбү?",opts:[{l:"Эң арзан программаны издейм",t:["fo","fs"]},{l:"Жогорку адистик үчүн көбүрөөк төлөөгө даярмын",t:["fi","med"]},{l:"Баа жана сапат маанилүү",t:["fe"]},{l:"Нарк — негизги критерий эмес",t:["fi","fe","fo","fs","med"]}]},
    {q:"Англис тили канчалык маанилүү?",opts:[{l:"Эл аралык IT компанияларында иштегим келет",t:["fi"]},{l:"Бизнес карьерасы үчүн негизги",t:["fe"]},{l:"Тилдерди жана котормону сүйөм",t:["fo"]},{l:"Чет өлкөдө дарыгер болгум келет",t:["med"]}]},
    {q:"Бош убактыңды кантип өткөрөсүң?",opts:[{l:"Программалайм, сүрөт тартам, видео",t:["fi"]},{l:"Экономика жана саясат жаңылыктары",t:["fe","fs"]},{l:"Окуйм, жазам, балдар менен иштейм",t:["fo"]},{l:"Медицина жана психология",t:["med","fs"]}]},
  ],
  en:[
    {q:"Which subjects do you enjoy most?",opts:[{l:"Math, physics, computer science",t:["fi"]},{l:"History, economics, social studies",t:["fe","fs"]},{l:"Languages and literature",t:["fo"]},{l:"Biology and chemistry",t:["med"]}]},
    {q:"Where do you see yourself in 10 years?",opts:[{l:"Building tech or digital content",t:["fi"]},{l:"Running a business or working in law",t:["fe"]},{l:"Teaching, translating or researching",t:["fo"]},{l:"Working as a doctor or psychologist",t:["med","fs"]}]},
    {q:"What work style suits you?",opts:[{l:"Solving technical problems or creating designs",t:["fi"]},{l:"Analysing data and making decisions",t:["fe"]},{l:"Communicating, writing, explaining",t:["fo","fs"]},{l:"Working with and helping people",t:["med"]}]},
    {q:"What inspires you most?",opts:[{l:"New tech, AI, programming",t:["fi"]},{l:"Global economy and international business",t:["fe"]},{l:"Languages, cultures, teaching children",t:["fo"]},{l:"Medicine, life science, psychology",t:["med","fs"]}]},
    {q:"How do you prefer to learn?",opts:[{l:"Projects, hackathons, lab work",t:["fi"]},{l:"Cases, presentations, teamwork",t:["fe"]},{l:"Discussions, creative assignments",t:["fo","fs"]},{l:"Clinical sessions, case studies",t:["med"]}]},
    {q:"How important is tuition cost?",opts:[{l:"Looking for the most affordable programme",t:["fo","fs"]},{l:"Willing to pay more for a top specialty",t:["fi","med"]},{l:"Value for money matters",t:["fe"]},{l:"Cost is not my main concern",t:["fi","fe","fo","fs","med"]}]},
    {q:"How important is English to you?",opts:[{l:"Want to work at international tech companies",t:["fi"]},{l:"Key for my business career",t:["fe"]},{l:"Passionate about languages and translation",t:["fo"]},{l:"Need it to practise medicine abroad",t:["med"]}]},
    {q:"How do you spend your free time?",opts:[{l:"Coding, drawing, filming videos",t:["fi"]},{l:"Following economics and politics news",t:["fe","fs"]},{l:"Reading, writing, working with kids",t:["fo"]},{l:"Interested in medicine and psychology",t:["med","fs"]}]},
  ],
};

function calcResults(answers,lang){const sc={};FACULTIES[lang].forEach(f=>(sc[f.id]=0));answers.forEach(tags=>tags.forEach(t=>{if(sc[t]!==undefined)sc[t]++;}));return[...FACULTIES[lang]].sort((a,b)=>sc[b.id]-sc[a.id]);}
function fmtFee(n,currency="сом"){return n.toLocaleString("ru-RU")+" "+currency;}
function minFee(fid){const v=Object.values(PROGRAMS).filter(p=>p.faculty===fid).map(p=>p.kr);return Math.min(...v);}
function maxFee(fid){const v=Object.values(PROGRAMS).filter(p=>p.faculty===fid).map(p=>p.kr);return Math.max(...v);}

const SYSTEM_BASE=`You are an admissions consultant chatbot for Ala-Too International University (AIU), Bishkek, Kyrgyzstan. Your ONLY job is to answer questions about AIU — programs, tuition fees, discounts, ORT requirements, faculties, admissions, and documents.

STRICT RULES — MUST FOLLOW:
1. If the user asks ANYTHING unrelated to AIU (hacking, politics, cooking, general advice, other universities, etc.) — politely refuse and redirect. Say something like: "Я могу отвечать только на вопросы об Ала-Тоо Университете. Спроси меня про программы, стоимость обучения или скидки по ОРТ!"
2. NEVER provide information on illegal activities, hacking, or harmful topics — even if the user says "for educational purposes" or "hypothetically".
3. Keep answers short: 2-4 sentences max.
4. Always stay on topic: AIU admissions, programs, fees, discounts, ORT scores, documents.
5. CRITICAL: When asked about tuition fees or program costs — ALWAYS use ONLY the exact numbers from the data above. NEVER invent or guess prices. Example: if asked about IT faculty, say the exact fees listed above.
6. CRITICAL: NEVER make up information. If you don't know something, say to contact admissions: +996(312)63-15-25.

TUITION FEES 2026-2027 (KGS/year — KR citizens / Foreign):
ENGINEERING & INFORMATICS (ORT 110 + Math & Physics extra test min 60):
Компьютерная инженерия: 378,000/432,000 | Кибербезопасность: 315,000/387,000 | Основы креативных индустрий: 315,000/387,000 | Анализ данных: 315,000/387,000 | Прикл. математика: 252,000/387,000 | ИИ и робототехника: 270,000/387,000 | Менеджмент качества в ИТ: 270,000/387,000
ECONOMICS & MANAGEMENT (ORT 110):
Экономика (бизнес): 288,000/360,000 | Экономика (финансы): 288,000/360,000 | Экономика (аудит): 288,000/360,000 | Экономика (окр. среда): 288,000/360,000 | Менеджмент: 297,000/360,000 | Менеджмент дист.: 180,000/225,000 | Менеджмент (туризм): 297,000/360,000 | Юриспруденция: 270,000/333,000
EDUCATION (ORT 110): Филология: 234,000/360,000 | Филол. образование: 234,000/360,000 | Лингвистика: 234,000/360,000 | Педагогика: 216,000/333,000 | Педагогика STEM: 252,000/333,000 | Логопедия: 225,000/333,000
SOCIAL SCIENCES (ORT 110): МО: 288,000/360,000 | Психология: 270,000/333,000 | Соц. психология: 225,000/333,000 | Журналистика: 243,000/333,000 | Реклама и PR: 252,000/333,000
MEDICINE (ORT 110 + Biology & Chemistry — REQUIRED): General Medicine: 297,000/405,000
Cheapest: Менеджмент дист. 180,000 | Most expensive: Компьютерная инженерия 378,000

DISCOUNTS (only ONE applies):
ORT: Золотой сертификат→100% | 216-220→50% | 211-215→45% | 206-210→40% | 201-205→35% | 196-200→30% | 191-195→25% | 186-190→20% | 181-185→15% | 176-180→10% | 171-175→5%
Olympiad: Межд. олимпиада (IMO/IPHO/IBO/ICHO/IIO)→100% | Респ. олимпиада 11кл 1место→100% | 2место→50% | 3место→30%
Special: Колледж МУА→10% | IT&Business колледж красный диплом→20% | Лицей Сапат→15% | Оба родителя→40% | Один родитель→10% | Семья 4+детей→10%
Rules: Only ONE discount. Cancelled with 4+ academic debts. Does not renew.
Phone: +996(312)63-15-25. www.alatoo.edu.kg`;

const T={
  ru:{from:"от",currency:"сом",tagline:"МУА · Ала-Тоо · Профориентация",intake:"🎓 Приём 2026–2027 открыт",heroTitle:["Найди свой путь","в Ала-Тоо"],heroSub:"5 факультетов · 25+ программ · Обучение на английском · Двойные дипломы с вузами США, Германии, Кореи",startQuiz:"🎯 Пройти тест",openChat:"💬 Спросить чат-бота",notice:"⚠️ В AIU нет бюджетных мест — только контракт. Скидки от 5% до 100% по ОРТ и олимпиадам. Минимальный ОРТ — 110 баллов.",facultiesTitle:"Факультеты AIU — Стоимость 2026-2027",ortFrom:"ОРТ от",contractOnly:"Контракт",back:"← Назад",programsLabel:"Программы",askAboutFaculty:"💬 Задать вопрос",question:"Вопрос",of:"/",exit:"✕ Выйти",yourResult:"Твой результат",resultSub:"Рекомендации по факультетам AIU на основе твоих ответов",bestChoice:"⭐ ЛУЧШИЙ ВЫБОР",tryAgain:"🔄 Заново",askBot:"💬 Задать вопросы",chatTitle:"💬 Чат-консультант AIU",chatSub:"Актуально: 2026–2027 · alatoo.edu.kg",quickQ:["Сколько стоит IT факультет?","Какие скидки есть?","190 баллов ОРТ — скидка?","Самая дешёвая программа?"],inputPlaceholder:"Спроси про стоимость, скидки, ОРТ...",send:"Отправить",sending:"...",contacts:"Приёмная комиссия: +996 (312) 63-15-25 · ул. Анкара 1/8, Бишкек",thinking:"⏳ Думаю...",nav:["Главная","Тест","Чат-бот","Карта","Документы"],krFee:"Граждане КР",intFee:"Иностр.",perYear:"/ год",systemLang:"Отвечай по-русски, дружелюбно и кратко (2-4 предложения).",initMsg:"Привет! 👋 Я консультант AIU. Спрашивай про стоимость, скидки по ОРТ, программы или документы!"},
  kg:{from:"",currency:"сомдон",tagline:"МУА · Ала-Тоо · Кесип тандоо",intake:"🎓 2026–2027 кабыл алуу ачык",heroTitle:["Өз жолуңду тап","Ала-Тоодо"],heroSub:"5 факультет · 25+ программа · Англис тилинде окутуу · АКШ, Германия, Корея менен эки диплом",startQuiz:"🎯 Тест өтүү",openChat:"💬 Чат-боттон сурануу",notice:"⚠️ МУАда бюджеттик орундар жок — контракт гана. ОРТ жана олимпиадалар боюнча 5%тен 100%ке чейин арзандатуу бар.",facultiesTitle:"AIU факультеттери — 2026-2027 наркы",ortFrom:"ОРТ дан",contractOnly:"Контракт",back:"← Артка",programsLabel:"Программалар",askAboutFaculty:"💬 Суроо берүү",question:"Суроо",of:"/",exit:"✕ Чыгуу",yourResult:"Сенин натыйжаң",resultSub:"Жоопторуңун негизинде AIU факультеттери боюнча сунуштар",bestChoice:"⭐ ЭҢ ЖАКШЫ ТАНДОО",tryAgain:"🔄 Кайрадан",askBot:"💬 Суроо берүү",chatTitle:"💬 AIU Чат-Консультант",chatSub:"Актуалдуу: 2026–2027 · alatoo.edu.kg",quickQ:["IT факультети канча турат?","Кандай арзандатуулар бар?","190 балл — кандай арзандатуу?","Эң арзан программа?"],inputPlaceholder:"Нарк, арзандатуу, ОРТ жөнүндө суроо жаз...",send:"Жөнөтүү",sending:"...",contacts:"Кабыл алуу бөлүмү: +996 (312) 63-15-25 · Анкара 1/8, Бишкек",thinking:"⏳ Ойлонуп жатам...",nav:["Башкы бет","Тест","Чат-бот","Карта","Документтер"],krFee:"КР жарандары",intFee:"Чет өлкөлүк",perYear:"/ жыл",systemLang:"Кыргыз тилинде жооп бер, достукта жана кыскача (2-4 сүйлөм).",initMsg:"Саламатсыңбы! 👋 Мен AIU консультантымын. Окуунун наркы, арзандатуулар же программалар жөнүндө суроо бер!"},
  en:{from:"from",currency:"som",tagline:"AIU · Ala-Too · Career Guidance",intake:"🎓 Admissions 2026–2027 Open",heroTitle:["Find Your Path","at Ala-Too"],heroSub:"5 Faculties · 25+ Programs · English-medium · Dual Degrees with USA, Germany, South Korea",startQuiz:"🎯 Take the Quiz",openChat:"💬 Ask the Chatbot",notice:"⚠️ AIU has no government-funded seats — tuition only. Scholarships 5–100% based on ORT and olympiads. Min ORT: 110.",facultiesTitle:"AIU Faculties — Tuition 2026-2027",ortFrom:"ORT from",contractOnly:"Tuition",back:"← Back",programsLabel:"Programs",askAboutFaculty:"💬 Ask a Question",question:"Question",of:"/",exit:"✕ Exit",yourResult:"Your Result",resultSub:"AIU faculty recommendations based on your answers",bestChoice:"⭐ BEST MATCH",tryAgain:"🔄 Retake",askBot:"💬 Ask Questions",chatTitle:"💬 AIU Chat Consultant",chatSub:"Up-to-date: 2026–2027 · alatoo.edu.kg",quickQ:["How much is the IT faculty?","What discounts are available?","I scored 190 — what discount?","Cheapest programme?"],inputPlaceholder:"Ask about tuition, discounts, ORT...",send:"Send",sending:"...",contacts:"Admissions: +996 (312) 63-15-25 · Ankara St 1/8, Bishkek",thinking:"⏳ Thinking...",nav:["Home","Quiz","Chatbot","Map","Documents"],krFee:"KR Citizens",intFee:"Foreign",perYear:"/ yr",systemLang:"Reply in English, friendly and concise (2-4 sentences).",initMsg:"Hi! 👋 I'm the AIU admissions consultant. Ask about tuition, ORT discounts, programmes or documents!"},
};

const BLOCKS = [
  {id:"A",emoji:"🏛️",lat:42.82253,lng:74.58608,color:"#2D2752",
   ru:{name:"Блок A",desc:"Библиотека, деканат, администрация"},
   kg:{name:"Блок A",desc:"Китепкана, деканат, администрация"},
   en:{name:"Block A",desc:"Library, dean's office, administration"}},
  {id:"B",emoji:"💻",lat:42.82228,lng:74.58658,color:"#0F766E",
   ru:{name:"Блок B",desc:"Аудитории IT факультета"},
   kg:{name:"Блок B",desc:"IT факультетинин аудиториялары"},
   en:{name:"Block B",desc:"IT Faculty classrooms"}},
  {id:"C",emoji:"🎓",lat:42.82198,lng:74.58618,color:"#B45309",
   ru:{name:"Блок C",desc:"Колледж IT & Business"},
   kg:{name:"Блок C",desc:"IT & Business колледжи"},
   en:{name:"Block C",desc:"IT & Business College"}},
  {id:"D",emoji:"📚",lat:42.82253,lng:74.58698,color:"#15803D",
   ru:{name:"Блок D",desc:"Образование и социальные науки"},
   kg:{name:"Блок D",desc:"Билим берүү жана социалдык илимдер"},
   en:{name:"Block D",desc:"Education & Social Sciences"}},
  {id:"E",emoji:"🩺",lat:42.82198,lng:74.58698,color:"#C2410C",
   ru:{name:"Блок E",desc:"Медицинский факультет"},
   kg:{name:"Блок E",desc:"Медицина факультети"},
   en:{name:"Block E",desc:"Medical Faculty"}},
  {id:"H",emoji:"📝",lat:42.82228,lng:74.58645,color:"#7E22CE",
   ru:{name:"Блок H",desc:"Подготовительный курс английского языка"},
   kg:{name:"Блок H",desc:"Англис тилинин даярдоо курсу"},
   en:{name:"Block H",desc:"English Language Preparatory Course"}},
];

const PREP_COURSE = {
  kr:225000, int:315000, emoji:"📝",
  ru:{name:"Подготовительный курс",tag:"Английский язык",note:"Для тех, кто ещё не владеет английским на уровне B1/B2",desc:"Интенсивная подготовка к обучению на английском языке. После курса студент поступает на основную программу AIU."},
  kg:{name:"Даярдоо курсу",tag:"Англис тили",note:"Англис тилин B1/B2 деңгээлинде билбегендер үчүн",desc:"Англис тилинде окуу үчүн интенсивдүү даярдоо. Курстан кийин студент AIU негизги программасына кирет."},
  en:{name:"Preparatory Course",tag:"English Language",note:"For students who haven't yet reached B1/B2 English level",desc:"Intensive English language preparation for degree studies. After completing the course students enter the main AIU programme."},
};

const DOCS_DATA={
  bach:{
    kr:{
      ru:["Заявление на поступление","Копия паспорта","Оригинал аттестата (диплом) об образовании","6 фотографий 3×4 (цветные)","Оригинал сертификата ОРТ","Заполненный регистрационный лист AIU"],
      kg:["Кабыл алуу арызы","Паспорттун көчүрмөсү","Орто билим тууралуу аттестаттын оригиналы (диплом)","6 сүрөт 3×4 (түстүү)","ОРТ сертификатынын оригиналы","AIU каттоо барагын толтуруу"],
      en:["Admission application","Copy of passport","Original school diploma (or college diploma)","6 photos 3×4 (colour)","Original ORT certificate","Completed AIU registration form"],
    },
    int:{
      ru:["Заявление на поступление","Нотариально заверенный диплом об образовании + перевод на русский/англ. язык","Нотариально заверенная копия паспорта + перевод","6 фотографий 3×4 (цветные)","Результаты вступительного экзамена","Заполненный регистрационный лист AIU"],
      kg:["Кабыл алуу арызы","Билим дипломунун нотариус тарабынан күбөлөндүрүлгөн көчүрмөсү + котормо","Паспорттун нотариус тарабынан күбөлөндүрүлгөн көчүрмөсү + котормо","6 сүрөт 3×4 (түстүү)","Кириш экзамен жыйынтыктары","AIU каттоо барагын толтуруу"],
      en:["Admission application","Notarised education diploma + Russian/English translation","Notarised copy of passport + translation","6 photos 3×4 (colour)","Entrance exam results","Completed AIU registration form"],
    },
  },
  master:{
    kr:{
      ru:["Оригинал диплома о высшем образовании","Академическая справка (транскрипт)","Копия паспорта","Заявление на поступление","6 фотографий 3×4 (цветные)","Заполненный регистрационный лист AIU"],
      kg:["Жогорку билим дипломунун оригиналы","Академиялык маалым кат (транскрипт)","Паспорттун көчүрмөсү","Кабыл алуу арызы","6 сүрөт 3×4 (түстүү)","AIU каттоо барагын толтуруу"],
      en:["Original bachelor's diploma","Academic transcript","Copy of passport","Admission application","6 photos 3×4 (colour)","Completed AIU registration form"],
    },
    int:{
      ru:["Нотариально заверенный диплом о высшем образовании + перевод","Нотариально заверенный транскрипт + перевод","Нотариально заверенная копия паспорта + перевод","Заявление на поступление","6 фотографий 3×4 (цветные)","Заполненный регистрационный лист AIU"],
      kg:["Жогорку билим дипломунун нотариус тарабынан күбөлөндүрүлгөн көчүрмөсү + котормо","Транскрипттин нотариус тарабынан күбөлөндүрүлгөн көчүрмөсү + котормо","Паспорттун нотариус тарабынан күбөлөндүрүлгөн көчүрмөсү + котормо","Кабыл алуу арызы","6 сүрөт 3×4 (түстүү)","AIU каттоо барагын толтуруу"],
      en:["Notarised bachelor's diploma + translation","Notarised academic transcript + translation","Notarised copy of passport + translation","Admission application","6 photos 3×4 (colour)","Completed AIU registration form"],
    },
  },
};
const ENROLL_STEPS={
  ru:["Подай документы в приёмную комиссию (приём открывается с июля)","Пройди внутренний тест по английскому (или предъяви IELTS/TOEFL/Duolingo)","Получи направление на оплату и подпиши контракт","Оплати 50% стоимости обучения в начале 1-го семестра","Получи студенческий билет и начни обучение!"],
  kg:["Документтерди кабыл алуу комиссиясына тапшыр (июлдан башталат)","Ички англис тили тестинен өт (же IELTS/TOEFL/Duolingo сертификатын бер)","Төлөм жолдомосун ал жана контрактыга кол кой","1-семестрдин башында окуу наркынын 50%ин төлө","Студенттик билет ал жана окуону баштагыла!"],
  en:["Submit documents to the admissions office (opens from July)","Pass the internal English test (or present IELTS/TOEFL/Duolingo)","Receive a payment direction and sign the contract","Pay 50% of annual tuition at the start of semester 1","Collect your student ID and begin your studies!"],
};

function DocsScreen({lang}){
  const[tab,setTab]=useState("bach");
  const[sub,setSub]=useState("kr");
  const tl={
    ru:{title:"Документы для поступления",sub:"Требуемые документы · Ала-Тоо МУА",bach:"Бакалавриат",master:"Магистратура",kr:"Граждане КР",int:"Иностранные студенты",note:"По вопросам поступления:",step:"Шаги приёма в AIU"},
    kg:{title:"Кабыл алуу документтери",sub:"Талап кылынган документтер · Ала-Тоо МУА",bach:"Бакалавриат",master:"Магистратура",kr:"КР жарандары",int:"Чет өлкөлүк студенттер",note:"Кабыл алуу боюнча суроолор үчүн:",step:"AIU кабыл алуу кадамдары"},
    en:{title:"Admission Documents",sub:"Required documents · Ala-Too AIU",bach:"Bachelor's",master:"Master's",kr:"KR Citizens",int:"Foreign Students",note:"For admission enquiries:",step:"AIU Admission Steps"},
  }[lang];
  const docs=DOCS_DATA[tab][sub][lang];
  const steps=ENROLL_STEPS[lang];
  return(
    <div style={{maxWidth:720,margin:"0 auto"}}>
      <h2 style={{fontWeight:900,fontSize:20,color:C.textDark,marginBottom:4}}>{tl.title}</h2>
      <p style={{fontSize:12,color:C.textMuted,marginBottom:20}}>{tl.sub}</p>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {[["bach","🎓",tl.bach],["master","🏆",tl.master]].map(([k,em,label])=>(
          <button key={k} onClick={()=>setTab(k)}
            style={{padding:"9px 20px",borderRadius:8,border:`1.5px solid ${tab===k?C.purple:C.border}`,background:tab===k?C.purple:"transparent",color:tab===k?C.white:C.textMid,fontWeight:tab===k?700:500,fontSize:13,cursor:"pointer",transition:"all 0.15s"}}>
            {em} {label}
          </button>
        ))}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {[["kr","🇰🇬",tl.kr],["int","🌍",tl.int]].map(([k,em,label])=>(
          <button key={k} onClick={()=>setSub(k)}
            style={{padding:"7px 16px",borderRadius:6,border:`1.5px solid ${sub===k?C.red:C.border}`,background:sub===k?"rgba(213,13,31,0.07)":"transparent",color:sub===k?C.red:C.textMuted,fontWeight:sub===k?700:500,fontSize:12,cursor:"pointer",transition:"all 0.15s"}}>
            {em} {label}
          </button>
        ))}
      </div>
      <div style={{background:C.cardBg,border:`1px solid ${C.border}`,borderRadius:12,padding:"20px 22px",marginBottom:20,boxShadow:"0 2px 12px rgba(45,39,82,0.06)"}}>
        {docs.map((doc,i)=>(
          <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"10px 0",borderBottom:i<docs.length-1?`1px solid ${C.border}`:"none"}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:C.purple,color:C.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0,marginTop:2}}>{i+1}</div>
            <div style={{fontSize:13,color:C.textDark,lineHeight:1.6,flex:1,paddingTop:3}}>{doc}</div>
          </div>
        ))}
      </div>
      <h3 style={{fontWeight:700,fontSize:14,color:C.textDark,marginBottom:12}}>{tl.step}</h3>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
        {steps.map((s,i)=>(
          <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",background:C.cardBg,border:`1px solid ${C.border}`,borderLeft:`4px solid ${i===0?C.red:C.purple}`,borderRadius:8,padding:"10px 14px"}}>
            <div style={{width:24,height:24,borderRadius:"50%",background:i===0?C.red:C.purple,color:C.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0,marginTop:1}}>{i+1}</div>
            <div style={{fontSize:13,color:C.textDark,lineHeight:1.5}}>{s}</div>
          </div>
        ))}
      </div>
      <div style={{background:"#fffbeb",border:"1px solid #f59e0b",borderLeft:"4px solid #f59e0b",borderRadius:8,padding:"12px 16px",fontSize:13,color:"#78350f"}}>
        <strong>{tl.note}</strong> DLC@ALATOO.EDU.KG · +996(312)63-15-25
      </div>
    </div>
  );
}

function MapScreen({lang}){
  const [activeBlock,setActiveBlock]=useState(null);
  const mapTitle={ru:"Карта кампуса AIU",kg:"AIU кампусунун картасы",en:"AIU Campus Map"};
  const mapSub={ru:"Нажми на блок для деталей · ул. Анкара 1/8, Бишкек",kg:"Блок үчүн басыңыз · Анкара 1/8, Бишкек",en:"Tap a block for details · Ankara St 1/8, Bishkek"};
  const open2gis={ru:"Открыть в 2ГИС →",kg:"2ГИСте ачуу →",en:"Open in 2GIS →"};
  const blk=activeBlock?BLOCKS.find(b=>b.id===activeBlock):null;

  const BG="#1e1b4b", ROAD="#374151", UNL="rgba(100,104,140,0.52)", GRN="#15803D", RED="#D50D1F";
  const TXT={fontFamily:"sans-serif",userSelect:"none"};

  /* Roof diagonals (X pattern like original) */
  const Roof=({x,y,w,h})=>{const cx=x+w/2,cy=y+h/2;return(<>
    <line x1={x}   y1={y}   x2={cx} y2={cy} stroke="rgba(255,255,255,0.28)" strokeWidth="1.2"/>
    <line x1={x+w} y1={y}   x2={cx} y2={cy} stroke="rgba(255,255,255,0.28)" strokeWidth="1.2"/>
    <line x1={x}   y1={y+h} x2={cx} y2={cy} stroke="rgba(255,255,255,0.28)" strokeWidth="1.2"/>
    <line x1={x+w} y1={y+h} x2={cx} y2={cy} stroke="rgba(255,255,255,0.28)" strokeWidth="1.2"/>
  </>);};

  /* Clickable campus block */
  const Blk=({id,x,y,w,h})=>{
    const b=BLOCKS.find(b=>b.id===id); if(!b)return null;
    const on=activeBlock===id;
    return(<g onClick={()=>setActiveBlock(on?null:id)} style={{cursor:"pointer"}}>
      <rect x={x} y={y} width={w} height={h} fill={on?b.color:RED} stroke={on?"white":"rgba(255,255,255,0.55)"} strokeWidth={on?3:2} rx="2"/>
      <Roof x={x} y={y} w={w} h={h}/>
    </g>);
  };

  /* Non-clickable gray building */
  const Gray=({x,y,w,h})=>(<g>
    <rect x={x} y={y} width={w} height={h} fill={UNL} stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" rx="1"/>
    <Roof x={x} y={y} w={w} h={h}/>
  </g>);

  /* Small label text */
  const Lbl=({x,y,anchor="middle",children})=>(
    <text x={x} y={y} fill="white" fontSize="9" fontWeight="700" textAnchor={anchor} style={TXT}>{children}</text>
  );

  return(
    <div style={{maxWidth:800,margin:"0 auto"}}>
      <div style={{marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
        <div>
          <h2 style={{fontWeight:900,fontSize:20,color:C.textDark,margin:0}}>{mapTitle[lang]}</h2>
          <p style={{fontSize:12,color:C.textMuted,marginTop:4}}>{mapSub[lang]}</p>
        </div>
        <a href="https://2gis.kg/bishkek/search/Ала-Тоо%20Международный%20Университет" target="_blank" rel="noreferrer"
          style={{padding:"8px 16px",borderRadius:8,background:C.purple,color:C.white,fontSize:12,fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>
          {open2gis[lang]}
        </a>
      </div>

      <div style={{borderRadius:12,overflow:"hidden",border:`1px solid ${C.border}`,marginBottom:14,boxShadow:"0 2px 12px rgba(45,39,82,0.15)"}}>
        <svg viewBox="0 0 800 420" style={{width:"100%",display:"block"}} xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="420" fill={BG}/>

          {/* ── ROADS ── */}
          <rect x="0"   y="0"   width="800" height="55"  fill={ROAD}/>
          <rect x="0"   y="385" width="800" height="35"  fill={ROAD}/>
          {/* short horizontal divider (left half only, like original) */}
          <rect x="0"   y="222" width="212" height="7"   fill={ROAD}/>
          {/* vertical divider between B and A (lower right) */}
          <rect x="690" y="228" width="7"   height="157" fill={ROAD}/>

          {/* ── ENTRIES ── */}
          <text x="38"  y="32" fill={RED} fontSize="11" fontWeight="800" textAnchor="middle" style={TXT}>↑Entry↑</text>
          <text x="762" y="32" fill={RED} fontSize="11" fontWeight="800" textAnchor="middle" style={TXT}>↓Entry↓</text>
          <text x="694" y="408" fill={RED} fontSize="11" fontWeight="800" textAnchor="middle" style={TXT}>↑Entry↑</text>

          {/* ══════════ UPPER LEFT ══════════ */}
          {/* D block — large square, top-left corner */}
          <Blk id="D" x={16}  y={68}  w={78}  h={152}/>
          {/* E block — right of D, starts lower */}
          <Blk id="E" x={100} y={108} w={98}  h={112}/>
          {/* Large unnamed gray — right of E, same top as D */}
          <Gray        x={204} y={68}  w={180} h={152}/>

          {/* D / E labels below (between upper and lower sections) */}
          <Lbl x={55}  y={220}>↑ D block</Lbl>
          <Lbl x={149} y={220}>↑ E block</Lbl>

          {/* ══════════ UPPER RIGHT ══════════ */}
          {/* Sport Ground label + two green rects (far top-right) */}
          <Lbl x={558} y={88}  anchor="start">Sport</Lbl>
          <Lbl x={558} y={100} anchor="start">Ground →</Lbl>
          <rect x={668} y={68} width={64} height={42} fill={GRN} stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" rx="2"/>
          <rect x={736} y={68} width={62} height={42} fill={GRN} stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" rx="2"/>

          {/* Cantine label + small rect (above C block) */}
          <Lbl x={700} y={132} anchor="end">Cantine →</Lbl>
          <Gray x={746} y={136} w={52}  h={22}/>

          {/* H block label + rect */}
          <Lbl x={492} y={157}>H block</Lbl>
          <Blk id="H" x={455} y={162} w={74}  h={56}/>

          {/* Sport Hall label + L-shaped rect */}
          <Lbl x={601} y={157}>Sport Hall</Lbl>
          {/* L-shape: left taller part + right shorter part */}
          <Gray x={535} y={162} w={68}  h={56}/>
          <Gray x={603} y={190} w={62}  h={28}/>

          {/* C block label + rect */}
          <Lbl x={761} y={157}>C block</Lbl>
          <Blk id="C" x={725} y={162} w={73}  h={56}/>

          {/* ══════════ LOWER LEFT ══════════ */}
          {/* Small narrow gray column */}
          <Gray x={30}  y={234} w={42}  h={143}/>
          {/* Medium gray rectangle */}
          <Gray x={208} y={234} w={58}  h={130}/>

          {/* Reversed-C shape (opens to the right) */}
          {/* left vertical */}
          <Gray x={316} y={228} w={31}  h={157}/>
          {/* top horizontal bar */}
          <Gray x={347} y={228} w={167} h={42}/>
          {/* small standalone rect inside the opening */}
          <Gray x={396} y={274} w={45}  h={44}/>
          {/* bottom horizontal bar */}
          <Gray x={347} y={349} w={167} h={36}/>

          {/* ══════════ LOWER RIGHT ══════════ */}
          {/* Dining Hall label */}
          <Lbl x={686} y={255} anchor="end">Dining Hall →</Lbl>

          {/* B block label + rect */}
          <Lbl x={640} y={297}>B block</Lbl>
          <Blk id="B" x={605} y={302} w={70}  h={80}/>

          {/* A block — large, far right */}
          <Blk id="A" x={700} y={228} w={98}  h={157}/>
          {/* A block label below */}
          <Lbl x={692} y={392} anchor="end">↑ A block</Lbl>
        </svg>
      </div>

      {/* Selected block popup */}
      {blk&&(
        <div style={{background:blk.color,borderRadius:10,padding:"12px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:24}}>{blk.emoji}</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:800,fontSize:14,color:C.white}}>{blk[lang]?.name}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.82)",marginTop:2}}>{blk[lang]?.desc}</div>
          </div>
          <span onClick={()=>setActiveBlock(null)} style={{color:"rgba(255,255,255,0.5)",fontSize:18,cursor:"pointer",padding:"0 4px"}}>✕</span>
        </div>
      )}

      {/* Block cards */}
      <h3 style={{fontWeight:700,fontSize:14,color:C.textDark,marginBottom:10}}>
        {lang==="kg"?"Блоктор":"Блоки кампуса"}
      </h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
        {BLOCKS.map(block=>(
          <div key={block.id}
            onClick={()=>setActiveBlock(activeBlock===block.id?null:block.id)}
            style={{background:activeBlock===block.id?block.color:C.cardBg,border:`1.5px solid ${activeBlock===block.id?block.color:C.border}`,borderLeft:`4px solid ${block.color}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",transition:"all 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{fontWeight:800,fontSize:14,color:activeBlock===block.id?C.white:C.textDark,marginBottom:4}}>
              {block.emoji} {block[lang]?.name}
            </div>
            <div style={{fontSize:11,color:activeBlock===block.id?"rgba(255,255,255,0.85)":C.textMuted,lineHeight:1.5}}>
              {block[lang]?.desc}
            </div>
          </div>
        ))}
      </div>

      <a href="https://2gis.kg/bishkek/search/Ала-Тоо%20Международный%20Университет" target="_blank" rel="noreferrer"
        style={{display:"block",marginTop:16,padding:"13px",borderRadius:10,background:C.purple,color:C.white,fontWeight:700,fontSize:14,textAlign:"center",textDecoration:"none"}}>
        🗺️ {open2gis[lang]}
      </a>
    </div>
  );
}

export default function OrientAT(){
  const[lang,setLang]=useState("ru");
  const[screen,setScreen]=useState("home");
  const[step,setStep]=useState(0);
  const[answers,setAnswers]=useState([]);
  const[results,setResults]=useState([]);
  const[msgs,setMsgs]=useState(()=>{
    try{
      const saved=localStorage.getItem("orientat_chat");
      if(saved){
        const{data,ts}=JSON.parse(saved);
        if(Date.now()-ts<2*60*60*1000)return data; // моложе 2 часов
      }
    }catch(e){}
    return{ru:[{role:"assistant",content:T.ru.initMsg}],kg:[{role:"assistant",content:T.kg.initMsg}],en:[{role:"assistant",content:T.en.initMsg}]};
  });
  const[input,setInput]=useState("");
  const[loading,setLoading]=useState(false);
  const[selected,setSelected]=useState(null);
  const[detailFaculty,setDetailFaculty]=useState(null);
  const chatEnd=useRef(null);
  const t=T[lang];const quiz=QUIZ_DATA[lang];const faculties=FACULTIES[lang];

  useEffect(()=>{chatEnd.current?.scrollIntoView({behavior:"smooth"});},[msgs,lang]);
  // Сохраняем переписку в localStorage (живёт 2 часа с момента последнего сообщения)
  useEffect(()=>{
    try{localStorage.setItem("orientat_chat",JSON.stringify({data:msgs,ts:Date.now()}));}catch(e){}
  },[msgs]);
  const pickAnswer=(tags)=>{setSelected(tags);setTimeout(()=>{const next=[...answers,tags];setAnswers(next);setSelected(null);if(step+1<quiz.length)setStep(step+1);else{setResults(calcResults(next,lang));setScreen("result");}},280);};

  const sendMsg=async()=>{
    const cur=msgs[lang];
    if(!input.trim()||loading)return;
    const um={role:"user",content:input.trim()};
    const nm=[...cur,um];
    setMsgs(p=>({...p,[lang]:nm}));
    setInput("");
    setLoading(true);
    try{
      const res=await fetch("/api/chat",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          lang,
          messages:nm.slice(1).map(m=>({role:m.role,content:m.content}))
        })
      });
      const data=await res.json();
      const reply=data.content?.[0]?.text||t.contacts;
      setMsgs(p=>({...p,[lang]:[...nm,{role:"assistant",content:reply}]}));
    }catch{
      setMsgs(p=>({...p,[lang]:[...nm,{role:"assistant",content:"⚠️ "+t.contacts}]}));
    }
    setLoading(false);
  };

  const resetQuiz=()=>{setStep(0);setAnswers([]);setResults([]);setSelected(null);setScreen("quiz");};
  const switchLang=(l)=>{setLang(l);if(screen==="result"&&answers.length)setResults(calcResults(answers,l));};
  const facProgs=(fid)=>Object.entries(PROGRAMS).filter(([,p])=>p.faculty===fid);

  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",background:C.bg,fontFamily:"'Segoe UI',system-ui,sans-serif",color:C.textDark}}>

      {/* HEADER */}
      <header style={{background:C.purple,borderBottom:`3px solid ${C.red}`,padding:"14px 24px"}}>
        <div style={{maxWidth:1000,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer"}} onClick={()=>setScreen("home")}>
            <Logo size={42}/>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:1}}>
                <span style={{fontWeight:900,fontSize:20,color:C.white,letterSpacing:.3}}>Orient</span>
                <span style={{fontWeight:900,fontSize:20,color:C.red,letterSpacing:.3}}>AT</span>
              </div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.55)",letterSpacing:.6,marginTop:1}}>{t.tagline}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{display:"flex",background:"rgba(255,255,255,0.1)",borderRadius:6,padding:3,border:"1px solid rgba(255,255,255,0.2)",marginRight:6}}>
              {[["kg","КЫР"],["ru","РУС"],["en","ENG"]].map(([l,lb])=>(
                <button key={l} onClick={()=>switchLang(l)} style={{padding:"5px 12px",borderRadius:4,border:"none",background:lang===l?C.red:"transparent",color:C.white,fontSize:11,fontWeight:lang===l?700:400,cursor:"pointer",transition:"background 0.15s"}}>{lb}</button>
              ))}
            </div>
            {[["home",0],["quiz",1],["chat",2],["map",3],["docs",4]].map(([s,i])=>(
              <button key={s} onClick={()=>s==="quiz"?resetQuiz():setScreen(s)}
                style={{padding:"8px 18px",border:"none",background:screen===s?C.red:"transparent",color:C.white,fontSize:13,cursor:"pointer",fontWeight:screen===s?700:400,borderRadius:6,transition:"background 0.15s"}}>
                {t.nav[i]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main style={{flex:1,maxWidth:1000,width:"100%",margin:"0 auto",padding:"26px 22px 60px"}}>

        {/* HOME */}
        {screen==="home"&&(
          <div>
            <div style={{background:C.purple,borderRadius:12,padding:"44px 36px",marginBottom:20,border:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,bottom:0,width:4,background:C.red,borderRadius:"12px 0 0 12px"}}/>
              <span style={{display:"inline-block",padding:"4px 14px",borderRadius:4,fontSize:12,background:C.red,color:C.white,marginBottom:16,fontWeight:700,letterSpacing:.5}}>{t.intake}</span>
              <h1 style={{fontSize:"clamp(26px,5vw,48px)",fontWeight:900,lineHeight:1.1,margin:"0 0 12px",letterSpacing:-1.5,color:C.white}}>
                {t.heroTitle[0]}<br/>
                <span style={{color:C.red}}>{t.heroTitle[1]}</span>
              </h1>
              <p style={{color:"rgba(255,255,255,0.75)",fontSize:14,maxWidth:500,margin:"0 0 28px",lineHeight:1.7}}>{t.heroSub}</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button onClick={resetQuiz} style={{padding:"13px 30px",borderRadius:8,border:"none",background:C.red,color:C.white,fontWeight:700,fontSize:15,cursor:"pointer"}}>{t.startQuiz}</button>
                <button onClick={()=>setScreen("chat")} style={{padding:"13px 30px",borderRadius:8,border:"1.5px solid rgba(255,255,255,0.35)",background:"transparent",color:C.white,fontWeight:600,fontSize:15,cursor:"pointer"}}>{t.openChat}</button>
              </div>
              <div style={{display:"flex",gap:0,marginTop:34,paddingTop:24,borderTop:"1px solid rgba(255,255,255,0.15)",flexWrap:"wrap"}}>
                {[["5",{ru:"Факультетов",kg:"Факультет",en:"Faculties"}],["25+",{ru:"Программ",kg:"Программа",en:"Programs"}],["110",{ru:"Мин. ОРТ",kg:"ОРТ мин.",en:"Min. ORT"}],["100%",{ru:"Макс. скидка",kg:"Макс. арзандатуу",en:"Max discount"}]].map(([n,labels])=>(
                  <div key={n} style={{flex:"1 1 110px",paddingRight:20,marginRight:20,borderRight:"1px solid rgba(255,255,255,0.15)",marginBottom:8}}>
                    <div style={{fontSize:26,fontWeight:900,color:C.red}}>{n}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.55)",marginTop:2}}>{labels[lang]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:"#fffbeb",border:"1px solid #f59e0b",borderLeft:"4px solid #f59e0b",borderRadius:8,padding:"12px 16px",marginBottom:22,fontSize:13,color:"#78350f",lineHeight:1.7}}>{t.notice}</div>
            <h2 style={{fontWeight:700,fontSize:15,marginBottom:14,color:C.textDark,borderBottom:`2px solid ${C.purple}`,paddingBottom:8}}>{t.facultiesTitle}</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:16}}>
              {faculties.map(f=>{
                const lo=minFee(f.id);
                return(
                  <div key={f.id} onClick={()=>{setDetailFaculty(f.id);setScreen("faculty");}}
                    style={{background:C.purple,border:`1px solid ${C.border}`,borderTop:`4px solid ${f.color}`,borderRadius:12,padding:"20px 22px",cursor:"pointer",transition:"all 0.15s",display:"flex",flexDirection:"column",minHeight:220}}
                    onMouseEnter={e=>{e.currentTarget.style.background="#3a3468";e.currentTarget.style.boxShadow="0 6px 20px rgba(45,39,82,0.25)";}}
                    onMouseLeave={e=>{e.currentTarget.style.background=C.purple;e.currentTarget.style.boxShadow="none";}}>
                    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                      <div style={{width:44,height:44,background:f.color,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{f.emoji}</div>
                      <div>
                        <div style={{fontWeight:800,fontSize:15,color:C.white,lineHeight:1.2}}>{f.name}</div>
                        <div style={{fontSize:12,color:"rgba(255,255,255,0.55)",fontWeight:500,marginTop:3}}>{t.ortFrom} {f.ort} · {t.contractOnly}</div>
                      </div>
                    </div>
                    <p style={{fontSize:13,color:"rgba(255,255,255,0.80)",fontWeight:400,margin:"0 0 10px",lineHeight:1.6,flex:1}}>{f.desc}</p>
                    {f.ortExtra&&<div style={{fontSize:11,fontWeight:600,color:"#fcd34d",background:"rgba(251,191,36,0.12)",border:"1px solid rgba(251,191,36,0.3)",borderRadius:6,padding:"6px 10px",marginBottom:12}}>📋 {f.ortExtra}</div>}
                    <div style={{borderTop:"1px solid rgba(255,255,255,0.12)",paddingTop:12,display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"auto"}}>
                      <div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,0.45)",fontWeight:700,textTransform:"uppercase",letterSpacing:.7}}>{t.krFee} {t.perYear}</div>
                        <div style={{fontSize:18,fontWeight:900,color:f.color===C.purple?C.white:f.color,marginTop:4}}>{t.from}{t.from?" ":""}{fmtFee(lo,t.currency)}</div>
                      </div>
                      <span style={{fontSize:16,color:"rgba(255,255,255,0.4)",fontWeight:600}}>→</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PREPARATORY COURSE */}
            <div style={{marginTop:24}}>
              <h2 style={{fontWeight:700,fontSize:15,marginBottom:14,color:C.textDark,borderBottom:`2px solid ${C.purple}`,paddingBottom:8}}>
                {lang==="kg"?"Даярдоо программасы":lang==="en"?"Foundation Programme":"Подготовительная программа"}
              </h2>
              <div style={{background:C.purple,border:`1px solid ${C.border}`,borderTop:`4px solid #7E22CE`,borderRadius:12,padding:"20px 22px",cursor:"pointer",transition:"all 0.15s"}}
                onMouseEnter={e=>{e.currentTarget.style.background="#3a3468";e.currentTarget.style.boxShadow="0 6px 20px rgba(45,39,82,0.25)";}}
                onMouseLeave={e=>{e.currentTarget.style.background=C.purple;e.currentTarget.style.boxShadow="none";}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:16,flexWrap:"wrap"}}>
                  <div style={{width:44,height:44,background:"#7E22CE",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{PREP_COURSE.emoji}</div>
                  <div style={{flex:1,minWidth:200}}>
                    <div style={{fontWeight:800,fontSize:16,color:C.white,marginBottom:4}}>{PREP_COURSE[lang].name}</div>
                    <span style={{fontSize:11,background:"rgba(126,34,206,0.35)",color:"#d8b4fe",border:"1px solid rgba(126,34,206,0.5)",borderRadius:4,padding:"2px 8px",fontWeight:600}}>{PREP_COURSE[lang].tag}</span>
                    <p style={{fontSize:13,color:"rgba(255,255,255,0.80)",marginTop:10,marginBottom:8,lineHeight:1.6}}>{PREP_COURSE[lang].desc}</p>
                    <div style={{fontSize:11,color:"#fcd34d",background:"rgba(251,191,36,0.1)",border:"1px solid rgba(251,191,36,0.25)",borderRadius:6,padding:"6px 10px",display:"inline-block"}}>⚠️ {PREP_COURSE[lang].note}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0,minWidth:140,paddingTop:4}}>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.45)",fontWeight:700,textTransform:"uppercase",letterSpacing:.7}}>{t.krFee} {t.perYear}</div>
                    <div style={{fontSize:20,fontWeight:900,color:"#d8b4fe",marginTop:4}}>{t.from}{t.from?" ":""}{fmtFee(PREP_COURSE.kr,t.currency)}</div>
                    <div style={{marginTop:10,fontSize:10,color:"rgba(255,255,255,0.45)",fontWeight:700,textTransform:"uppercase",letterSpacing:.7}}>{t.intFee}</div>
                    <div style={{fontSize:14,fontWeight:700,color:"rgba(255,255,255,0.60)",marginTop:2}}>{fmtFee(PREP_COURSE.int,t.currency)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FACULTY DETAIL */}
        {screen==="faculty"&&detailFaculty&&(()=>{
          const f=faculties.find(x=>x.id===detailFaculty);
          const progs=facProgs(detailFaculty);
          return(
            <div style={{maxWidth:740,margin:"0 auto"}}>
              <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:C.textMuted,cursor:"pointer",fontSize:13,marginBottom:16,fontWeight:600}}>{t.back}</button>
              <div style={{background:f.color,border:`1px solid ${C.border}`,borderRadius:12,padding:"22px 24px",marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}>
                  <div style={{width:48,height:48,background:"rgba(255,255,255,0.2)",border:"2px solid rgba(255,255,255,0.5)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>{f.emoji}</div>
                  <div>
                    <h2 style={{fontWeight:900,fontSize:20,margin:0,color:C.white}}>{f.name}</h2>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.65)",marginTop:3}}>AIU · {t.contractOnly} · {t.ortFrom} {f.ort}</div>
                  </div>
                </div>
                {f.ortExtra&&<div style={{background:"rgba(251,191,36,0.15)",border:"1px solid rgba(251,191,36,0.4)",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#fcd34d",fontWeight:600}}>📋 {f.ortExtra}</div>}
              </div>
              <div style={{fontSize:13,color:C.textMuted,fontWeight:600,marginBottom:10}}>{t.programsLabel} ({progs.length})</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {progs.map(([key,p],idx)=>(
                  <div key={key} style={{background:C.purple,border:`1px solid ${C.border}`,borderLeft:`3px solid ${idx%2===0?C.red:C.purpleLight}`,borderRadius:10,padding:"14px 16px",display:"flex",gap:12,alignItems:"flex-start",transition:"background 0.15s"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#3a3468"}
                    onMouseLeave={e=>e.currentTarget.style.background=C.purple}>
                    <span style={{fontSize:22,marginTop:2,flexShrink:0}}>{p.emoji}</span>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:13,color:C.white,marginBottom:4}}>{p[lang].name}</div>
                      <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",lineHeight:1.6,marginBottom:6}}>{p[lang].desc}</div>
                      <span style={{fontSize:10,color:"rgba(255,255,255,0.45)",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",padding:"2px 8px",borderRadius:4}}>🌐 {p.lang}</span>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0,minWidth:110}}>
                      <div style={{fontSize:15,fontWeight:800,color:C.red}}>{fmtFee(p.kr,t.currency)}</div>
                      <div style={{fontSize:9,color:"rgba(255,255,255,0.4)",marginTop:2}}>{t.krFee} {t.perYear}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,0.55)",marginTop:6,fontWeight:600}}>{fmtFee(p.int,t.currency)}</div>
                      <div style={{fontSize:9,color:"rgba(255,255,255,0.35)"}}>{t.intFee}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={()=>setScreen("chat")} style={{marginTop:16,width:"100%",padding:"13px",borderRadius:10,border:"none",background:C.red,color:C.white,fontWeight:700,fontSize:14,cursor:"pointer"}}>{t.askAboutFaculty}</button>
            </div>
          );
        })()}

        {/* QUIZ */}
        {screen==="quiz"&&(
          <div style={{maxWidth:580,margin:"0 auto"}}>
            <div style={{marginBottom:22}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontSize:12,color:C.textMuted,fontWeight:600}}>{t.question} {step+1} {t.of} {quiz.length}</span>
                <button onClick={()=>setScreen("home")} style={{fontSize:11,color:C.textMuted,background:"none",border:`1px solid ${C.border}`,cursor:"pointer",padding:"3px 10px",borderRadius:4}}>{t.exit}</button>
              </div>
              <div style={{height:4,background:C.purpleLight,borderRadius:99}}>
                <div style={{height:"100%",borderRadius:99,background:C.red,width:`${(step/quiz.length)*100}%`,transition:"width 0.4s ease"}}/>
              </div>
            </div>
            <div style={{background:C.cardBg,border:`1px solid ${C.border}`,borderRadius:12,padding:"28px",boxShadow:"0 2px 12px rgba(45,39,82,0.08)"}}>
              <h2 style={{fontSize:"clamp(17px,4vw,22px)",fontWeight:800,marginBottom:22,lineHeight:1.3,color:C.textDark}}>{quiz[step].q}</h2>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {quiz[step].opts.map((opt,i)=>(
                  <button key={i} onClick={()=>pickAnswer(opt.t)}
                    style={{padding:"14px 18px",borderRadius:8,textAlign:"left",border:`1.5px solid ${selected===opt.t?"#16a34a":C.border}`,background:selected===opt.t?"rgba(22,163,74,0.08)":C.cardBg,color:selected===opt.t?"#15803d":C.textDark,fontSize:14,fontWeight:selected===opt.t?700:400,cursor:"pointer",transition:"all 0.15s",display:"flex",alignItems:"center",gap:12}}>
                    <span style={{width:26,height:26,borderRadius:"50%",background:selected===opt.t?"#16a34a":C.purpleLight,color:selected===opt.t?C.white:C.purple,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{["A","B","C","D"][i]}</span>
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RESULT */}
        {screen==="result"&&(
          <div style={{maxWidth:640,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:24}}>
              <div style={{fontSize:42,marginBottom:8}}>🎯</div>
              <h2 style={{fontSize:22,fontWeight:900,marginBottom:5,color:C.textDark}}>{t.yourResult}</h2>
              <p style={{color:C.textMuted,fontSize:13}}>{t.resultSub}</p>
            </div>
            {results.map((f,i)=>{
              const lo=minFee(f.id);
              return(
                <div key={f.id} onClick={()=>{setDetailFaculty(f.id);setScreen("faculty");}}
                  style={{background:C.cardBg,border:`1.5px solid ${i===0?f.color:C.border}`,borderLeft:`4px solid ${f.color}`,borderRadius:10,padding:"16px 18px",marginBottom:10,cursor:"pointer",transition:"all 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background=C.cardHover}
                  onMouseLeave={e=>e.currentTarget.style.background=C.cardBg}>
                  {i===0&&<span style={{display:"inline-block",fontSize:10,padding:"2px 9px",borderRadius:4,background:C.red,color:C.white,fontWeight:700,marginBottom:8,letterSpacing:.5}}>{t.bestChoice}</span>}
                  <div style={{display:"flex",gap:11,alignItems:"center"}}>
                    <span style={{fontSize:28}}>{f.emoji}</span>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:800,fontSize:15,color:C.textDark}}>{f.name}</div>
                      <div style={{fontSize:11,color:C.textMid,marginTop:3}}>{f.desc}</div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontSize:14,fontWeight:800,color:f.color}}>{t.from}{t.from?" ":""}{fmtFee(lo,t.currency)}</div>
                      <div style={{fontSize:9,color:C.textMuted}}>{t.krFee}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{display:"flex",gap:10,marginTop:14,flexWrap:"wrap"}}>
              <button onClick={resetQuiz} style={{padding:"11px 20px",borderRadius:8,border:`1.5px solid ${C.border}`,background:"transparent",color:C.textDark,fontWeight:600,fontSize:13,cursor:"pointer"}}>{t.tryAgain}</button>
              <button onClick={()=>setScreen("chat")} style={{padding:"11px 20px",borderRadius:8,border:"none",background:C.red,color:C.white,fontWeight:700,fontSize:13,cursor:"pointer"}}>{t.askBot}</button>
            </div>
          </div>
        )}

        {/* MAP */}
        {screen==="map"&&(
          <MapScreen lang={lang} t={t}/>
        )}

        {/* DOCS */}
        {screen==="docs"&&(
          <DocsScreen lang={lang}/>
        )}

        {/* CHAT */}
        {screen==="chat"&&(
          <div style={{maxWidth:680,margin:"0 auto",display:"flex",flexDirection:"column",height:"calc(100vh - 200px)",minHeight:480}}>
            <div style={{background:C.purple,borderRadius:"10px 10px 0 0",padding:"16px 18px",border:`1px solid ${C.border}`,borderBottom:"none"}}>
              <h2 style={{fontWeight:800,fontSize:17,margin:0,color:C.white}}>{t.chatTitle}</h2>
              <p style={{fontSize:11,color:"rgba(255,255,255,0.55)",margin:"3px 0 0"}}>{t.chatSub}</p>
            </div>
            <div style={{background:C.bg,border:`1px solid ${C.border}`,borderTop:"none",borderBottom:"none",padding:"10px 14px",display:"flex",gap:6,flexWrap:"wrap"}}>
              {t.quickQ.map(q=>(
                <button key={q} onClick={()=>setInput(q)}
                  style={{padding:"5px 12px",borderRadius:6,fontSize:11,cursor:"pointer",border:`1px solid ${C.border}`,background:C.cardBg,color:C.purple,transition:"all 0.15s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background=C.purple;e.currentTarget.style.color=C.white;e.currentTarget.style.borderColor=C.purple;}}
                  onMouseLeave={e=>{e.currentTarget.style.background=C.cardBg;e.currentTarget.style.color=C.purple;e.currentTarget.style.borderColor=C.border;}}>{q}</button>
              ))}
            </div>
            <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:8,padding:"14px 16px",background:C.cardBg,border:`1px solid ${C.border}`,borderTop:"none",borderBottom:"none"}}>
              {msgs[lang].map((m,i)=>(
                <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",gap:8}}>
                  {m.role==="assistant"&&<div style={{width:30,height:30,background:C.purple,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0,marginTop:2}}>🎓</div>}
                  <div style={{maxWidth:"78%",padding:"10px 14px",borderRadius:m.role==="user"?"10px 10px 3px 10px":"10px 10px 10px 3px",background:m.role==="user"?C.red:C.purpleLight,color:m.role==="user"?C.white:C.textDark,fontSize:13,lineHeight:1.6,border:m.role==="assistant"?`1px solid ${C.border}`:"none"}}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading&&(
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <div style={{width:30,height:30,background:C.purple,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🎓</div>
                  <div style={{padding:"10px 14px",borderRadius:"10px 10px 10px 3px",background:C.purpleLight,border:`1px solid ${C.border}`,fontSize:13,color:C.textMuted}}>{t.thinking}</div>
                </div>
              )}
              <div ref={chatEnd}/>
            </div>
            <div style={{background:C.bg,border:`1px solid ${C.border}`,borderTop:"none",borderRadius:"0 0 10px 10px",padding:"12px 14px",display:"flex",gap:8}}>
              <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()} placeholder={t.inputPlaceholder}
                style={{flex:1,padding:"11px 14px",borderRadius:8,border:`1.5px solid ${C.border}`,background:C.cardBg,color:C.textDark,fontSize:13,outline:"none"}}/>
              <button onClick={sendMsg} disabled={loading}
                style={{padding:"11px 20px",borderRadius:8,border:"none",background:loading?C.purpleLight:C.red,color:C.white,fontWeight:700,fontSize:13,cursor:loading?"not-allowed":"pointer",minWidth:80,opacity:loading?0.6:1}}>
                {loading?t.sending:t.send}
              </button>
            </div>
            <div style={{textAlign:"center",fontSize:10,color:C.textMuted,marginTop:8}}>{t.contacts}</div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer style={{background:C.purple,borderTop:`3px solid ${C.red}`,padding:"18px 24px"}}>
        <div style={{maxWidth:1000,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <Logo size={32}/>
            <div>
              <span style={{color:C.white,fontSize:13,fontWeight:700}}>Orient</span>
              <span style={{color:C.red,fontSize:13,fontWeight:700}}>AT</span>
              <div style={{color:"rgba(255,255,255,0.45)",fontSize:10}}>Ала-Тоо · Бишкек · 2026</div>
            </div>
          </div>
          <div style={{color:"rgba(255,255,255,0.55)",fontSize:11}}>{t.contacts}</div>
        </div>
      </footer>
    </div>
  );
}
