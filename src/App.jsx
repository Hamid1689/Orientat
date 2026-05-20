import { useState } from "react";
import { C } from "./constants/colors";
import { T, FACULTIES, QUIZ_DATA, SYSTEM_BASE } from "./constants/data";
import { calcResults } from "./utils/helpers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import FacultyScreen from "./screens/FacultyScreen";
import QuizScreen from "./screens/QuizScreen";
import ResultScreen from "./screens/ResultScreen";
import ChatScreen from "./screens/ChatScreen";

const INIT_MSGS = {
  ru: [{ role: "assistant", content: T.ru.initMsg }],
  kg: [{ role: "assistant", content: T.kg.initMsg }],
  en: [{ role: "assistant", content: T.en.initMsg }],
};

export default function App() {
  const [lang, setLang] = useState("ru");
  const [screen, setScreen] = useState("home");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [msgs, setMsgs] = useState(INIT_MSGS);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const t = T[lang];
  const quiz = QUIZ_DATA[lang];
  const faculties = FACULTIES[lang];

  // screen can be "home" | "quiz" | "result" | "chat" | "faculty:<id>"
  const isFaculty = screen.startsWith("faculty:");
  const detailFaculty = isFaculty ? screen.split(":")[1] : null;
  const activeScreen = isFaculty ? "faculty" : screen;

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setResults([]);
    setSelected(null);
    setScreen("quiz");
  };

  const switchLang = (l) => {
    setLang(l);
    if (activeScreen === "result" && answers.length) setResults(calcResults(answers, l));
  };

  const pickAnswer = (tags) => {
    setSelected(tags);
    setTimeout(() => {
      const next = [...answers, tags];
      setAnswers(next);
      setSelected(null);
      if (step + 1 < quiz.length) {
        setStep(step + 1);
      } else {
        setResults(calcResults(next, lang));
        setScreen("result");
      }
    }, 280);
  };

  const sendMsg = async () => {
    const cur = msgs[lang];
    if (!input.trim() || loading) return;
    const um = { role: "user", content: input.trim() };
    const nm = [...cur, um];
    setMsgs(p => ({ ...p, [lang]: nm }));
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_BASE + "\n\n" + t.systemLang,
          messages: nm.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMsgs(p => ({ ...p, [lang]: [...nm, { role: "assistant", content: data.content?.[0]?.text || t.contacts }] }));
    } catch {
      setMsgs(p => ({ ...p, [lang]: [...nm, { role: "assistant", content: "⚠️ " + t.contacts }] }));
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI',system-ui,sans-serif", color: C.textDark }}>
      <Header lang={lang} t={t} screen={activeScreen} switchLang={switchLang} setScreen={setScreen} resetQuiz={resetQuiz} />

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "26px 22px 60px" }}>
        {activeScreen === "home" && (
          <HomeScreen lang={lang} t={t} faculties={faculties} resetQuiz={resetQuiz} setScreen={setScreen} />
        )}
        {activeScreen === "faculty" && (
          <FacultyScreen lang={lang} t={t} faculties={faculties} detailFaculty={detailFaculty} setScreen={setScreen} />
        )}
        {activeScreen === "quiz" && (
          <QuizScreen t={t} quiz={quiz} step={step} selected={selected} pickAnswer={pickAnswer} setScreen={setScreen} />
        )}
        {activeScreen === "result" && (
          <ResultScreen t={t} results={results} resetQuiz={resetQuiz} setScreen={setScreen} />
        )}
        {activeScreen === "chat" && (
          <ChatScreen t={t} msgs={msgs[lang]} input={input} setInput={setInput} loading={loading} sendMsg={sendMsg} />
        )}
      </main>

      <Footer t={t} />
    </div>
  );
}
