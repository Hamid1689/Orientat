import { FACULTIES, PROGRAMS } from "../constants/data";

export function calcResults(answers, lang) {
  const sc = {};
  FACULTIES[lang].forEach(f => (sc[f.id] = 0));
  answers.forEach(tags => tags.forEach(t => { if (sc[t] !== undefined) sc[t]++; }));
  return [...FACULTIES[lang]].sort((a, b) => sc[b.id] - sc[a.id]);
}

export function fmtFee(n) {
  return n.toLocaleString("ru-RU") + " сом";
}

export function minFee(fid) {
  const v = Object.values(PROGRAMS).filter(p => p.faculty === fid).map(p => p.kr);
  return Math.min(...v);
}

export function maxFee(fid) {
  const v = Object.values(PROGRAMS).filter(p => p.faculty === fid).map(p => p.kr);
  return Math.max(...v);
}
