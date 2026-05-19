import { useState, useEffect, useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";

// ═══════════════════════════════════════════════════════════════
// SIBOLLA V5 — CORRECT BRAND PALETTE + HORMOZI FUNNEL ARCHITECTURE
// Palette: Deep Forest Green #1A3C2A, Aged Gold #B8963E, Charcoal #2D2D2D, Warm Cream #F9F5EE
// Fonts: Playfair Display (headings) + DM Sans (body)
// ═══════════════════════════════════════════════════════════════
const C={dg:"#1A3C2A",gold:"#B8963E",char:"#2D2D2D",cream:"#F9F5EE",lcream:"#F1ECE3",dcream:"#E2DDD6",white:"#FFFFFF",gl:"#2A5A44",gd:"#0F2419",goldL:"#D4AC5A",muted:"#6B6560",body:"#3A3530",ov:"rgba(15,36,25,0.94)",red:"#C0392B",redL:"#E74C3C"};
const EMAIL="litsitsosibolla@gmail.com",WA="26656576553",LI="https://www.linkedin.com/in/sibolla/",FB="https://www.facebook.com/sibollal/";
const mkE=(s,b)=>`mailto:${EMAIL}?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(b)}`;
const mkW=(m)=>`https://wa.me/${WA}?text=${encodeURIComponent(m)}`;

const I={
  li:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  fb:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  wa:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  em:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  ar:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  bk:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>,
  pl:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>,
  cal:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  star:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  ck:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>,
  fire:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 23c-4.97 0-9-3.58-9-8 0-3.19 2.13-6.17 3.5-7.56.34-.35.91-.18 1.02.27.3 1.2.87 2.53 1.83 3.44.14.13.35.05.38-.13.16-.98.46-2.45 1.27-3.95C12.5 4.07 14.1 2.5 15.5 1.5c.39-.28.9.08.82.55-.33 1.86-.17 4.15 1.18 5.95 1.27 1.7 1.53 3.3 1.5 4.5 0 4.42-4.03 8-9 8V23z"/></svg>,
  qt:()=><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" opacity=".12"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>,
};

// ═══════════════════════════════════════════════════════════════
// SERVICES — Prices aligned with Hormozi roadmap scaling logic
// IGNITE = entry offer (one-time template makeover)
// ARCHITECT = 90-Day Brand Revenue Sprint (the core Hormozi offer)
// COMMAND = Full transformation with team
// ═══════════════════════════════════════════════════════════════
const SERVICES=[
  {
    id:"ignite",tier:"IGNITE",tagline:"The Marketing Makeover",
    headline:"Stop posting into the void.",
    subhead:"Your entire marketing foundation — rebuilt in 10 days.",
    price:9500,discountPrice:5999,
    short:"Full brand audit, 30+ custom templates, content strategy, and a 90-day calendar. You walk away with permanent marketing assets that any team can execute.",
    desc:"You're spending time on marketing that isn't generating revenue. It feels like a hobby, not a strategy. IGNITE fixes that in one engagement. I audit your brand positioning, build 30+ custom post templates specified to your business (captions AND graphics), design your content pillar strategy with a 90-day editorial calendar, map your competitors, and hand you a campaign playbook. One engagement. Permanent assets. No more starting from scratch every time you need to post.",
    includes:["Brand Revenue Audit — where your marketing is leaking money","30+ custom social media templates (graphics + captions, specified to YOUR business)","Content pillar strategy & 90-day editorial calendar","Competitor analysis & differentiation map","Campaign concept with full execution playbook","Brand voice guide & messaging framework","Post scheduling strategy by platform"],
    ideal:"Businesses posting without a system. You know your marketing isn't working, but you don't know where the leak is. This gives you the infrastructure to stop guessing.",
    delivery:"7–10 business days",
    painPoint:"You're posting content but you don't know what you're actually known for. Every post feels like starting from scratch.",
    eSubj:"Application — IGNITE Marketing Makeover",
    eBody:"Hi Litsitso,\n\nI'd like to apply for IGNITE.\n\nBusiness name:\nIndustry:\nWebsite/social links:\nBiggest marketing frustration right now:\nWhat would change if your marketing actually worked?\n\nLooking forward to your response.",
    wMsg:"Hi Litsitso, I'd like to apply for the IGNITE Marketing Makeover. My business is [name] in [industry]. My biggest marketing frustration is [describe]. What are the next steps?",
  },
  {
    id:"architect",tier:"ARCHITECT",tagline:"The 90-Day Brand Revenue Sprint",
    headline:"Your marketing generates activity. Not revenue.",
    subhead:"I fix that in 90 days.",
    price:20000,discountPrice:14500,pricePer:"/mo",
    short:"A 90-day strategic engagement: deep audit, custom roadmap, bi-weekly strategy sessions, and direct advisory access. This is not social media management. This is having a strategist in your corner.",
    desc:"You've been doing everything — posting, running ads, maybe even hiring someone — and none of it is compounding. You have visibility but no authority. Activity but no revenue. ARCHITECT is a 90-day strategic sprint where I audit your entire marketing system, build a custom roadmap with prioritised actions and KPIs, provide bi-weekly strategy calls, and give you direct WhatsApp access to my thinking. I do the strategic heavy lifting. You implement with my guidance. At the end of 90 days, you'll have a marketing machine that actually converts attention into money.",
    includes:["Deep Brand Revenue Audit — full analysis of positioning, content, audience, and conversion gaps","Custom 90-day marketing roadmap with prioritised actions & KPIs","Bi-weekly 45-min strategy calls (6 total)","Direct WhatsApp advisory access (priority response within 4 hours)","Content ecosystem architecture & oversight","Campaign review & performance measurement framework","Monthly strategy report with specific recommendations","Final results report — your next case study"],
    ideal:"Growing businesses doing R50K+ monthly revenue that need strategic direction, not just more content. You know you're leaving money on the table. You just don't know where. Minimum 3-month commitment.",
    delivery:"90-day engagement — starts within 48 hours of onboarding",
    painPoint:"Less skilled people are getting your opportunities. Your marketing generates likes, not leads. You're invisible to the people who can actually pay you.",
    eSubj:"Application — ARCHITECT 90-Day Sprint",
    eBody:"Hi Litsitso,\n\nI'd like to apply for the ARCHITECT 90-Day Brand Revenue Sprint.\n\nBusiness name:\nIndustry:\nCurrent monthly revenue (approx):\nWhat's your biggest frustration with your current marketing?\nWhat would success look like in 90 days?\nWebsite/social links:\n\nI understand this is a minimum 3-month commitment and I'm ready to invest.\n\nLooking forward to hearing from you.",
    wMsg:"Hi Litsitso, I'd like to apply for the ARCHITECT 90-Day Sprint. Business: [name], industry: [industry], revenue: [approx/month]. My biggest marketing frustration is [describe]. What's the application process?",
  },
  {
    id:"command",tier:"COMMAND",tagline:"Total Marketing Transformation",
    headline:"You don't need another agency. You need an architect.",
    subhead:"I bring the team. We rebuild everything.",
    price:95000,discountPrice:69500,flagship:true,
    short:"A hand-picked team of 2–5 specialists rebuilds your entire marketing operation. Brand strategy, content systems, campaign architecture, digital infrastructure, team training, and 90-day execution oversight.",
    desc:"Your marketing isn't broken in one place. It's broken everywhere. The brand doesn't land. The content doesn't convert. The campaigns don't compound. The team doesn't have direction. COMMAND is a full deployment — I bring a hand-picked team of 2–5 specialists and we rebuild your entire marketing infrastructure from the ground up. Brand strategy, visual identity system, multi-channel campaign architecture, content production with 60+ assets, digital ecosystem setup, email marketing system, team training, and 90-day execution oversight with weekly check-ins. This is what happens when you stop playing small and treat marketing as the revenue infrastructure it should be.",
    includes:["Complete marketing infrastructure rebuild","Dedicated team of 2–5 specialists hand-picked for your industry","Brand strategy & full visual identity system","Multi-channel campaign architecture & phased launch","Content production system with 60+ custom assets","Digital ecosystem setup & platform optimization","Social media strategy & channel architecture","Email marketing system design & automation","Team training & capability transfer (your team learns the system)","90-day execution oversight with weekly strategy check-ins","Post-project 30-day support & optimization","Final performance report with scaling recommendations"],
    ideal:"Ambitious organizations doing R500K+ monthly revenue that are ready to stop treating marketing as an expense and start treating it as revenue infrastructure. This is not for businesses looking for 'social media help.' This is for leaders who understand that a broken marketing system is the most expensive thing in their business.",
    delivery:"12–16 week engagement",
    painPoint:"You're spending money on marketing that doesn't compound. Every campaign starts from zero. Your competitors with half your quality are winning because their marketing system actually works.",
    eSubj:"Application — COMMAND Total Transformation",
    eBody:"Hi Litsitso,\n\nI'd like to apply for the COMMAND Total Marketing Transformation.\n\nBusiness name:\nIndustry:\nCurrent monthly revenue:\nTeam size:\nWhat's broken about your marketing right now?\nWhat does success look like in 6 months?\nWebsite/social links:\n\nI understand this is a premium engagement and I'm ready to invest at this level.\n\nLooking forward to discussing.",
    wMsg:"Hi Litsitso, I'm interested in the COMMAND Total Transformation. Business: [name], revenue: [amount]/month, team: [size]. Our biggest marketing problem is [describe]. Let's discuss.",
  },
];

const REVIEWS=[
  {name:"Adv. Mary Mathaothe Bosiu",role:"Lawyer, Author & Leadership Coach",text:"He is not chasing money. He is chasing mastery... and when a person commits to mastery, money eventually learns how to chase them.",rating:5},
  {name:"Vusi Mashinini",role:"University of Cambridge | LLM | International Corporate Lawyer",text:"Litsitso is an excellent digital marketer and copywriter. He is a great networker and a great team player. He is a creative genius and a problem solver.",rating:5},
  {name:"Tsele Ramoroke",role:"Computer Scientist | Cybersecurity & AI Enthusiast",text:"If you are looking for a creative content creator, a certified and skilled digital marketer with a touch of art to his work, this is your guy.",rating:5},
  {name:"Moliehi Mokokomali",role:"MBChB Student | Nurse Midwife | Health Advocate",text:"Brilliant, innovative and possesses great social skills.",rating:5},
];

const COMPANIES=["LNIG Hollard","Lesotho Electricity Company","Abidors","Renoka","Botho University","Sebabatso","SOS Children's Villages","Selibeng","PSCCS","Bold Digital","Piosenka Plus","Lesotho Tourism","LRG Consulting","PUMA Energy","Summit Travel","Transform Lesotho Initiative","Kofi Khafetsa","Maluti Neurodiagnostics","Prof. Nqosa Mahao","Basotho Action Party"];

// Pain points from Brand Positioning Workbook Section 05
const PAIN_POINTS=[
  "I'm posting but I'm not positioned.",
  "I attract the wrong audience — people who want free advice, not people who can hire me.",
  "My marketing generates activity, not revenue.",
  "Less skilled people are getting my opportunities.",
  "All the marketing advice is built for Western markets. None of it fits mine.",
];

const BLOG_POSTS=[
  {id:1,cat:"MARKETING SYSTEMS",title:"You're Not Invisible. You're Unpositioned.",excerpt:"The difference between being visible and being positioned is the difference between being seen and being hired. Most marketing advice won't tell you that.",date:"Mar 2026",time:"8 min",featured:true},
  {id:2,cat:"BRAND STRATEGY",title:"Your Brand Is Not Your Logo. It's Your Revenue Infrastructure.",excerpt:"Every rand you spend on marketing without brand infrastructure is a rand that disappears. Here's what infrastructure actually means.",date:"Mar 2026",time:"6 min"},
  {id:3,cat:"EMERGING MARKETS",title:"Stop Copy-Pasting Playbooks That Weren't Built for Your Market",excerpt:"Different trust architectures. Different buyer psychology. Different infrastructure. Treating emerging markets as 'less developed' versions of mature ones is intellectually lazy and strategically costly.",date:"Feb 2026",time:"10 min"},
  {id:4,cat:"DISCIPLINE",title:"The Same System I Use to Build Muscle Is How I Build Marketing Strategy",excerpt:"Progressive overload. Tracking. Consistency. Compounding. The gym and the business run on the same operating system.",date:"Feb 2026",time:"7 min"},
  {id:5,cat:"POSITIONING",title:"Attract the Right 500. Not the Wrong 50,000.",excerpt:"Revenue comes from trust and positioning, not reach. Optimize for who's in the room, not how many.",date:"Jan 2026",time:"9 min"},
  {id:6,cat:"CONTRARIAN",title:"Followers Are Practice Swings. Only Revenue Counts.",excerpt:"If you're celebrating 10K followers with zero revenue, you don't have a marketing strategy. You have an entertainment page.",date:"Jan 2026",time:"5 min"},
];

const EPISODES=[
  {id:1,type:"VIDEO",title:"The Brand Revenue Audit: Where Your Marketing Is Leaking Money",desc:"The 3-layer framework I run on every business. Where the gaps are. Where the leverage sits.",dur:"28:41",series:"Strategy Deep Dives"},
  {id:2,type:"PODCAST",title:"Building From Maseru: Why Small Markets Are the Biggest Opportunity",desc:"You can operate at a high strategic level from anywhere on the continent if your thinking is sharp enough.",dur:"34:12",series:"The Sibolla Sessions"},
  {id:3,type:"VIDEO",title:"Why Your Content Doesn't Convert (And What to Do Instead)",desc:"The invisible structure behind every piece of content that actually drives revenue.",dur:"22:05",series:"Strategy Deep Dives"},
];

// ═══════ FINGERPRINT + TIMER ═══════
function getFP(){try{const c=document.createElement("canvas");const x=c.getContext("2d");x.textBaseline="top";x.font="14px Arial";x.fillText("fp",2,2);const d=c.toDataURL();const n=navigator.userAgent+navigator.language+screen.width+screen.height+screen.colorDepth+new Date().getTimezoneOffset();let h=0;const s=d+n;for(let i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;}return"sb_"+Math.abs(h).toString(36)}catch{return"sb_x"}}
function getTK(id){return`sib_${id}_${getFP()}`}
function getEnd(id){try{const v=window.localStorage.getItem(getTK(id));if(v){const e=parseInt(v,10);return e>Date.now()?e:null;}return undefined}catch{return undefined}}
function setEnd(id,t){try{window.localStorage.setItem(getTK(id),t.toString())}catch{}}

function useCD(id){
  const[tl,setTl]=useState(null);const[exp,setExp]=useState(false);
  useEffect(()=>{
    const s=getEnd(id);let end;
    if(s===null){setExp(true);return;}
    if(s===undefined){end=Date.now()+3*3600000;setEnd(id,end);}else end=s;
    const tick=()=>{const d=end-Date.now();if(d<=0){setExp(true);setTl(null);return;}setTl({h:Math.floor(d/3600000),m:Math.floor((d%3600000)/60000),s:Math.floor((d%60000)/1000)});};
    tick();const iv=setInterval(tick,1000);return()=>clearInterval(iv);
  },[id]);return{tl,exp};
}

function useCur(){
  const[cur,setCur]=useState("ZAR");const[rate,setRate]=useState(16.85);const[upd,setUpd]=useState("");
  useEffect(()=>{
    try{const tz=Intl.DateTimeFormat().resolvedOptions().timeZone||"";if(!["Africa/","Johannesburg","Harare","Maseru","Gaborone","Windhoek","Maputo","Mbabane"].some(z=>tz.includes(z)))setCur("USD")}catch{}
    (async()=>{try{const r=await fetch("https://api.exchangerate-api.com/v4/latest/USD");if(r.ok){const d=await r.json();if(d.rates?.ZAR){setRate(d.rates.ZAR);setUpd(new Date().toLocaleDateString("en-ZA",{day:"numeric",month:"short"}))}}}catch{setUpd("offline")}})();
  },[]);
  const fmt=useCallback(z=>cur==="ZAR"?`R${z.toLocaleString()}`:`$${Math.round(z/rate).toLocaleString()}`,[cur,rate]);
  return{cur,fmt,toggle:()=>setCur(c=>c==="ZAR"?"USD":"ZAR"),upd};
}

// ═══════ APP ═══════
export default function App(){
  const[pg,setPg]=useState("home");const[svc,setSvc]=useState(null);
  const[sY,setSY]=useState(0);const[vis,setVis]=useState({});
  const cur=useCur();

  useEffect(()=>{const h=()=>setSY(window.scrollY);window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h)},[]);
  useEffect(()=>{const o=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)setVis(p=>({...p,[e.target.id]:true}))})},{threshold:.08});setTimeout(()=>document.querySelectorAll("[data-a]").forEach(el=>o.observe(el)),80);return()=>o.disconnect()},[pg,svc]);
  useEffect(()=>{window.scrollTo(0,0)},[pg,svc]);

  const nav=p=>{setSvc(null);setPg(p)};
  const NV=[{id:"home",l:"Home"},{id:"about",l:"About"},{id:"services",l:"Services"},{id:"blog",l:"Insights"},{id:"media",l:"Media"},{id:"contact",l:"Contact"}];

  return(
    <div style={{fontFamily:"'Playfair Display',Georgia,serif",background:C.cream,color:C.body,minHeight:"100vh",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes heroLine{from{width:0}to{width:80px}}
        @keyframes tickPulse{0%{transform:scale(1)}50%{transform:scale(1.03)}100%{transform:scale(1)}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .ai{opacity:0}.ai.v{animation:fadeUp .6s ease forwards}.ai.v.d1{animation-delay:.1s}.ai.v.d2{animation-delay:.2s}.ai.v.d3{animation-delay:.3s}.ai.v.d4{animation-delay:.4s}
        .dm{font-family:'DM Sans',sans-serif}
        .nl{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;color:${C.cream};opacity:.6;transition:all .3s;border:none;background:none;padding:7px 0;position:relative}.nl:hover,.nl.ac{opacity:1}.nl.ac::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:${C.gold}}
        .cp{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;cursor:pointer;background:${C.gold};color:${C.char};border:none;padding:14px 28px;transition:all .35s;text-decoration:none;display:inline-flex;align-items:center;gap:8px}.cp:hover{background:${C.goldL};transform:translateY(-2px);box-shadow:0 8px 24px rgba(184,134,11,.3)}
        .co{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;cursor:pointer;background:transparent;color:${C.gold};border:2px solid ${C.gold};padding:12px 26px;transition:all .35s;text-decoration:none;display:inline-flex;align-items:center;gap:8px}.co:hover{background:${C.gold};color:${C.char};transform:translateY(-2px)}
        .cg{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;background:transparent;color:${C.gold};border:none;padding:5px 0;transition:all .3s;text-decoration:none;display:inline-flex;align-items:center;gap:6px;border-bottom:1px solid transparent}.cg:hover{border-bottom-color:${C.gold}}
        .sl{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${C.gold};margin-bottom:12px}
        .si{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all .3s;border:1px solid rgba(255,255,255,.2);color:${C.cream};text-decoration:none}.si:hover{background:${C.gold};color:${C.char};border-color:${C.gold};transform:translateY(-2px)}
        .ab{display:inline-block;padding:4px 12px;font-family:'DM Sans',sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;border:1px solid ${C.gold};color:${C.gold}}
        .ct{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:700;letter-spacing:1px;cursor:pointer;border:1px solid ${C.dcream};background:${C.white};color:${C.muted};padding:5px 12px;transition:all .2s;border-radius:16px}.ct.on{background:${C.dg};color:${C.cream};border-color:${C.dg}}
        .mt{display:flex;animation:marquee 45s linear infinite}.mt:hover{animation-play-state:paused}
        .tb{background:linear-gradient(135deg,${C.red},${C.redL});padding:14px 20px;display:flex;align-items:center;gap:10px;color:${C.white};font-family:'DM Sans',sans-serif}
        .td{font-size:20px;font-weight:800;letter-spacing:1px;font-variant-numeric:tabular-nums}
        @media(max-width:768px){.hm{display:none!important}.ms{flex-direction:column!important}.mp{padding-left:20px!important;padding-right:20px!important}}
      `}</style>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:sY>50?C.ov:"transparent",backdropFilter:sY>50?"blur(16px)":"none",transition:"all .3s",borderBottom:sY>50?"1px solid rgba(184,134,11,.1)":"1px solid transparent"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 40px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}} className="mp">
          <button onClick={()=>nav("home")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:30,height:30,background:C.gold,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:800,color:C.char}}>S</span></div>
            <span style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:C.cream,letterSpacing:2}}>SIBOLLA</span>
          </button>
          <div style={{display:"flex",alignItems:"center",gap:24}} className="hm">
            {NV.map(n=><button key={n.id} className={`nl ${pg===n.id&&!svc?"ac":""}`} onClick={()=>nav(n.id)}>{n.l}</button>)}
          </div>
        </div>
      </nav>

      {svc?<SvcLand s={SERVICES.find(x=>x.id===svc)} back={()=>setSvc(null)} cur={cur} vis={vis}/>:(
        <>
          {pg==="home"&&<Home nav={nav} vis={vis} cur={cur} go={setSvc}/>}
          {pg==="about"&&<About vis={vis} nav={nav}/>}
          {pg==="services"&&<Svcs vis={vis} cur={cur} go={setSvc}/>}
          {pg==="blog"&&<Blog vis={vis}/>}
          {pg==="media"&&<Media vis={vis}/>}
          {pg==="contact"&&<Ctct vis={vis}/>}
        </>
      )}

      <footer style={{background:C.gd,padding:"50px 40px 24px"}} className="mp">
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:24,marginBottom:36}} className="ms">
            <p className="dm" style={{fontSize:12,color:"rgba(250,248,245,.35)",lineHeight:1.7,maxWidth:360}}>I build positioning systems that compound trust and commercial value. Not follower counts. Not recycled playbooks. Revenue infrastructure — built from Maseru.</p>
            <div style={{display:"flex",gap:9}}>
              <a href={LI} target="_blank" rel="noopener noreferrer" className="si"><I.li/></a>
              <a href={FB} target="_blank" rel="noopener noreferrer" className="si"><I.fb/></a>
              <a href={mkW("Hi Litsitso")} target="_blank" rel="noopener noreferrer" className="si"><I.wa/></a>
              <a href={`mailto:${EMAIL}`} className="si"><I.em/></a>
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(184,134,11,.08)",paddingTop:16,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
            <p className="dm" style={{fontSize:10,color:"rgba(250,248,245,.18)"}}>© {new Date().getFullYear()} LITSITSO SIBOLLA</p>
            <p className="dm" style={{fontSize:10,color:"rgba(250,248,245,.18)"}}>Maseru, Lesotho · Southern Africa</p>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}

function CurTog({cur}){return <div style={{display:"flex",gap:5,alignItems:"center"}}><button className={`ct ${cur.cur==="ZAR"?"on":""}`} onClick={cur.toggle}>ZAR</button><button className={`ct ${cur.cur==="USD"?"on":""}`} onClick={cur.toggle}>USD</button>{cur.upd&&<span className="dm" style={{fontSize:9,color:C.muted,marginLeft:4}}>{cur.upd}</span>}</div>}

function Timer({id}){const{tl,exp}=useCD(id);if(exp)return<div style={{background:C.char,padding:"12px 18px"}} className="dm" ><p style={{fontSize:11,color:"rgba(250,248,245,.3)",textAlign:"center",letterSpacing:1}}>LAUNCH PRICING HAS EXPIRED FOR THIS SESSION</p></div>;if(!tl)return null;return<div className="tb"><I.fire/><span style={{fontSize:10,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Launch pricing ends in</span><span className="td" style={{animation:"tickPulse 1s ease infinite"}}>{String(tl.h).padStart(2,"0")}:{String(tl.m).padStart(2,"0")}:{String(tl.s).padStart(2,"0")}</span></div>}

// ═══════════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════════
function Home({nav,vis,cur,go}){
  return(<>
    {/* HERO — Opening with the brand statement from Workbook Section 08 */}
    <section style={{minHeight:"100vh",background:`linear-gradient(165deg,${C.gd} 0%,${C.dg} 40%,${C.gl} 100%)`,display:"flex",alignItems:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,opacity:.025,backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,.5) 1px,transparent 0)",backgroundSize:"40px 40px"}}/>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"130px 40px 80px",position:"relative",zIndex:1,width:"100%"}} className="mp">
        <div style={{maxWidth:720}}>
          <p className="dm" style={{fontSize:11,fontWeight:700,letterSpacing:4,color:C.gold,marginBottom:24,animation:"fadeIn .8s ease .2s both"}}>MARKETING SYSTEMS STRATEGIST · MASERU, LESOTHO</p>
          <h1 style={{fontSize:"clamp(36px,5.5vw,64px)",fontWeight:800,lineHeight:1.06,color:C.cream,marginBottom:10,animation:"fadeUp .8s ease .3s both"}}>
            Your marketing<br/>generates activity.<br/>
            <span style={{color:C.gold}}>I make it generate revenue.</span>
          </h1>
          <div style={{width:80,height:3,background:C.gold,marginBottom:24,animation:"heroLine .6s ease .7s both"}}/>
          <p className="dm" style={{fontSize:16,lineHeight:1.7,color:"rgba(250,248,245,.5)",maxWidth:520,marginBottom:40,animation:"fadeUp .8s ease .5s both"}}>
            I build positioning systems that compound trust and commercial value for ambitious organizations. Not follower counts. Not recycled playbooks. Revenue infrastructure — built from Maseru.
          </p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap",animation:"fadeUp .8s ease .7s both"}}>
            <a href={mkE("Application to Work with Litsitso Sibolla","Hi Litsitso,\n\nI'd like to apply to work with you.\n\nBusiness:\nIndustry:\nBiggest marketing frustration:\n\nLooking forward to hearing from you.")} className="cp">Apply to Work With Me <I.ar/></a>
            <button className="co" onClick={()=>nav("services")} style={{color:C.cream,borderColor:"rgba(250,248,245,.2)"}}>View Services</button>
          </div>
        </div>
      </div>
    </section>

    {/* COMPANIES MARQUEE */}
    <div style={{background:C.white,borderBottom:`1px solid ${C.dcream}`,padding:"20px 0 16px",overflow:"hidden"}}>
      <p className="dm" style={{fontSize:8,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:C.muted,textAlign:"center",marginBottom:14,opacity:.35}}>20+ ORGANISATIONS TRUST THIS THINKING</p>
      <div style={{overflow:"hidden"}}><div className="mt" style={{whiteSpace:"nowrap"}}>{[0,1].map(k=><span key={k}>{COMPANIES.map((c,i)=><span key={`${k}${i}`} className="dm" style={{fontSize:11,fontWeight:600,letterSpacing:2.5,textTransform:"uppercase",color:C.muted,opacity:.3,marginRight:36,display:"inline-block"}}>{c}</span>)}</span>)}</div></div>
    </div>

    {/* PAIN POINTS — From Workbook Section 05 */}
    <section style={{padding:"80px 40px",background:C.cream}} className="mp">
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <div id="pain" data-a className={`ai ${vis.pain?"v":""}`}>
          <p className="sl">Sound Familiar?</p>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {PAIN_POINTS.map((p,i)=>(
              <div key={i} style={{borderLeft:`3px solid ${i===0?C.gold:C.dcream}`,padding:"14px 20px",background:i===0?C.lcream:"transparent",transition:"all .3s"}}
                onMouseOver={e=>{e.currentTarget.style.borderLeftColor=C.gold;e.currentTarget.style.background=C.lcream}}
                onMouseOut={e=>{if(i!==0){e.currentTarget.style.borderLeftColor=C.dcream;e.currentTarget.style.background="transparent"}}}>
                <p style={{fontSize:17,fontWeight:600,color:C.char,lineHeight:1.4,fontStyle:"italic"}}>"{p}"</p>
              </div>
            ))}
          </div>
          <p className="dm" style={{fontSize:14,color:C.muted,marginTop:24,lineHeight:1.7}}>If you nodded at even one of these — your marketing isn't broken. It's <strong>unarchitected</strong>. That's what I fix.</p>
        </div>
      </div>
    </section>

    {/* LEAD MAGNET — Hormozi $100M Leads: give away the what/why */}
    <section style={{padding:0}}>
      <div style={{background:C.char,padding:"44px 36px",position:"relative",overflow:"hidden",textAlign:"center"}}>
        <div style={{position:"absolute",top:"-30%",right:"-10%",width:300,height:300,borderRadius:"50%",border:`1px solid rgba(184,134,11,.05)`}}/>
        <div style={{position:"relative",zIndex:1,maxWidth:560,margin:"0 auto"}}>
          <p className="dm" style={{fontSize:9,fontWeight:700,letterSpacing:3,color:C.gold,marginBottom:10}}>FREE DOWNLOAD — NO EMAIL REQUIRED</p>
          <h2 style={{fontSize:"clamp(20px,3vw,28px)",fontWeight:700,color:C.cream,marginBottom:10,lineHeight:1.3}}>Stop Posting. Start Building a Marketing System.</h2>
          <p className="dm" style={{fontSize:13,color:"rgba(250,248,245,.4)",marginBottom:24,lineHeight:1.6}}>The free playbook behind every marketing campaign that actually generates revenue. The 4-Layer System. 2,000+ downloads.</p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <a href="#" onClick={e=>{e.preventDefault();alert("PDF download link goes here")}} className="cp" style={{background:C.cream,color:C.dg}}>⬇ Download Free Playbook</a>
            <a href={mkW("Hi Litsitso, I'd like the free marketing playbook.")} target="_blank" rel="noopener noreferrer" className="co" style={{borderColor:"rgba(250,248,245,.12)",color:"rgba(250,248,245,.5)",fontSize:10}}>Get it on WhatsApp</a>
          </div>
        </div>
      </div>
    </section>

    {/* PHILOSOPHY — from Workbook Differentiation Section 06 */}
    <section style={{padding:"80px 40px",background:C.dg,position:"relative"}} className="mp">
      <div style={{position:"absolute",inset:0,opacity:.02,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.5) 1px,transparent 1px)",backgroundSize:"32px 32px"}}/>
      <div id="phil" data-a className={`ai ${vis.phil?"v":""}`} style={{maxWidth:800,margin:"0 auto",textAlign:"center",position:"relative",zIndex:1}}>
        <p className="sl">What I Believe</p>
        <h2 style={{fontSize:"clamp(22px,3vw,36px)",fontWeight:300,lineHeight:1.5,color:C.cream}}>
          Ambitious professionals who want to turn expertise into authority that attracts revenue should <span style={{fontWeight:700,color:C.gold}}>build positioning systems that compound trust and commercial value</span> — not chase followers and copy recycled playbooks that don't fit their market.
        </h2>
      </div>
    </section>

    {/* SERVICES — Full price, no discount */}
    <section style={{padding:"80px 40px",background:C.white}} className="mp">
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40,flexWrap:"wrap",gap:14}}>
          <div><p className="sl">How We Work Together</p><h2 style={{fontSize:"clamp(24px,3vw,34px)",fontWeight:700,color:C.char}}>Three levels. <span style={{color:C.gold}}>One standard.</span></h2></div>
          <CurTog cur={cur}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:20}}>
          {SERVICES.map((s,i)=>(
            <div key={s.id} id={`sp${i}`} data-a className={`ai d${i+1} ${vis[`sp${i}`]?"v":""}`} style={{background:C.cream,border:`1px solid ${C.dcream}`,padding:"32px 28px",cursor:"pointer",transition:"all .4s",position:"relative",overflow:"hidden"}} onClick={()=>go(s.id)}
              onMouseOver={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 14px 40px rgba(0,0,0,.06)"}}
              onMouseOut={e=>{e.currentTarget.style.borderColor=C.dcream;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
              {s.flagship&&<span style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.dg},${C.gold})`}}/>}
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                <span className="ab">{s.tier}</span>
                {s.flagship&&<span className="dm" style={{fontSize:8,fontWeight:700,letterSpacing:2,background:C.dg,color:C.gold,padding:"3px 8px"}}>FLAGSHIP</span>}
              </div>
              <h3 style={{fontSize:18,fontWeight:700,color:C.char,marginBottom:6}}>{s.tagline}</h3>
              <p className="dm" style={{fontSize:12,lineHeight:1.7,color:C.muted,marginBottom:16}}>{s.short}</p>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                <div><span className="dm" style={{fontSize:22,fontWeight:800,color:C.dg}}>{cur.fmt(s.price)}</span>{s.pricePer&&<span className="dm" style={{fontSize:10,color:C.muted}}>{s.pricePer}</span>}</div>
                <span className="cg" style={{fontSize:9}}>See Details <I.ar/></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* REVIEWS */}
    <Revs vis={vis}/>

    {/* CASE STUDY — Hormozi: highest-converting content type */}
    <section style={{padding:"80px 40px",background:C.white}} className="mp">
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <div id="cs" data-a className={`ai ${vis.cs?"v":""}`}>
          <p className="sl">Proof</p>
          <h2 style={{fontSize:"clamp(22px,3vw,32px)",fontWeight:700,color:C.char,marginBottom:20}}>2,000,000+ views. Zero paid media. <span style={{color:C.gold}}>60 days.</span></h2>
          <p className="dm" style={{fontSize:14,lineHeight:1.8,color:C.body,marginBottom:16}}>A prominent political figure needed to rebuild their digital presence from scratch. They didn't need more content. They needed a system. I designed the complete strategy — audience targeting, content architecture, engagement framework — that generated over 2 million views in 60 days with zero advertising spend.</p>
          <p className="dm" style={{fontSize:14,lineHeight:1.8,color:C.body,marginBottom:28}}>The same systems thinking goes into every engagement. The scale changes. The architecture doesn't.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:14}}>
            {[{n:"2M+",l:"Views in 60 Days"},{n:"R0",l:"Ad Spend"},{n:"248%",l:"Traffic Growth"},{n:"44.4%",l:"Follower Growth"},{n:"171%",l:"Engagement Lift"}].map((s,i)=>(
              <div key={i} style={{textAlign:"center",padding:"20px 12px",background:C.cream,border:`1px solid ${C.dcream}`}}>
                <p style={{fontSize:28,fontWeight:800,color:C.dg}}>{s.n}</p>
                <p className="dm" style={{fontSize:10,color:C.muted,marginTop:3}}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* NEWSLETTER — "The Systems Brief" */}
    <section style={{padding:0}}>
      <div style={{background:`linear-gradient(135deg,${C.dg},${C.gl})`,padding:"48px 36px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:.025,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.5) 1px,transparent 1px)",backgroundSize:"24px 24px"}}/>
        <div style={{position:"relative",zIndex:1,maxWidth:560,margin:"0 auto",textAlign:"center"}}>
          <p className="dm" style={{fontSize:9,fontWeight:700,letterSpacing:3,color:C.gold,marginBottom:8}}>THE SYSTEMS BRIEF</p>
          <h2 style={{fontSize:"clamp(20px,3vw,28px)",fontWeight:700,color:C.cream,marginBottom:8,lineHeight:1.3}}>One strategic insight. Every Tuesday. On your WhatsApp.</h2>
          <p className="dm" style={{fontSize:12,color:"rgba(250,248,245,.35)",marginBottom:22,lineHeight:1.6}}>No fluff. One framework, case study, or breakdown per week you can apply immediately. Join 1,000+ ambitious professionals.</p>
          <a href={mkW("Hi Litsitso, I'd like to join The Systems Brief newsletter.")} target="_blank" rel="noopener noreferrer" className="cp" style={{background:C.cream,color:C.dg}}>Join on WhatsApp →</a>
          <p className="dm" style={{fontSize:9,color:"rgba(250,248,245,.18)",marginTop:12}}>Free. No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{padding:"80px 40px",background:`linear-gradient(135deg,${C.dg},${C.gl})`,textAlign:"center"}} className="mp">
      <div id="cta1" data-a className={`ai ${vis.cta1?"v":""}`}>
        <span className="ab" style={{marginBottom:16,display:"inline-block"}}>BY APPLICATION ONLY</span>
        <h2 style={{fontSize:"clamp(24px,4vw,42px)",fontWeight:700,color:C.cream,maxWidth:620,margin:"14px auto"}}>The right 500 people will build your business.<br/>The wrong 50,000 won't.</h2>
        <p className="dm" style={{fontSize:14,color:"rgba(250,248,245,.4)",maxWidth:460,margin:"0 auto 28px",lineHeight:1.7}}>I work with select clients who understand that marketing without systems is just expensive noise.</p>
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <a href={mkE("Application","Hi Litsitso,\n\nI'd like to apply.\n\nBusiness:\nChallenge:\nWhat would change if your marketing actually worked?\n")} className="cp">Apply via Email <I.em/></a>
          <a href={mkW("Hi Litsitso, I'd like to apply to work with you. My business is [name] and my biggest marketing frustration is [describe].")} target="_blank" rel="noopener noreferrer" className="co" style={{borderColor:"rgba(250,248,245,.2)",color:C.cream}}>WhatsApp <I.wa/></a>
        </div>
      </div>
    </section>

    {/* BLOG PREVIEW */}
    <section style={{padding:"80px 40px",background:C.cream}} className="mp">
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:36,flexWrap:"wrap",gap:14}}>
          <div><p className="sl">Latest Thinking</p><h2 style={{fontSize:"clamp(22px,3vw,32px)",fontWeight:700,color:C.char}}>From the desk.</h2></div>
          <button className="cg" onClick={()=>nav("blog")}>All Insights <I.ar/></button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:18}}>
          {BLOG_POSTS.slice(0,3).map((p,i)=><BC key={p.id} p={p} i={i} vis={vis}/>)}
        </div>
      </div>
    </section>
  </>);
}

