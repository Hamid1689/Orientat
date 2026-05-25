import { useState, useRef, useEffect } from "react";
import { C } from "./constants/colors.js";
import Logo from "./components/Logo.jsx";
import {
  PROGRAMS, FACULTIES, QUIZ_DATA, SYSTEM_BASE, T,
  BLOCKS, PREP_COURSE, FAQ_DATA, DOCS_DATA, ENROLL_STEPS
} from "./constants/data.js";

function calcResults(answers,lang){const sc={};FACULTIES[lang].forEach(f=>(sc[f.id]=0));answers.forEach(tags=>tags.forEach(t=>{if(sc[t]!==undefined)sc[t]++;}));return[...FACULTIES[lang]].sort((a,b)=>sc[b.id]-sc[a.id]);}
function fmtFee(n,currency="сом"){return n.toLocaleString("ru-RU")+" "+currency;}
function minFee(fid){const v=Object.values(PROGRAMS).filter(p=>p.faculty===fid).map(p=>p.kr);return Math.min(...v);}
function maxFee(fid){const v=Object.values(PROGRAMS).filter(p=>p.faculty===fid).map(p=>p.kr);return Math.max(...v);}

function FaqScreen({lang}){
  const[open,setOpen]=useState(null);
  const tl={
    ru:{title:"Часто задаваемые вопросы",sub:"Официальные ответы · alatoo.edu.kg/faq/",more:"Открыть официальный сайт с ЧЗВ →"},
    kg:{title:"Көп берилүүчү суроолор",sub:"Расмий жооптор · alatoo.edu.kg/faq/",more:"Расмий сайтты ачуу →"},
    en:{title:"Frequently Asked Questions",sub:"Official AIU answers · alatoo.edu.kg/faq/",more:"Open official FAQ page →"},
  }[lang];
  return(
    <div style={{maxWidth:720,margin:"0 auto"}}>
      <h2 style={{fontWeight:900,fontSize:20,color:C.textDark,marginBottom:4}}>{tl.title}</h2>
      <p style={{fontSize:12,color:C.textMuted,marginBottom:20}}>{tl.sub}</p>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {FAQ_DATA.map((item,i)=>(
          <div key={i} style={{background:C.cardBg,border:`1px solid ${open===i?C.purple:C.border}`,borderLeft:`4px solid ${open===i?C.purple:C.border}`,borderRadius:10,overflow:"hidden",transition:"border-color 0.15s"}}>
            <button onClick={()=>setOpen(open===i?null:i)}
              style={{width:"100%",textAlign:"left",padding:"14px 16px",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:12,justifyContent:"space-between"}}>
              <span style={{fontWeight:600,fontSize:13,color:C.textDark,lineHeight:1.45,flex:1}}>{item.q[lang]}</span>
              <span style={{color:C.purple,fontSize:16,flexShrink:0,display:"inline-block",transform:open===i?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>
            </button>
            {open===i&&(
              <div style={{padding:"12px 16px 14px",fontSize:13,color:C.textMid,lineHeight:1.75,borderTop:`1px solid ${C.border}`}}>
                {item.a[lang]}
              </div>
            )}
          </div>
        ))}
      </div>
      <a href="https://alatoo.edu.kg/faq/" target="_blank" rel="noreferrer"
        style={{display:"block",marginTop:20,textAlign:"center",fontSize:12,color:C.purple,fontWeight:600,textDecoration:"none"}}>
        {tl.more}
      </a>
    </div>
  );
}


function DocsScreen({lang}){
  const[sub,setSub]=useState("kr");
  const tl={
    ru:{title:"Документы для поступления",sub:"Требуемые документы · Бакалавриат · Ала-Тоо МУА",kr:"Граждане КР",int:"Иностранные студенты",note:"По вопросам поступления:",step:"Шаги приёма в AIU"},
    kg:{title:"Кабыл алуу документтери",sub:"Талап кылынган документтер · Бакалавриат · Ала-Тоо МУА",kr:"КР жарандары",int:"Чет өлкөлүк студенттер",note:"Кабыл алуу боюнча суроолор үчүн:",step:"AIU кабыл алуу кадамдары"},
    en:{title:"Admission Documents",sub:"Required documents · Bachelor's · Ala-Too AIU",kr:"KR Citizens",int:"Foreign Students",note:"For admission enquiries:",step:"AIU Admission Steps"},
  }[lang];
  const docs=DOCS_DATA[sub][lang];
  const steps=ENROLL_STEPS[lang];
  return(
    <div style={{maxWidth:720,margin:"0 auto"}}>
      <h2 style={{fontWeight:900,fontSize:20,color:C.textDark,marginBottom:4}}>{tl.title}</h2>
      <p style={{fontSize:12,color:C.textMuted,marginBottom:20}}>{tl.sub}</p>
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
            <Logo size={52}/>
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
            {[["home",0],["quiz",1],["chat",2],["map",3],["docs",4],["faq",5]].map(([s,i])=>(
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

        {/* FAQ */}
        {screen==="faq"&&(
          <FaqScreen lang={lang}/>
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
