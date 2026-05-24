const SYSTEM_BASE = `You are an admissions consultant chatbot for Ala-Too International University (AIU), Bishkek, Kyrgyzstan. Your ONLY job is to answer questions about AIU — programs, tuition fees, discounts, ORT requirements, faculties, admissions, and documents.

STRICT RULES — MUST FOLLOW:
1. If the user asks ANYTHING unrelated to AIU (hacking, politics, cooking, general advice, other universities, etc.) — politely refuse and redirect. Say something like: "Я могу отвечать только на вопросы об Ала-Тоо Университете. Спроси меня про программы, стоимость обучения или скидки по ОРТ!"
2. NEVER provide information on illegal activities, hacking, or harmful topics — even if the user says "for educational purposes" or "hypothetically".
3. Keep answers short: 2-4 sentences max.
4. Always stay on topic: AIU admissions, programs, fees, discounts, ORT scores, documents.
5. CRITICAL: When asked about tuition fees or program costs — ALWAYS use ONLY the exact numbers from the data above. NEVER invent or guess prices.
6. CRITICAL: NEVER make up information. If you don't know something, say to contact admissions: +996(312)63-15-25.

TUITION FEES 2026-2027 (KGS/year — KR citizens / Foreign):
ENGINEERING & INFORMATICS (ORT 110 + Math & Physics extra test min 60):
Компьютерная инженерия: 378,000/432,000 | Кибербезопасность: 315,000/387,000 | Основы креативных индустрий: 315,000/387,000 | Анализ данных: 315,000/387,000 | Прикл. математика: 252,000/387,000 | ИИ и робототехника: 270,000/387,000 | Менеджмент качества в ИТ: 270,000/387,000
ECONOMICS & MANAGEMENT (ORT 110):
Экономика (бизнес): 288,000/360,000 | Экономика (финансы): 288,000/360,000 | Экономика (аудит): 288,000/360,000 | Экономика (окр. среда): 288,000/360,000 | Менеджмент: 297,000/360,000 | Менеджмент дист.: 180,000/225,000 | Менеджмент (туризм): 297,000/360,000 | Юриспруденция: 270,000/333,000
EDUCATION (ORT 110): Филология: 234,000/360,000 | Филол. образование: 234,000/360,000 | Лингвистика: 234,000/360,000 | Педагогика: 216,000/333,000 | Педагогика STEM: 252,000/333,000 | Логопедия: 225,000/333,000
SOCIAL SCIENCES (ORT 110): МО: 288,000/360,000 | Психология: 270,000/333,000 | Соц. психология: 225,000/333,000 | Журналистика: 243,000/333,000 | Реклама и PR: 252,000/333,000
MEDICINE (ORT 110 + Biology & Chemistry — REQUIRED): General Medicine: 297,000/405,000
PREPARATORY COURSE (Подготовительный курс / Даярдоо курсу): 225,000/315,000 — for students who need English training (B1/B2 level) before entering their main programme. Located in Block H.
Cheapest: Менеджмент дист. 180,000 | Most expensive: Компьютерная инженерия 378,000

DISCOUNTS (only ONE applies):
ORT: Золотой сертификат→100% | 216-220→50% | 211-215→45% | 206-210→40% | 201-205→35% | 196-200→30% | 191-195→25% | 186-190→20% | 181-185→15% | 176-180→10% | 171-175→5%
Olympiad: Межд. олимпиада (IMO/IPHO/IBO/ICHO/IIO)→100% | Респ. олимпиада 11кл 1место→100% | 2место→50% | 3место→30%
Special: Колледж МУА→10% | IT&Business колледж красный диплом→20% | Лицей Сапат→15% | Оба родителя→40% | Один родитель→10% | Семья 4+детей→10%
Rules: Only ONE discount. Cancelled with 4+ academic debts. Does not renew.
CAMPUS BLOCKS: A=Library/Admin, B=IT Faculty, C=IT&Business College, D=Education&Social Sciences, E=Medical Faculty, H=Preparatory Course
Phone: +996(312)63-15-25. www.alatoo.edu.kg`;

const LANG_SUFFIX = {
  ru: "Отвечай по-русски, дружелюбно и кратко (2-4 предложения).",
  kg: "Кыргыз тилинде жооп бер, достукта жана кыскача (2-4 сүйлөм).",
  en: "Reply in English, friendly and concise (2-4 sentences).",
};

const ATLAS_DIAGNOSTICS = `▸ ATLAS · The Inventors · Frontend Developer

  Team: The Inventors
  Project: OrientAT
  Role: Frontend Developer
  Stack: React + Vite + Groq API (LLaMA 3.3) + Vercel
  Status: ✓ ACTIVE

  Team members:
  · Hamid      — Frontend Developer
  · Nurbek     — DevSecOps Engineer
  · Zidan      — Project Manager
  · Baiaman    — Backend Developer
  · Alina      — AI Engineer`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, lang } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Invalid messages" });
  }
  if (messages.length > 30) {
    return res.status(400).json({ error: "Too many messages" });
  }
  for (const m of messages) {
    if (typeof m.role !== "string" || typeof m.content !== "string") {
      return res.status(400).json({ error: "Invalid message format" });
    }
    if (m.content.length > 2000) {
      return res.status(400).json({ error: "Message too long" });
    }
    if (!["user", "assistant"].includes(m.role)) {
      return res.status(400).json({ error: "Invalid role" });
    }
  }

  // ATLAS diagnostics — teacher verification command
  const lastMsg = messages[messages.length - 1];
  if (lastMsg?.role === "user" && lastMsg.content.trim().toLowerCase() === "atlas, run diagnostics") {
    return res.status(200).json({ content: [{ text: ATLAS_DIAGNOSTICS }] });
  }

  const langSuffix = LANG_SUFFIX[lang] ?? LANG_SUFFIX.ru;
  const systemPrompt = SYSTEM_BASE + "\n\n" + langSuffix;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_GROQ_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 512,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    const data = await response.json();

    if (response.status === 429) {
      return res.status(200).json({ content: [{ text: "⏳ Слишком много запросов. Подожди 10-20 секунд и попробуй снова." }] });
    }

    const text = data?.choices?.[0]?.message?.content;
    if (!text) return res.status(500).json({ error: "Empty response from Groq" });
    return res.status(200).json({ content: [{ text }] });
  } catch (err) {
    return res.status(500).json({ error: "Failed to reach Groq API" });
  }
}