// ═══════ REVIEWS ═══════
function Revs({vis}){return(
  <section style={{padding:"80px 40px",background:C.lcream}} className="mp">
    <div style={{maxWidth:1200,margin:"0 auto"}}>
      <p className="sl">What People Say</p>
      <h2 style={{fontSize:"clamp(22px,3vw,32px)",fontWeight:700,color:C.char,marginBottom:32}}>Words from people who've <span style={{color:C.gold}}>seen the work.</span></h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16}}>
        {REVIEWS.map((r,i)=>(
          <div key={i} id={`rv${i}`} data-a className={`ai d${i+1} ${vis[`rv${i}`]?"v":""}`} style={{background:C.white,border:`1px solid ${C.dcream}`,padding:"26px 22px",position:"relative"}}>
            <div style={{position:"absolute",top:14,right:18}}><I.qt/></div>
            <div style={{display:"flex",gap:2,marginBottom:10}}>{[...Array(r.rating)].map((_,j)=><span key={j} style={{color:C.gold}}><I.star/></span>)}</div>
            <p className="dm" style={{fontSize:13,lineHeight:1.7,color:C.body,marginBottom:16,fontStyle:"italic"}}>"{r.text}"</p>
            <p className="dm" style={{fontSize:12,fontWeight:700,color:C.char}}>{r.name}</p>
            <p className="dm" style={{fontSize:10,color:C.muted,lineHeight:1.3}}>{r.role}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)}

// ═══════ SERVICE LANDING — WITH countdown + discount ═══════
function SvcLand({s,back,cur,vis}){
  const{tl,exp}=useCD(s.id);const show=!exp;
  return(<>
    <section style={{background:`linear-gradient(165deg,${C.gd},${C.dg})`,padding:"125px 40px 50px"}} className="mp">
      <div style={{maxWidth:860,margin:"0 auto"}}>
        <button onClick={back} className="cg" style={{color:C.cream,marginBottom:18,opacity:.4}}><I.bk/> Back</button>
        <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:14,flexWrap:"wrap"}}>
          <span className="ab">{s.tier}</span>
          {s.flagship&&<span className="dm" style={{fontSize:8,fontWeight:700,letterSpacing:2,background:C.gold,color:C.char,padding:"3px 8px"}}>FLAGSHIP</span>}
        </div>
        <h1 style={{fontSize:"clamp(30px,4.5vw,50px)",fontWeight:800,color:C.cream,lineHeight:1.1,marginBottom:10}}>{s.headline}</h1>
        <p style={{fontSize:"clamp(18px,2.5vw,24px)",fontWeight:300,color:C.gold,marginBottom:20,lineHeight:1.4}}>{s.subhead}</p>
        <p className="dm" style={{fontSize:15,color:"rgba(250,248,245,.45)",maxWidth:580,lineHeight:1.7}}>{s.desc}</p>
      </div>
    </section>

    <Timer id={s.id}/>

    <section style={{padding:"44px 40px 80px",background:C.cream}} className="mp">
      <div style={{maxWidth:860,margin:"0 auto"}}>
        {/* PAIN POINT CALLOUT */}
        <div style={{borderLeft:`3px solid ${C.red}`,padding:"16px 20px",marginBottom:28,background:"#FDF5F4"}}>
          <p className="dm" style={{fontSize:10,fontWeight:700,letterSpacing:2,color:C.red,marginBottom:4,textTransform:"uppercase"}}>If This Is You</p>
          <p className="dm" style={{fontSize:14,lineHeight:1.6,color:C.body,fontStyle:"italic"}}>"{s.painPoint}"</p>
        </div>

        {/* PRICING */}
        <div id="pr" data-a className={`ai ${vis.pr?"v":""}`} style={{background:C.white,border:`1px solid ${C.dcream}`,padding:"32px 28px",marginBottom:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:14}}>
            <div>
              <p className="sl" style={{marginBottom:4}}>Investment</p>
              {show&&<p className="dm" style={{textDecoration:"line-through",opacity:.4,fontSize:14}}>{cur.fmt(s.price)}{s.pricePer||""}</p>}
              <p className="dm" style={{fontSize:32,fontWeight:800,color:C.dg,lineHeight:1}}>{cur.fmt(show?s.discountPrice:s.price)}{s.pricePer||""}</p>
              {show&&<p className="dm" style={{fontSize:11,color:C.red,fontWeight:700,marginTop:4}}>SAVE {cur.fmt(s.price-s.discountPrice)} — Launch pricing</p>}
              {!show&&<p className="dm" style={{fontSize:11,color:C.muted,marginTop:4}}>Standard pricing</p>}
            </div>
            <CurTog cur={cur}/>
          </div>
          <p className="dm" style={{fontSize:11,color:C.muted,marginTop:12}}>Delivery: {s.delivery}</p>
        </div>

        {/* INCLUDES */}
        <div id="inc" data-a className={`ai d1 ${vis.inc?"v":""}`} style={{background:C.white,border:`1px solid ${C.dcream}`,padding:"32px 28px",marginBottom:24}}>
          <p className="sl" style={{marginBottom:14}}>What You Get</p>
          {s.includes.map((item,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"9px 0",borderBottom:i<s.includes.length-1?`1px solid ${C.dcream}`:"none"}}><span style={{color:C.gold,marginTop:2,flexShrink:0}}><I.ck/></span><p className="dm" style={{fontSize:13,color:C.body,lineHeight:1.5}}>{item}</p></div>)}
        </div>

        {/* IDEAL FOR */}
        <div id="idl" data-a className={`ai d2 ${vis.idl?"v":""}`} style={{borderLeft:`3px solid ${C.gold}`,padding:"18px 22px",marginBottom:24,background:C.lcream}}>
          <p className="dm" style={{fontSize:10,fontWeight:700,letterSpacing:2,color:C.gold,marginBottom:5,textTransform:"uppercase"}}>Built For</p>
          <p className="dm" style={{fontSize:14,lineHeight:1.7,color:C.body}}>{s.ideal}</p>
        </div>

        {/* HORMOZI BONUS STACK */}
        <div style={{background:C.white,border:`1px solid ${C.dcream}`,padding:"28px 24px",marginBottom:24}}>
          <p className="dm" style={{fontSize:10,fontWeight:700,letterSpacing:2,color:C.gold,marginBottom:14,textTransform:"uppercase"}}>Bonuses Included Free</p>
          {[
            {t:"Brand Revenue Audit Template",v:"R2,500 value",d:"The same diagnostic I use on every business. Yours to keep and reuse."},
            {t:"Content Pillar Cheat Sheet",v:"R1,500 value",d:"Plug-and-play framework for what to post, when, and why."},
            {t:"Competitor Intelligence Map",v:"R2,000 value",d:"See exactly what your competitors are doing — and the gaps they're missing."},
          ].map((b,i)=>(
            <div key={i} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:i<2?`1px solid ${C.dcream}`:"none"}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:C.dg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:C.gold,marginTop:2}}><I.ck/></div>
              <div>
                <p className="dm" style={{fontSize:13,fontWeight:700,color:C.char}}>{b.t} <span style={{color:C.gold,fontWeight:600}}>({b.v})</span></p>
                <p className="dm" style={{fontSize:12,color:C.muted,marginTop:2}}>{b.d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* HORMOZI GUARANTEE */}
        <div style={{border:`2px solid ${C.gold}`,padding:"24px 22px",marginBottom:32,background:"rgba(184,134,11,.02)",position:"relative"}}>
          <div style={{position:"absolute",top:-11,left:18,background:C.cream,padding:"0 8px"}}><span style={{color:C.gold,fontSize:14}}>✦</span></div>
          <p className="dm" style={{fontSize:10,fontWeight:700,letterSpacing:2,color:C.gold,marginBottom:8,textTransform:"uppercase"}}>The Guarantee</p>
          <p className="dm" style={{fontSize:14,lineHeight:1.7,color:C.body}}>If you implement the strategy and don't see measurable improvement in your marketing clarity, positioning, and lead quality within the engagement period — I'll extend the engagement at no additional cost until you do. I don't take money for work that doesn't move needles.</p>
        </div>

        {/* CTA */}
        <div id="sc" data-a className={`ai d3 ${vis.sc?"v":""}`} style={{background:C.dg,padding:"40px 28px",textAlign:"center"}}>
          <span className="ab" style={{marginBottom:12,display:"inline-block"}}>BY APPLICATION ONLY</span>
          <h3 style={{fontSize:22,fontWeight:700,color:C.cream,marginBottom:8}}>Ready?</h3>
          <p className="dm" style={{fontSize:12,color:"rgba(250,248,245,.35)",marginBottom:22,maxWidth:380,margin:"0 auto 22px"}}>Apply below. I review every submission personally and respond within 24 hours.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <a href={mkE(s.eSubj,s.eBody)} className="cp">Apply via Email <I.em/></a>
            <a href={mkW(s.wMsg)} target="_blank" rel="noopener noreferrer" className="co" style={{borderColor:"rgba(250,248,245,.2)",color:C.cream}}>WhatsApp <I.wa/></a>
          </div>
          <button className="cg" style={{color:"rgba(250,248,245,.25)",fontSize:9,marginTop:18}} onClick={()=>alert("Calendly coming soon.")}><I.cal/> Or book a call first</button>
        </div>
      </div>
    </section>
  </>);
}

// ═══════ SERVICES INDEX ═══════
function Svcs({vis,cur,go}){return(<>
  <section style={{background:`linear-gradient(165deg,${C.gd},${C.dg})`,padding:"145px 40px 65px"}} className="mp">
    <div style={{maxWidth:1200,margin:"0 auto"}}>
      <p className="dm" style={{fontSize:11,fontWeight:700,letterSpacing:4,color:C.gold,marginBottom:16}}>WORK WITH ME</p>
      <h1 style={{fontSize:"clamp(34px,5vw,54px)",fontWeight:800,color:C.cream,lineHeight:1.1,maxWidth:650}}>Not everyone qualifies.<br/><span style={{color:C.gold}}>That's the point.</span></h1>
      <p className="dm" style={{fontSize:15,color:"rgba(250,248,245,.4)",maxWidth:500,lineHeight:1.7,marginTop:16}}>I work with businesses that understand marketing is revenue infrastructure — not a line item to minimize.</p>
    </div>
  </section>
  <section style={{padding:"44px 40px 80px",background:C.cream}} className="mp">
    <div style={{maxWidth:1200,margin:"0 auto"}}>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:24}}><CurTog cur={cur}/></div>
      <div style={{display:"grid",gap:18}}>
        {SERVICES.map((s,i)=>(
          <div key={s.id} id={`sv${i}`} data-a className={`ai d${i+1} ${vis[`sv${i}`]?"v":""}`} style={{background:C.white,border:`1px solid ${C.dcream}`,padding:"32px 28px",cursor:"pointer",transition:"all .4s",position:"relative",overflow:"hidden"}} onClick={()=>go(s.id)}
            onMouseOver={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 32px rgba(0,0,0,.05)"}}
            onMouseOut={e=>{e.currentTarget.style.borderColor=C.dcream;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
            {s.flagship&&<span style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.dg},${C.gold})`}}/>}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:14}}>
              <div style={{flex:1,minWidth:240}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}><span className="ab">{s.tier}</span>{s.flagship&&<span className="dm" style={{fontSize:8,fontWeight:700,letterSpacing:2,background:C.dg,color:C.gold,padding:"3px 8px"}}>FLAGSHIP</span>}</div>
                <h3 style={{fontSize:20,fontWeight:700,color:C.char,marginBottom:4}}>{s.tagline}</h3>
                <p className="dm" style={{fontSize:12,lineHeight:1.7,color:C.muted}}>{s.short}</p>
              </div>
              <div style={{textAlign:"right"}}>
                <p className="dm" style={{fontSize:24,fontWeight:800,color:C.dg}}>{cur.fmt(s.price)}</p>
                {s.pricePer&&<p className="dm" style={{fontSize:10,color:C.muted}}>{s.pricePer}</p>}
                <span className="cg" style={{fontSize:9,marginTop:6}}>Details <I.ar/></span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="bk" data-a className={`ai ${vis.bk?"v":""}`} style={{marginTop:32,background:C.char,padding:"36px 24px",textAlign:"center"}}>
        <h3 style={{fontSize:20,fontWeight:700,color:C.cream,marginBottom:6}}>Not sure which level?</h3>
        <p className="dm" style={{fontSize:13,color:"rgba(250,248,245,.3)",marginBottom:20}}>Book a strategy call. We'll figure out where the leak is.</p>
        <button className="cp" onClick={()=>alert("Calendly coming soon.")}><I.cal/> Book a Call</button>
      </div>
    </div>
  </section>
</>)}

// ═══════ ABOUT ═══════
function About({vis,nav}){return(<>
  <section style={{minHeight:"55vh",background:`linear-gradient(165deg,${C.gd},${C.dg})`,display:"flex",alignItems:"flex-end"}}>
    <div style={{maxWidth:1200,margin:"0 auto",padding:"145px 40px 55px",width:"100%"}} className="mp">
      <p className="dm" style={{fontSize:11,fontWeight:700,letterSpacing:4,color:C.gold,marginBottom:16}}>ABOUT</p>
      <h1 style={{fontSize:"clamp(34px,5vw,54px)",fontWeight:800,color:C.cream,lineHeight:1.1}}>The strategist behind<br/>the <span style={{color:C.gold}}>systems.</span></h1>
    </div>
  </section>
  <section style={{padding:"70px 40px",background:C.cream}} className="mp">
    <div style={{maxWidth:720,margin:"0 auto"}}>
      <div id="a1" data-a className={`ai ${vis.a1?"v":""}`}>
        <p className="sl">In Short</p>
        <h2 style={{fontSize:26,fontWeight:700,color:C.char,marginBottom:22}}>I don't do marketing. I build the systems that make marketing generate revenue.</h2>
        <p style={{fontSize:15,lineHeight:1.8,color:C.body,marginBottom:16}}>I'm Litsitso Sibolla. I build marketing infrastructure for ambitious organizations — brand positioning systems, campaign architecture, content ecosystems, and revenue conversion frameworks. With 5+ years and 20+ organizations, I've driven 171% engagement increases, 2M+ social views in 60 days, 248% traffic growth, and 44.4% audience growth in 3 months. Not through guesswork. Through architecture.</p>
        <p style={{fontSize:15,lineHeight:1.8,color:C.body,marginBottom:16}}>I think about marketing the way a CFO thinks about capital allocation. Every activity should connect to revenue. Every piece of content should compound. Every brand touchpoint should build trust that converts. If it doesn't connect to money, it's not strategy — it's entertainment.</p>
        <p style={{fontSize:15,lineHeight:1.8,color:C.body,marginBottom:16}}>I chose to build from Maseru. Not because I'm stuck here — because you can operate at a high strategic level from anywhere on the continent if your thinking is sharp enough. Lesotho is the proof of concept.</p>
      </div>
      <div style={{borderLeft:`3px solid ${C.gold}`,padding:"16px 22px",margin:"28px 0",background:C.lcream}}>
        <p style={{fontSize:17,fontStyle:"italic",lineHeight:1.6,color:C.char}}>"He is not chasing money. He is chasing mastery... and when a person commits to mastery, money eventually learns how to chase them."</p>
        <p className="dm" style={{fontSize:11,color:C.muted,marginTop:6}}>— Adv. Mary Mathaothe Bosiu</p>
      </div>
      <div id="a2" data-a className={`ai ${vis.a2?"v":""}`}>
        <p className="sl" style={{marginTop:36}}>The Deeper Mission</p>
        <h3 style={{fontSize:20,fontWeight:700,color:C.char,marginBottom:12}}>Re Bontšá Lesotho — Show Us Lesotho</h3>
        <p style={{fontSize:15,lineHeight:1.8,color:C.body,marginBottom:28}}>I chose to build from Maseru. Not because I'm stuck — because you can operate at a high strategic level from anywhere if your thinking is sharp enough. Lesotho is the proof of concept. Proudly Mosotho. Building from here with zero apology.</p>
      </div>
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        <button className="cp" onClick={()=>nav("services")}>See How We Work Together <I.ar/></button>
        <a href={mkE("Inquiry","Hi Litsitso, I'd like to connect.\n\n")} className="co">Get in Touch <I.em/></a>
      </div>
    </div>
  </section>
</>)}

// ═══════ BLOG ═══════
function BC({p,i,vis}){return(
  <div id={`bl${p.id}`} data-a className={`ai d${Math.min(i+1,4)} ${vis[`bl${p.id}`]?"v":""}`} style={{background:C.white,border:`1px solid ${C.dcream}`,padding:"26px 22px",transition:"all .4s",cursor:"pointer"}}
    onMouseOver={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 10px 28px rgba(0,0,0,.05)"}}
    onMouseOut={e=>{e.currentTarget.style.borderColor=C.dcream;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
    <p className="dm" style={{fontSize:9,fontWeight:700,letterSpacing:2,color:C.gold,marginBottom:8}}>{p.cat}</p>
    <h3 style={{fontSize:16,fontWeight:700,color:C.char,marginBottom:7,lineHeight:1.3}}>{p.title}</h3>
    <p className="dm" style={{fontSize:12,lineHeight:1.7,color:C.muted,marginBottom:12}}>{p.excerpt}</p>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span className="dm" style={{fontSize:10,color:C.muted}}>{p.date} · {p.time}</span>
      <span className="cg" style={{fontSize:9}}>Read <I.ar/></span>
    </div>
  </div>
)}
function Blog({vis}){const[f,setF]=useState("ALL");const cats=["ALL",...new Set(BLOG_POSTS.map(p=>p.cat))];const fil=f==="ALL"?BLOG_POSTS:BLOG_POSTS.filter(p=>p.cat===f);return(<>
  <section style={{background:`linear-gradient(165deg,${C.gd},${C.dg})`,padding:"145px 40px 65px"}} className="mp"><div style={{maxWidth:1200,margin:"0 auto"}}><p className="dm" style={{fontSize:11,fontWeight:700,letterSpacing:4,color:C.gold,marginBottom:16}}>INSIGHTS</p><h1 style={{fontSize:"clamp(34px,5vw,54px)",fontWeight:800,color:C.cream,lineHeight:1.1}}>Strategic thinking,<br/><span style={{color:C.gold}}>shared openly.</span></h1><p className="dm" style={{fontSize:15,color:"rgba(250,248,245,.4)",maxWidth:480,lineHeight:1.7,marginTop:14}}>I give away the what and the why. The how — applied to your business — is what you pay for.</p></div></section>
  <section style={{padding:"40px 40px 80px",background:C.cream}} className="mp"><div style={{maxWidth:1200,margin:"0 auto"}}>
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:32}}>{cats.map(c=><button key={c} onClick={()=>setF(c)} className="dm" style={{fontSize:9,fontWeight:700,letterSpacing:1.5,padding:"7px 14px",cursor:"pointer",textTransform:"uppercase",transition:"all .3s",background:f===c?C.dg:"transparent",color:f===c?C.cream:C.muted,border:`1px solid ${f===c?C.dg:C.dcream}`}}>{c}</button>)}</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:16}}>{fil.map((p,i)=><BC key={p.id} p={p} i={i} vis={vis}/>)}</div>
  </div></section>
</>)}

// ═══════ MEDIA ═══════
function Media({vis}){return(<>
  <section style={{background:`linear-gradient(165deg,${C.gd},${C.dg})`,padding:"145px 40px 65px"}} className="mp"><div style={{maxWidth:1200,margin:"0 auto"}}><p className="dm" style={{fontSize:11,fontWeight:700,letterSpacing:4,color:C.gold,marginBottom:16}}>MEDIA</p><h1 style={{fontSize:"clamp(34px,5vw,54px)",fontWeight:800,color:C.cream,lineHeight:1.1}}>Strategy sessions.<br/><span style={{color:C.gold}}>Unfiltered.</span></h1></div></section>
  <section style={{padding:"44px 40px 80px",background:C.cream}} className="mp"><div style={{maxWidth:1200,margin:"0 auto"}}>
    <div id="vf" data-a className={`ai ${vis.vf?"v":""}`} style={{background:C.char,marginBottom:24,cursor:"pointer",transition:"all .4s"}} onMouseOver={e=>e.currentTarget.style.boxShadow="0 12px 36px rgba(0,0,0,.12)"} onMouseOut={e=>e.currentTarget.style.boxShadow="none"}>
      <div style={{display:"flex",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 340px",minHeight:240,background:C.gd,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}><div style={{width:60,height:60,borderRadius:"50%",background:"rgba(184,134,11,.9)",display:"flex",alignItems:"center",justifyContent:"center",color:C.char}}><I.pl/></div><p className="dm" style={{position:"absolute",bottom:10,left:14,fontSize:9,fontWeight:700,letterSpacing:2,color:C.gold}}>LATEST</p></div>
        <div style={{flex:"1 1 340px",padding:"32px 28px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <p className="dm" style={{fontSize:9,fontWeight:700,letterSpacing:2,color:C.gold,marginBottom:8}}>STRATEGY DEEP DIVES</p>
          <h3 style={{fontSize:20,fontWeight:700,color:C.cream,marginBottom:8,lineHeight:1.3}}>{EPISODES[0].title}</h3>
          <p className="dm" style={{fontSize:12,lineHeight:1.7,color:"rgba(250,248,245,.4)",marginBottom:12}}>{EPISODES[0].desc}</p>
          <span className="cg">Watch Now <I.pl/></span>
        </div>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16}}>
      {EPISODES.slice(1).map((ep,i)=>(
        <div key={ep.id} id={`ep${i}`} data-a className={`ai d${i+1} ${vis[`ep${i}`]?"v":""}`} style={{background:C.white,border:`1px solid ${C.dcream}`,padding:"22px 18px",transition:"all .4s",cursor:"pointer"}} onMouseOver={e=>{e.currentTarget.style.borderColor=C.gold}} onMouseOut={e=>{e.currentTarget.style.borderColor=C.dcream}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span className="dm" style={{fontSize:8,fontWeight:700,letterSpacing:2,color:ep.type==="VIDEO"?C.gold:C.dg,padding:"2px 6px",border:`1px solid ${ep.type==="VIDEO"?C.gold:C.dg}`}}>{ep.type}</span><span className="dm" style={{fontSize:10,color:C.muted}}>{ep.dur}</span></div>
          <h4 style={{fontSize:15,fontWeight:700,color:C.char,marginBottom:4,lineHeight:1.3}}>{ep.title}</h4>
          <p className="dm" style={{fontSize:11,lineHeight:1.7,color:C.muted,marginBottom:8}}>{ep.desc}</p>
          <span className="cg" style={{fontSize:9}}>{ep.type==="VIDEO"?"Watch":"Listen"} <I.pl/></span>
        </div>
      ))}
    </div>
  </div></section>
</>)}

// ═══════ CONTACT ═══════
function Ctct({vis}){return(<>
  <section style={{background:`linear-gradient(165deg,${C.gd},${C.dg})`,padding:"145px 40px 65px"}} className="mp"><div style={{maxWidth:1200,margin:"0 auto"}}><p className="dm" style={{fontSize:11,fontWeight:700,letterSpacing:4,color:C.gold,marginBottom:16}}>CONTACT</p><h1 style={{fontSize:"clamp(34px,5vw,54px)",fontWeight:800,color:C.cream,lineHeight:1.1}}>Let's talk <span style={{color:C.gold}}>strategy.</span></h1></div></section>
  <section style={{padding:"44px 40px 80px",background:C.cream}} className="mp"><div style={{maxWidth:840,margin:"0 auto"}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:24}}>
      <div id="c1" data-a className={`ai ${vis.c1?"v":""}`} style={{background:C.dg,padding:32}}>
        <span className="ab" style={{marginBottom:14,display:"inline-block"}}>BY APPLICATION</span>
        <h3 style={{fontSize:20,fontWeight:700,color:C.cream,marginBottom:8}}>Work With Me</h3>
        <p className="dm" style={{fontSize:12,lineHeight:1.7,color:"rgba(250,248,245,.35)",marginBottom:22}}>Apply with your business details, challenge, and what success looks like.</p>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <a href={mkE("Application","Hi Litsitso,\n\nBusiness:\nIndustry:\nChallenge:\nWhat would change if your marketing actually worked?\n")} className="cp" style={{justifyContent:"center"}}>Apply via Email <I.em/></a>
          <a href={mkW("Hi Litsitso, I'd like to apply. Business: [name], challenge: [describe].")} target="_blank" rel="noopener noreferrer" className="co" style={{justifyContent:"center",color:C.cream,borderColor:"rgba(250,248,245,.2)"}}>WhatsApp <I.wa/></a>
        </div>
      </div>
      <div id="c2" data-a className={`ai d1 ${vis.c2?"v":""}`} style={{background:C.white,border:`1px solid ${C.dcream}`,padding:32}}>
        <h3 style={{fontSize:20,fontWeight:700,color:C.char,marginBottom:8}}>General Inquiry</h3>
        <p className="dm" style={{fontSize:12,lineHeight:1.7,color:C.muted,marginBottom:22}}>Questions, collaborations, speaking, or just want to connect.</p>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:18}}>
          <a href={mkE("Inquiry","Hi Litsitso, I'd like to connect.\n\n")} className="cp" style={{justifyContent:"center",background:C.char,color:C.cream}}>Email <I.em/></a>
          <a href={mkW("Hi Litsitso, I'd like to connect.")} target="_blank" rel="noopener noreferrer" className="co" style={{justifyContent:"center",borderColor:C.char,color:C.char}}>WhatsApp <I.wa/></a>
        </div>
        <div style={{borderTop:`1px solid ${C.dcream}`,paddingTop:14,display:"flex",gap:10,justifyContent:"center"}}>
          <a href={LI} target="_blank" rel="noopener noreferrer" className="si" style={{color:C.char,borderColor:C.dcream}}><I.li/></a>
          <a href={FB} target="_blank" rel="noopener noreferrer" className="si" style={{color:C.char,borderColor:C.dcream}}><I.fb/></a>
        </div>
      </div>
    </div>
    <div id="c3" data-a className={`ai d2 ${vis.c3?"v":""}`} style={{marginTop:24,background:C.char,padding:"32px 24px",textAlign:"center"}}>
      <h3 style={{fontSize:18,fontWeight:700,color:C.cream,marginBottom:6}}>Book a Strategy Call</h3>
      <p className="dm" style={{fontSize:12,color:"rgba(250,248,245,.25)",marginBottom:18}}>30 minutes. We find the leak. You decide what to do about it.</p>
      <button className="cp" onClick={()=>alert("Calendly coming soon.")}><I.cal/> Schedule</button>
    </div>
  </div></section>
</>)}
