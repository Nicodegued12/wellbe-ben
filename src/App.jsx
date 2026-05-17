import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, Video, MessageSquare, Users, BarChart2, Bell, Search, ChevronRight, Star, Shield, Clock, FileText, DollarSign, Activity, Plus, ArrowRight, Check, Heart, LogOut, Upload, Eye, User, Home, Settings, X, Menu, Phone, CheckCircle, Stethoscope, Mic, MicOff, VideoOff, PhoneOff, TrendingUp, AlertCircle, ChevronDown } from "lucide-react";

const C = {
  teal:"#0B5E5E", tealL:"#E0F5F0", tealM:"#1D9E85", tealD:"#083E3E",
  amber:"#E8960A", amberL:"#FEF3DC", amberD:"#9A6200",
  green:"#22C55E", greenL:"#DCFCE7",
  red:"#E24B4A", redL:"#FEECEC",
  bg:"#F2FAF7", white:"#FFFFFF",
  text:"#0D2424", textS:"#3A5C5C", border:"#A8DDD0",
  grad:"linear-gradient(135deg,#0B5E5E 0%,#1D9E85 100%)",
};

const S = {
  card:{ background:C.white, borderRadius:16, border:`1px solid ${C.border}`, padding:"1.25rem" },
  btn:{ background:C.grad, color:"#fff", border:"none", borderRadius:10, padding:"10px 22px", fontWeight:700, fontSize:14, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:8 },
  btnOut:{ background:"transparent", color:C.teal, border:`2px solid ${C.teal}`, borderRadius:10, padding:"9px 20px", fontWeight:700, fontSize:14, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:8 },
  input:{ width:"100%", padding:"11px 14px", borderRadius:10, border:`1.5px solid ${C.border}`, fontSize:14, outline:"none", boxSizing:"border-box", background:C.bg },
  label:{ fontSize:13, fontWeight:600, color:C.textS, marginBottom:4, display:"block" },
  pageTitle:{ fontSize:22, fontWeight:800, color:C.text, margin:"0 0 4px" },
  sub:{ fontSize:14, color:C.textS, margin:"0 0 24px" },
};

const DOCTORS = [
  {id:1,name:"Dr. Amina Konaté",spec:"Cardiologue",rating:4.9,price:15000,avatar:"AK",dispo:true,exp:"12 ans",patients:340},
  {id:2,name:"Dr. Jean-Marie Diallo",spec:"Pédiatre",rating:4.8,price:12000,avatar:"JD",dispo:true,exp:"8 ans",patients:280},
  {id:3,name:"Dr. Fatoumata Traoré",spec:"Gynécologue",rating:4.7,price:18000,avatar:"FT",dispo:false,exp:"15 ans",patients:410},
  {id:4,name:"Dr. Seydou Coulibaly",spec:"Généraliste",rating:4.6,price:8000,avatar:"SC",dispo:true,exp:"6 ans",patients:195},
];
const APPOINTMENTS = [
  {id:1,doctor:"Dr. Amina Konaté",spec:"Cardiologue",date:"18 Mai 2026",time:"09:00",status:"confirmé",avatar:"AK"},
  {id:2,doctor:"Dr. Jean-Marie Diallo",spec:"Pédiatre",date:"20 Mai 2026",time:"14:30",status:"en attente",avatar:"JD"},
];
const MESSAGES = [
  {id:1,from:"Dr. Amina Konaté",avatar:"AK",msg:"Bonjour, n'oubliez pas de prendre votre traitement ce soir.",time:"10h12",unread:true},
  {id:2,from:"Dr. Seydou Coulibaly",avatar:"SC",msg:"Vos résultats d'analyses sont prêts.",time:"Hier",unread:false},
];
const REV_DATA = [{m:"Jan",v:145},{m:"Fév",v:189},{m:"Mar",v:210},{m:"Avr",v:178},{m:"Mai",v:234}];
const CONSULT_DATA = [{m:"Jan",v:32},{m:"Fév",v:41},{m:"Mar",v:38},{m:"Avr",v:55},{m:"Mai",v:62}];
const SPECS = ["Tous","Généraliste","Cardiologue","Pédiatre","Gynécologue","Dermatologue","ORL"];

// ─── ATOMS ───────────────────────────────────────────────────────────────────
const Av = ({i,size=40,bg=C.tealL,c=C.tealD})=>(
  <div style={{width:size,height:size,borderRadius:"50%",background:bg,color:c,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:size*.32,flexShrink:0}}>{i}</div>
);
const Bdg = ({children,bg=C.tealL,c=C.tealD})=>(
  <span style={{background:bg,color:c,borderRadius:20,padding:"3px 12px",fontSize:12,fontWeight:700,whiteSpace:"nowrap"}}>{children}</span>
);
const Stat = ({icon,label,value,color=C.teal,bg=C.tealL})=>(
  <div style={{...S.card,display:"flex",alignItems:"center",gap:14}}>
    <div style={{width:48,height:48,borderRadius:14,background:bg,display:"flex",alignItems:"center",justifyContent:"center",color}}>{icon}</div>
    <div><div style={{fontSize:22,fontWeight:800,color:C.text}}>{value}</div><div style={{fontSize:13,color:C.textS}}>{label}</div></div>
  </div>
);

// ─── TOP NAV (dashboards) ────────────────────────────────────────────────────
function TopNav({role,page,setPage,setRole}){
  const roleLabel = role==="patient"?"Patient":role==="doctor"?"Médecin":"Administrateur";
  const initials = role==="patient"?"KD":role==="doctor"?"AK":"AD";
  return(
    <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"0 24px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:34,height:34,borderRadius:10,background:C.grad,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Heart size={18} color="#fff" fill="#fff"/>
        </div>
        <span style={{fontWeight:900,fontSize:18,color:C.tealD,letterSpacing:-0.5}}>WELBE<span style={{color:C.amber}}>-BEN</span></span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:16}}>
        <div style={{position:"relative"}}>
          <Bell size={20} color={C.textS}/>
          <div style={{position:"absolute",top:-2,right:-2,width:8,height:8,borderRadius:"50%",background:C.red}}/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <Av i={initials} size={34}/>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:C.text}}>{roleLabel}</div>
            <div style={{fontSize:11,color:C.textS,cursor:"pointer"}} onClick={()=>setRole(null)}>← Changer</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({items,active,setActive}){
  return(
    <div style={{width:220,background:C.white,borderRight:`1px solid ${C.border}`,padding:"20px 12px",display:"flex",flexDirection:"column",gap:4,minHeight:"calc(100vh - 60px)"}}>
      {items.map(it=>(
        <button key={it.id} onClick={()=>setActive(it.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:10,border:"none",cursor:"pointer",background:active===it.id?C.tealL:"transparent",color:active===it.id?C.tealD:C.textS,fontWeight:active===it.id?700:500,fontSize:14,textAlign:"left",transition:"all .15s"}}>
          {it.icon}{it.label}
          {it.badge&&<span style={{marginLeft:"auto",background:C.red,color:"#fff",borderRadius:20,padding:"1px 7px",fontSize:11,fontWeight:700}}>{it.badge}</span>}
        </button>
      ))}
      <div style={{marginTop:"auto"}}>
        <div style={{height:1,background:C.border,margin:"12px 0"}}/>
        <div style={{padding:"10px 14px",fontSize:13,color:C.textS,display:"flex",alignItems:"center",gap:8}}><Settings size={16}/>Paramètres</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 1 : LANDING
// ══════════════════════════════════════════════════════════════════════════════
function Landing({setRole}){
  const [faqOpen,setFaqOpen]=useState(null);
  const [form,setForm]=useState({nom:"",email:"",type:"patient"});
  const [submitted,setSubmitted]=useState(false);
  const faqs=[
    {q:"Comment fonctionne une consultation vidéo ?",a:"Après prise de rendez-vous, vous recevez un lien sécurisé. Le médecin vous rejoint à l'heure convenue via notre salle vidéo intégrée."},
    {q:"Quels modes de paiement sont acceptés ?",a:"Nous acceptons Orange Money, Wave, MTN Mobile Money et les cartes bancaires."},
    {q:"Mes données médicales sont-elles sécurisées ?",a:"Oui. Toutes les données sont chiffrées et hébergées conformément aux normes médicales internationales."},
    {q:"Comment les médecins sont-ils vérifiés ?",a:"Chaque médecin soumet son diplôme et ses certifications. Notre équipe les vérifie avant activation du compte."},
  ];
  return(
    <div style={{background:C.bg,minHeight:"100vh",fontFamily:"system-ui,sans-serif"}}>
      {/* Navbar */}
      <nav style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"0 5%",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:38,height:38,borderRadius:12,background:C.grad,display:"flex",alignItems:"center",justifyContent:"center"}}><Heart size={20} color="#fff" fill="#fff"/></div>
          <span style={{fontWeight:900,fontSize:22,color:C.tealD,letterSpacing:-1}}>WELBE<span style={{color:C.amber}}>-BEN</span></span>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button style={S.btnOut} onClick={()=>setRole("auth")}>Se connecter</button>
          <button style={S.btn} onClick={()=>setRole("auth")}><Plus size={16}/>S'inscrire</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{background:C.grad,padding:"80px 5% 90px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-80,right:-80,width:400,height:400,borderRadius:"50%",background:"rgba(255,255,255,.06)"}}/>
        <div style={{position:"absolute",bottom:-60,left:"40%",width:300,height:300,borderRadius:"50%",background:"rgba(255,255,255,.04)"}}/>
        <div style={{maxWidth:680,position:"relative"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.15)",borderRadius:20,padding:"6px 16px",marginBottom:24}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:C.amber}}/><span style={{color:"#fff",fontSize:13,fontWeight:600}}>Plateforme de télémédecine #1 en Afrique de l'Ouest</span>
          </div>
          <h1 style={{fontSize:"clamp(32px,5vw,52px)",fontWeight:900,color:"#fff",lineHeight:1.1,margin:"0 0 20px",letterSpacing:-1}}>Votre santé,<br/><span style={{color:C.amber}}>partout, à portée.</span></h1>
          <p style={{fontSize:17,color:"rgba(255,255,255,.85)",lineHeight:1.7,margin:"0 0 36px",maxWidth:520}}>Consultez les meilleurs médecins spécialistes en vidéo, obtenez vos ordonnances en ligne et payez via Mobile Money — en quelques minutes.</p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <button style={{...S.btn,background:C.amber,padding:"14px 28px",fontSize:16}} onClick={()=>setRole("auth")}>Commencer maintenant <ArrowRight size={18}/></button>
            <button style={{...S.btnOut,border:"2px solid rgba(255,255,255,.5)",color:"#fff",padding:"13px 24px",fontSize:15}}>Voir la démo <Video size={16}/></button>
          </div>
          <div style={{display:"flex",gap:28,marginTop:40}}>
            {[["1 240+","Patients"],["87+","Médecins vérifiés"],["4.8★","Note moyenne"]].map(([v,l])=>(
              <div key={l}><div style={{fontSize:22,fontWeight:900,color:"#fff"}}>{v}</div><div style={{fontSize:13,color:"rgba(255,255,255,.7)"}}>{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{padding:"72px 5%",background:C.bg}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <h2 style={{fontSize:32,fontWeight:900,color:C.tealD,margin:"0 0 12px",letterSpacing:-0.5}}>Pourquoi choisir WELBE-BEN ?</h2>
          <p style={{fontSize:16,color:C.textS,maxWidth:520,margin:"0 auto"}}>Une plateforme complète, sécurisée, adaptée aux réalités africaines.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20}}>
          {[
            {icon:<Video size={26}/>,title:"Consultations Vidéo",desc:"Interface HD stable même avec une connexion limitée. Chat en direct intégré.",color:C.tealL,ic:C.teal},
            {icon:<Shield size={26}/>,title:"Médecins Vérifiés",desc:"Chaque praticien est authentifié avec diplôme et certifications officielles.",color:C.amberL,ic:C.amberD},
            {icon:<Phone size={26}/>,title:"Paiement Mobile Money",desc:"Orange Money, Wave, MTN MoMo — rapide, sécurisé, sans frais cachés.",color:"#E8F5E9",ic:"#2E7D32"},
            {icon:<FileText size={26}/>,title:"Ordonnances Digitales",desc:"Recevez vos prescriptions numériques, valides en pharmacie partenaire.",color:C.redL,ic:C.red},
          ].map(f=>(
            <div key={f.title} style={{...S.card,display:"flex",flexDirection:"column",gap:14}}>
              <div style={{width:52,height:52,borderRadius:14,background:f.color,display:"flex",alignItems:"center",justifyContent:"center",color:f.ic}}>{f.icon}</div>
              <div><div style={{fontSize:16,fontWeight:800,color:C.text,marginBottom:6}}>{f.title}</div><div style={{fontSize:14,color:C.textS,lineHeight:1.6}}>{f.desc}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{padding:"64px 5%",background:C.white,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
        <h2 style={{fontSize:28,fontWeight:900,color:C.tealD,textAlign:"center",margin:"0 0 40px",letterSpacing:-0.5}}>Ce que disent nos utilisateurs</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20,maxWidth:900,margin:"0 auto"}}>
          {[
            {name:"Mariam Diallo",role:"Patiente, Bamako",text:"J'ai eu une consultation en moins de 10 minutes. Le médecin était très professionnel et j'ai reçu mon ordonnance directement sur mon téléphone.",av:"MD",stars:5},
            {name:"Dr. Cheick Ouédraogo",role:"Cardiologue, Ouagadougou",text:"WELBE-BEN m'a permis d'atteindre des patients dans des zones reculées. La plateforme est intuitive et mes revenus ont doublé.",av:"CO",stars:5},
            {name:"Aïssatou Bah",role:"Patiente, Conakry",text:"Payer via Orange Money et consulter depuis chez moi, c'est révolutionnaire. Je n'ai plus besoin de faire 2h de route.",av:"AB",stars:5},
          ].map(t=>(
            <div key={t.name} style={{...S.card,display:"flex",flexDirection:"column",gap:12}}>
              <div style={{display:"flex",gap:2}}>{[1,2,3,4,5].map(s=><Star key={s} size={16} fill={C.amber} color={C.amber}/>)}</div>
              <p style={{fontSize:14,color:C.textS,lineHeight:1.7,margin:0,fontStyle:"italic"}}>"{t.text}"</p>
              <div style={{display:"flex",alignItems:"center",gap:10,marginTop:"auto",paddingTop:12,borderTop:`1px solid ${C.border}`}}>
                <Av i={t.av} size={36}/>
                <div><div style={{fontSize:14,fontWeight:700,color:C.text}}>{t.name}</div><div style={{fontSize:12,color:C.textS}}>{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pre-inscription form */}
      <section style={{padding:"72px 5%",background:C.bg}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          <h2 style={{fontSize:28,fontWeight:900,color:C.tealD,textAlign:"center",margin:"0 0 8px"}}>Pré-inscription gratuite</h2>
          <p style={{textAlign:"center",color:C.textS,fontSize:14,margin:"0 0 32px"}}>Rejoignez la liste d'attente et obtenez 3 mois offerts.</p>
          {submitted?(
            <div style={{...S.card,textAlign:"center",padding:"2rem"}}>
              <CheckCircle size={48} color={C.tealM} style={{marginBottom:12}}/>
              <div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:8}}>Merci, {form.nom} !</div>
              <div style={{color:C.textS,fontSize:14}}>Vous recevrez un email de confirmation à <b>{form.email}</b>.</div>
            </div>
          ):(
            <div style={S.card}>
              <div style={{display:"flex",gap:8,marginBottom:20,background:C.tealL,borderRadius:10,padding:4}}>
                {["patient","médecin"].map(r=>(
                  <button key={r} onClick={()=>setForm(f=>({...f,type:r}))} style={{flex:1,padding:"8px",borderRadius:8,border:"none",fontWeight:700,fontSize:14,cursor:"pointer",background:form.type===r?C.white:"transparent",color:form.type===r?C.tealD:C.textS,boxShadow:form.type===r?"0 1px 4px rgba(0,0,0,.1)":"none",textTransform:"capitalize"}}>
                    {r==="patient"?<><User size={14} style={{verticalAlign:"middle",marginRight:6}}/>Patient</>:<><Stethoscope size={14} style={{verticalAlign:"middle",marginRight:6}}/>Médecin</>}
                  </button>
                ))}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div><label style={S.label}>Nom complet</label><input style={S.input} placeholder="Ex: Amina Konaté" value={form.nom} onChange={e=>setForm(f=>({...f,nom:e.target.value}))}/></div>
                <div><label style={S.label}>Adresse email</label><input style={S.input} placeholder="votre@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div>
                <button style={{...S.btn,width:"100%",justifyContent:"center",padding:"13px",fontSize:15}} onClick={()=>{if(form.nom&&form.email)setSubmitted(true)}}>
                  M'inscrire gratuitement <ArrowRight size={16}/>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding:"64px 5%",background:C.white,borderTop:`1px solid ${C.border}`}}>
        <h2 style={{fontSize:28,fontWeight:900,color:C.tealD,textAlign:"center",margin:"0 0 40px"}}>Questions fréquentes</h2>
        <div style={{maxWidth:640,margin:"0 auto",display:"flex",flexDirection:"column",gap:8}}>
          {faqs.map((f,i)=>(
            <div key={i} style={{...S.card,cursor:"pointer",padding:"14px 18px"}} onClick={()=>setFaqOpen(faqOpen===i?null:i)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
                <span style={{fontWeight:700,fontSize:15,color:C.text}}>{f.q}</span>
                <ChevronDown size={18} color={C.teal} style={{transform:faqOpen===i?"rotate(180deg)":"none",transition:"transform .2s",flexShrink:0}}/>
              </div>
              {faqOpen===i&&<p style={{margin:"12px 0 0",fontSize:14,color:C.textS,lineHeight:1.7}}>{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section style={{background:C.grad,padding:"72px 5%",textAlign:"center"}}>
        <h2 style={{fontSize:32,fontWeight:900,color:"#fff",margin:"0 0 16px",letterSpacing:-0.5}}>Prêt à transformer votre santé ?</h2>
        <p style={{color:"rgba(255,255,255,.8)",fontSize:16,margin:"0 0 32px"}}>Rejoignez +1 240 patients et 87 médecins sur WELBE-BEN.</p>
        <button style={{...S.btn,background:C.amber,padding:"16px 36px",fontSize:17}} onClick={()=>setRole("auth")}>Créer mon compte <ArrowRight size={18}/></button>
      </section>

      {/* Footer */}
      <footer style={{background:C.tealD,padding:"32px 5%",textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:12}}>
          <Heart size={18} color={C.amber} fill={C.amber}/>
          <span style={{fontWeight:900,fontSize:18,color:"#fff",letterSpacing:-0.5}}>WELBE<span style={{color:C.amber}}>-BEN</span></span>
        </div>
        <p style={{color:"rgba(255,255,255,.5)",fontSize:13,margin:0}}>© 2026 WELBE-BEN · Télémédecine · contact@welbe-ben.com</p>
      </footer>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 2 : AUTHENTIFICATION
// ══════════════════════════════════════════════════════════════════════════════
function Auth({setRole}){
  const [mode,setMode]=useState("login");
  const [type,setType]=useState("patient");
  const [step,setStep]=useState(1);
  const [form,setForm]=useState({email:"",password:"",nom:"",tel:"",spec:""});

  const login=()=>{
    if(form.email==="admin@welbe-ben.com") setRole("admin");
    else if(type==="doctor") setRole("doctor");
    else setRole("patient");
  };

  return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 16px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:32,cursor:"pointer"}} onClick={()=>setRole(null)}>
        <div style={{width:42,height:42,borderRadius:12,background:C.grad,display:"flex",alignItems:"center",justifyContent:"center"}}><Heart size={22} color="#fff" fill="#fff"/></div>
        <span style={{fontWeight:900,fontSize:24,color:C.tealD,letterSpacing:-1}}>WELBE<span style={{color:C.amber}}>-BEN</span></span>
      </div>

      <div style={{...S.card,width:"100%",maxWidth:420,padding:"2rem"}}>
        {/* Toggle login/register */}
        <div style={{display:"flex",gap:0,marginBottom:24,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
          {[["login","Se connecter"],["register","S'inscrire"]].map(([m,l])=>(
            <button key={m} onClick={()=>{setMode(m);setStep(1)}} style={{flex:1,padding:"10px",border:"none",cursor:"pointer",fontWeight:700,fontSize:14,background:mode===m?C.grad:"transparent",color:mode===m?"#fff":C.textS}}>{l}</button>
          ))}
        </div>

        {mode==="login"?(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{textAlign:"center",marginBottom:8}}>
              <div style={{fontSize:18,fontWeight:800,color:C.text}}>Bon retour 👋</div>
              <div style={{fontSize:13,color:C.textS}}>Connectez-vous à votre espace</div>
            </div>
            {/* Quick access buttons */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:8}}>
              {[["patient","Patient","👤"],["doctor","Médecin","🩺"],["admin","Admin","⚙️"]].map(([r,l,em])=>(
                <button key={r} onClick={()=>setType(r)} style={{padding:"8px 4px",borderRadius:8,border:`2px solid ${type===r?C.teal:C.border}`,background:type===r?C.tealL:"transparent",fontSize:12,fontWeight:700,color:type===r?C.tealD:C.textS,cursor:"pointer"}}>
                  <div style={{fontSize:20}}>{em}</div>{l}
                </button>
              ))}
            </div>
            <div><label style={S.label}>Email</label><input style={S.input} placeholder={type==="admin"?"admin@welbe-ben.com":"vous@email.com"} value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div>
            <div><label style={S.label}>Mot de passe</label><input style={S.input} type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))}/></div>
            <div style={{textAlign:"right"}}><span style={{fontSize:13,color:C.teal,cursor:"pointer",fontWeight:600}}>Mot de passe oublié ?</span></div>
            <button style={{...S.btn,width:"100%",justifyContent:"center",padding:"13px",fontSize:15}} onClick={login}>Se connecter <ArrowRight size={16}/></button>
            <div style={{textAlign:"center",fontSize:12,color:C.textS,marginTop:4}}>
              💡 Essayez : <b>Patient</b>, <b>Médecin</b> ou <b>Admin</b> → Connexion directe
            </div>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{textAlign:"center",marginBottom:8}}>
              <div style={{fontSize:18,fontWeight:800,color:C.text}}>{step===1?"Votre profil":"Finaliser"}</div>
              <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:10}}>
                {[1,2].map(s=><div key={s} style={{width:28,height:5,borderRadius:3,background:step>=s?C.teal:C.border}}/>)}
              </div>
            </div>
            {/* Role toggle */}
            <div style={{display:"flex",gap:8,background:C.tealL,borderRadius:10,padding:4}}>
              {["patient","doctor"].map(r=>(
                <button key={r} onClick={()=>setType(r)} style={{flex:1,padding:"8px",borderRadius:8,border:"none",fontWeight:700,fontSize:14,cursor:"pointer",background:type===r?C.white:"transparent",color:type===r?C.tealD:C.textS,boxShadow:type===r?"0 1px 4px rgba(0,0,0,.1)":"none"}}>
                  {r==="patient"?"👤 Patient":"🩺 Médecin"}
                </button>
              ))}
            </div>
            {step===1?(
              <>
                <div><label style={S.label}>Nom complet</label><input style={S.input} placeholder="Amina Konaté" value={form.nom} onChange={e=>setForm(f=>({...f,nom:e.target.value}))}/></div>
                <div><label style={S.label}>Email</label><input style={S.input} placeholder="vous@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div>
                <div><label style={S.label}>Téléphone</label><input style={S.input} placeholder="+223 XX XX XX XX" value={form.tel} onChange={e=>setForm(f=>({...f,tel:e.target.value}))}/></div>
                {type==="doctor"&&<div><label style={S.label}>Spécialité</label><select style={S.input} value={form.spec} onChange={e=>setForm(f=>({...f,spec:e.target.value}))}><option value="">Choisir...</option>{SPECS.slice(1).map(s=><option key={s}>{s}</option>)}</select></div>}
                <button style={{...S.btn,width:"100%",justifyContent:"center",padding:"13px"}} onClick={()=>setStep(2)}>Continuer <ArrowRight size={16}/></button>
              </>
            ):(
              <>
                <div><label style={S.label}>Mot de passe</label><input style={S.input} type="password" placeholder="Min. 8 caractères"/></div>
                <div><label style={S.label}>Confirmer le mot de passe</label><input style={S.input} type="password" placeholder="Confirmer..."/></div>
                {type==="doctor"&&(
                  <div style={{border:`2px dashed ${C.border}`,borderRadius:10,padding:"20px",textAlign:"center",cursor:"pointer",background:C.tealL}}>
                    <Upload size={24} color={C.teal} style={{marginBottom:8}}/>
                    <div style={{fontSize:13,fontWeight:700,color:C.tealD}}>Uploader votre diplôme</div>
                    <div style={{fontSize:12,color:C.textS}}>PDF, JPG ou PNG · Max 5MB</div>
                  </div>
                )}
                <div style={{display:"flex",gap:8,background:C.tealL,borderRadius:8,padding:12,fontSize:13,color:C.tealD,alignItems:"flex-start",gap:10}}>
                  <Check size={16} style={{flexShrink:0,marginTop:1}}/> En créant un compte, vous acceptez nos <span style={{color:C.teal,cursor:"pointer",fontWeight:600,marginLeft:3}}>Conditions d'utilisation</span>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button style={{...S.btnOut,flex:1,justifyContent:"center"}} onClick={()=>setStep(1)}>← Retour</button>
                  <button style={{...S.btn,flex:1,justifyContent:"center"}} onClick={login}>Créer mon compte ✓</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <p style={{fontSize:13,color:C.textS,marginTop:20,cursor:"pointer"}} onClick={()=>setRole(null)}>← Retour à l'accueil</p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 3 : DASHBOARD PATIENT
// ══════════════════════════════════════════════════════════════════════════════
function PatientDash({setRole,openVideo}){
  const [tab,setTab]=useState("accueil");
  const [spec,setSpec]=useState("Tous");
  const [msg,setMsg]=useState("");
  const [activeMsg,setActiveMsg]=useState(MESSAGES[0]);
  const [chat,setChat]=useState([{from:"doc",text:"Bonjour ! Comment puis-je vous aider aujourd'hui ?"}]);

  const items=[
    {id:"accueil",icon:<Home size={16}/>,label:"Accueil"},
    {id:"rdv",icon:<Calendar size={16}/>,label:"Rendez-vous"},
    {id:"medecins",icon:<Stethoscope size={16}/>,label:"Médecins"},
    {id:"messages",icon:<MessageSquare size={16}/>,label:"Messages",badge:1},
    {id:"paiements",icon:<DollarSign size={16}/>,label:"Paiements"},
    {id:"historique",icon:<Clock size={16}/>,label:"Historique"},
  ];

  const sendMsg=()=>{if(!msg.trim())return;setChat(c=>[...c,{from:"me",text:msg},{from:"doc",text:"Merci pour votre message. Je vous réponds dès que possible."}]);setMsg("");};

  return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"system-ui,sans-serif"}}>
      <TopNav role="patient" setRole={setRole}/>
      <div style={{display:"flex"}}>
        <Sidebar items={items} active={tab} setActive={setTab}/>
        <div style={{flex:1,padding:"28px 32px",overflowY:"auto",maxHeight:"calc(100vh - 60px)"}}>

          {tab==="accueil"&&(
            <div>
              <p style={S.pageTitle}>Bonjour, Kofi 👋</p>
              <p style={S.sub}>Votre prochain rendez-vous est le <b>18 Mai 2026</b> avec Dr. Amina Konaté</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginBottom:28}}>
                <Stat icon={<Calendar size={22}/>} label="Rendez-vous à venir" value="2" color={C.teal} bg={C.tealL}/>
                <Stat icon={<Clock size={22}/>} label="Consultations totales" value="8" color={C.amberD} bg={C.amberL}/>
                <Stat icon={<FileText size={22}/>} label="Ordonnances actives" value="1" color={C.tealM} bg={C.greenL}/>
                <Stat icon={<MessageSquare size={22}/>} label="Messages non lus" value="1" color={C.red} bg={C.redL}/>
              </div>
              <h3 style={{fontSize:16,fontWeight:800,color:C.text,marginBottom:12}}>Prochains rendez-vous</h3>
              <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
                {APPOINTMENTS.map(a=>(
                  <div key={a.id} style={{...S.card,display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
                    <Av i={a.avatar} size={44}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:800,fontSize:15,color:C.text}}>{a.doctor}</div>
                      <div style={{fontSize:13,color:C.textS}}>{a.spec} · {a.date} à {a.time}</div>
                    </div>
                    <Bdg bg={a.status==="confirmé"?C.greenL:C.amberL} c={a.status==="confirmé"?"#166534":C.amberD}>{a.status}</Bdg>
                    <button style={{...S.btn,padding:"8px 16px",fontSize:13}} onClick={openVideo}><Video size={14}/>Rejoindre</button>
                  </div>
                ))}
              </div>
              <button style={{...S.btn,padding:"12px 24px"}} onClick={()=>setTab("medecins")}><Plus size={16}/>Prendre un rendez-vous</button>
            </div>
          )}

          {tab==="medecins"&&(
            <div>
              <p style={S.pageTitle}>Médecins disponibles</p>
              <p style={S.sub}>Choisissez un spécialiste et prenez rendez-vous en direct</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
                {SPECS.map(s=>(
                  <button key={s} onClick={()=>setSpec(s)} style={{padding:"7px 16px",borderRadius:20,border:`1.5px solid ${spec===s?C.teal:C.border}`,background:spec===s?C.tealL:"transparent",color:spec===s?C.tealD:C.textS,fontWeight:600,fontSize:13,cursor:"pointer"}}>{s}</button>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16}}>
                {DOCTORS.filter(d=>spec==="Tous"||d.spec===spec).map(d=>(
                  <div key={d.id} style={{...S.card,display:"flex",flexDirection:"column",gap:14}}>
                    <div style={{display:"flex",gap:12,alignItems:"center"}}>
                      <Av i={d.avatar} size={52} bg={d.dispo?C.tealL:C.border} c={d.dispo?C.tealD:C.textS}/>
                      <div>
                        <div style={{fontWeight:800,fontSize:15,color:C.text}}>{d.name}</div>
                        <div style={{fontSize:13,color:C.textS}}>{d.spec} · {d.exp} exp.</div>
                        <div style={{display:"flex",alignItems:"center",gap:4,marginTop:4}}>
                          <Star size={13} fill={C.amber} color={C.amber}/>
                          <span style={{fontSize:13,fontWeight:700,color:C.amberD}}>{d.rating}</span>
                          <span style={{fontSize:12,color:C.textS}}>· {d.patients} patients</span>
                        </div>
                      </div>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div><span style={{fontSize:16,fontWeight:900,color:C.tealD}}>{d.price.toLocaleString()} FCFA</span><span style={{fontSize:12,color:C.textS}}>/consultation</span></div>
                      <Bdg bg={d.dispo?C.greenL:C.redL} c={d.dispo?"#166534":C.red}>{d.dispo?"Disponible":"Indisponible"}</Bdg>
                    </div>
                    {d.dispo&&<button style={{...S.btn,width:"100%",justifyContent:"center",padding:"10px"}} onClick={openVideo}><Calendar size={14}/>Prendre RDV</button>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==="messages"&&(
            <div>
              <p style={S.pageTitle}>Messagerie</p>
              <p style={S.sub}>Échangez en toute sécurité avec vos médecins</p>
              <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:16,height:500}}>
                <div style={{...S.card,padding:0,overflow:"hidden",display:"flex",flexDirection:"column"}}>
                  {MESSAGES.map(m=>(
                    <div key={m.id} onClick={()=>setActiveMsg(m)} style={{padding:"14px 16px",cursor:"pointer",background:activeMsg.id===m.id?C.tealL:"transparent",borderBottom:`1px solid ${C.border}`,display:"flex",gap:10,alignItems:"center"}}>
                      <div style={{position:"relative"}}><Av i={m.avatar} size={38}/>{m.unread&&<div style={{position:"absolute",top:0,right:0,width:10,height:10,borderRadius:"50%",background:C.red,border:"2px solid white"}}/>}</div>
                      <div style={{flex:1,minWidth:0}}><div style={{fontWeight:700,fontSize:14,color:C.text}}>{m.from}</div><div style={{fontSize:12,color:C.textS,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.msg}</div></div>
                      <span style={{fontSize:11,color:C.textS,flexShrink:0}}>{m.time}</span>
                    </div>
                  ))}
                </div>
                <div style={{...S.card,padding:0,display:"flex",flexDirection:"column",overflow:"hidden"}}>
                  <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}>
                    <Av i={activeMsg.avatar} size={36}/><div><div style={{fontWeight:800,fontSize:14,color:C.text}}>{activeMsg.from}</div><div style={{fontSize:12,color:C.tealM}}>● En ligne</div></div>
                  </div>
                  <div style={{flex:1,padding:"16px",overflow:"auto",display:"flex",flexDirection:"column",gap:10}}>
                    {chat.map((c,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:c.from==="me"?"flex-end":"flex-start"}}>
                        <div style={{maxWidth:"70%",padding:"10px 14px",borderRadius:c.from==="me"?"14px 14px 4px 14px":"14px 14px 14px 4px",background:c.from==="me"?C.teal:C.tealL,color:c.from==="me"?"#fff":C.tealD,fontSize:14,lineHeight:1.5}}>{c.text}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{padding:"12px 16px",borderTop:`1px solid ${C.border}`,display:"flex",gap:8}}>
                    <input style={{...S.input,flex:1}} placeholder="Écrire un message..." value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()}/>
                    <button style={{...S.btn,padding:"10px 16px"}} onClick={sendMsg}>Envoyer</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab==="paiements"&&(
            <div>
              <p style={S.pageTitle}>Paiement</p>
              <p style={S.sub}>Payez vos consultations via Mobile Money</p>
              <div style={{maxWidth:460}}>
                <div style={{...S.card,marginBottom:20}}>
                  <div style={{fontSize:15,fontWeight:800,color:C.text,marginBottom:16}}>Payer une consultation</div>
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    <div><label style={S.label}>Montant</label><input style={S.input} value="15 000 FCFA" readOnly/></div>
                    <div><label style={S.label}>Mode de paiement</label>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:6}}>
                        {[["🟠","Orange Money"],["🔵","Wave"],["🟡","MTN MoMo"],["💳","Carte Bancaire"]].map(([em,n])=>(
                          <div key={n} style={{border:`1.5px solid ${C.border}`,borderRadius:10,padding:"12px",cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontSize:13,fontWeight:600,color:C.text}}>
                            <span style={{fontSize:20}}>{em}</span>{n}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div><label style={S.label}>Numéro Mobile Money</label><input style={S.input} placeholder="+223 XX XX XX XX"/></div>
                    <button style={{...S.btn,width:"100%",justifyContent:"center",padding:"13px",fontSize:15}}>Confirmer le paiement <Check size={16}/></button>
                  </div>
                </div>
                <h3 style={{fontSize:15,fontWeight:800,color:C.text,marginBottom:12}}>Historique des paiements</h3>
                {[{date:"12 Mai",desc:"Dr. Amina Konaté · Cardio",mnt:"15 000 FCFA"},{date:"03 Avr",desc:"Dr. Seydou Coulibaly · Généraliste",mnt:"8 000 FCFA"}].map(p=>(
                  <div key={p.date} style={{...S.card,display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,padding:"12px 16px"}}>
                    <div><div style={{fontWeight:700,fontSize:14,color:C.text}}>{p.desc}</div><div style={{fontSize:12,color:C.textS}}>{p.date}</div></div>
                    <Bdg bg={C.greenL} c="#166534">{p.mnt}</Bdg>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==="historique"&&(
            <div>
              <p style={S.pageTitle}>Historique des consultations</p>
              <p style={S.sub}>Retrouvez toutes vos consultations passées</p>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {[
                  {d:"12 Mai 2026",doc:"Dr. Amina Konaté",spec:"Cardiologue",note:"Contrôle tension artérielle",ord:true},
                  {d:"03 Avr 2026",doc:"Dr. Seydou Coulibaly",spec:"Généraliste",note:"Grippe saisonnière",ord:true},
                  {d:"15 Mar 2026",doc:"Dr. Jean-Marie Diallo",spec:"Pédiatre",note:"Consultation enfant",ord:false},
                ].map((h,i)=>(
                  <div key={i} style={{...S.card,display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
                    <div style={{width:44,height:44,borderRadius:12,background:C.tealL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Calendar size={20} color={C.teal}/></div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:800,fontSize:15,color:C.text}}>{h.doc}</div>
                      <div style={{fontSize:13,color:C.textS}}>{h.spec} · {h.d}</div>
                      <div style={{fontSize:13,color:C.tealM,marginTop:2}}>📋 {h.note}</div>
                    </div>
                    {h.ord&&<button style={{...S.btnOut,padding:"7px 14px",fontSize:13}}><FileText size={14}/>Ordonnance</button>}
                    <button style={{...S.btn,padding:"7px 14px",fontSize:13}} onClick={openVideo}><Video size={14}/>Reconsulter</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==="rdv"&&(
            <div>
              <p style={S.pageTitle}>Prendre un rendez-vous</p>
              <p style={S.sub}>Choisissez un médecin, une date et confirmez en quelques clics</p>
              <div style={{maxWidth:500}}>
                <div style={S.card}>
                  <div style={{display:"flex",flexDirection:"column",gap:14}}>
                    <div><label style={S.label}>Spécialité recherchée</label><select style={S.input}>{SPECS.map(s=><option key={s}>{s}</option>)}</select></div>
                    <div><label style={S.label}>Médecin</label><select style={S.input}>{DOCTORS.map(d=><option key={d.id}>{d.name} — {d.spec}</option>)}</select></div>
                    <div><label style={S.label}>Date souhaitée</label><input type="date" style={S.input}/></div>
                    <div><label style={S.label}>Créneau horaire</label>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginTop:6}}>
                        {["08:00","09:30","11:00","14:00","15:30","17:00"].map(h=>(
                          <button key={h} style={{padding:"8px",borderRadius:8,border:`1.5px solid ${C.border}`,background:"transparent",fontSize:13,fontWeight:700,color:C.text,cursor:"pointer"}}>{h}</button>
                        ))}
                      </div>
                    </div>
                    <div><label style={S.label}>Motif de la consultation</label><textarea style={{...S.input,minHeight:80,resize:"vertical"}} placeholder="Décrivez brièvement votre problème de santé..."/></div>
                    <button style={{...S.btn,width:"100%",justifyContent:"center",padding:"13px",fontSize:15}}><Calendar size={16}/>Confirmer le rendez-vous</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 4 : DASHBOARD MÉDECIN
// ══════════════════════════════════════════════════════════════════════════════
function DoctorDash({setRole,openVideo}){
  const [tab,setTab]=useState("agenda");
  const items=[
    {id:"agenda",icon:<Calendar size={16}/>,label:"Mon Agenda"},
    {id:"patients",icon:<Users size={16}/>,label:"Patients"},
    {id:"revenus",icon:<DollarSign size={16}/>,label:"Revenus"},
    {id:"ordonnances",icon:<FileText size={16}/>,label:"Ordonnances"},
    {id:"profil",icon:<User size={16}/>,label:"Mon Profil"},
  ];

  const AGENDA_TODAY=[
    {h:"09:00",p:"Kofi Mensah",motif:"Bilan cardiaque",status:"confirmé"},
    {h:"10:30",p:"Awa Diarra",motif:"Suivi hypertension",status:"confirmé"},
    {h:"14:00",p:"Ibrahim Sow",motif:"Première consultation",status:"en attente"},
    {h:"15:30",p:"Mariama Baldé",motif:"Résultats d'examens",status:"confirmé"},
  ];

  return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"system-ui,sans-serif"}}>
      <TopNav role="doctor" setRole={setRole}/>
      <div style={{display:"flex"}}>
        <Sidebar items={items} active={tab} setActive={setTab}/>
        <div style={{flex:1,padding:"28px 32px",overflowY:"auto",maxHeight:"calc(100vh - 60px)"}}>

          {tab==="agenda"&&(
            <div>
              <p style={S.pageTitle}>Mon Agenda</p>
              <p style={S.sub}>Vendredi 15 Mai 2026 · 4 consultations programmées</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginBottom:28}}>
                <Stat icon={<Calendar size={22}/>} label="Aujourd'hui" value="4" color={C.teal} bg={C.tealL}/>
                <Stat icon={<Users size={22}/>} label="Cette semaine" value="18" color={C.amberD} bg={C.amberL}/>
                <Stat icon={<TrendingUp size={22}/>} label="Ce mois" value="62" color={C.tealM} bg={C.greenL}/>
                <Stat icon={<DollarSign size={22}/>} label="Revenus Mai (FCFA)" value="930K" color={C.red} bg={C.redL}/>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {AGENDA_TODAY.map((a,i)=>(
                  <div key={i} style={{...S.card,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
                    <div style={{width:60,textAlign:"center",borderRight:`1px solid ${C.border}`,paddingRight:14,flexShrink:0}}>
                      <div style={{fontSize:18,fontWeight:900,color:C.teal}}>{a.h}</div>
                      <div style={{fontSize:11,color:C.textS}}>30 min</div>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:800,fontSize:15,color:C.text}}>{a.p}</div>
                      <div style={{fontSize:13,color:C.textS}}>📋 {a.motif}</div>
                    </div>
                    <Bdg bg={a.status==="confirmé"?C.greenL:C.amberL} c={a.status==="confirmé"?"#166534":C.amberD}>{a.status}</Bdg>
                    <button style={{...S.btn,padding:"8px 16px",fontSize:13}} onClick={openVideo}><Video size={14}/>Démarrer</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==="patients"&&(
            <div>
              <p style={S.pageTitle}>Mes Patients</p>
              <p style={S.sub}>340 patients enregistrés dans votre portefeuille</p>
              <div style={{...S.card,padding:0,overflow:"hidden"}}>
                <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",gap:10}}>
                  <div style={{position:"relative",flex:1}}><Search size={16} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.textS}}/><input style={{...S.input,paddingLeft:36}} placeholder="Rechercher un patient..."/></div>
                </div>
                {[{n:"Kofi Mensah",av:"KM",last:"12 Mai",nb:8,cond:"Hypertension"},{n:"Awa Diarra",av:"AD",last:"03 Avr",nb:4,cond:"Diabète"},{n:"Ibrahim Sow",av:"IS",last:"15 Mar",nb:2,cond:"Arythmie"},{n:"Mariama Baldé",av:"MB",last:"28 Fév",nb:6,cond:"Insuffisance cardiaque"}].map((p,i)=>(
                  <div key={i} style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:14}}>
                    <Av i={p.av} size={42}/>
                    <div style={{flex:1}}><div style={{fontWeight:800,fontSize:14,color:C.text}}>{p.n}</div><div style={{fontSize:13,color:C.textS}}>Dernière consultation : {p.last} · {p.nb} visites</div></div>
                    <Bdg bg={C.tealL} c={C.tealD}>{p.cond}</Bdg>
                    <button style={{...S.btnOut,padding:"7px 14px",fontSize:13}}><Eye size={14}/>Dossier</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==="revenus"&&(
            <div>
              <p style={S.pageTitle}>Revenus & Statistiques</p>
              <p style={S.sub}>Performance de Mai 2026</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginBottom:28}}>
                <Stat icon={<DollarSign size={22}/>} label="Revenus du mois (FCFA)" value="930 000" color={C.teal} bg={C.tealL}/>
                <Stat icon={<TrendingUp size={22}/>} label="Vs mois dernier" value="+31%" color="#166534" bg={C.greenL}/>
                <Stat icon={<Users size={22}/>} label="Consultations effectuées" value="62" color={C.amberD} bg={C.amberL}/>
                <Stat icon={<Star size={22}/>} label="Note moyenne" value="4.9 ★" color={C.amberD} bg={C.amberL}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div style={S.card}>
                  <div style={{fontWeight:800,fontSize:15,color:C.text,marginBottom:16}}>Revenus mensuels (milliers FCFA)</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={REV_DATA}><XAxis dataKey="m" tick={{fontSize:12}}/><YAxis hide/><Tooltip formatter={v=>`${v}K FCFA`}/><Bar dataKey="v" fill={C.teal} radius={[4,4,0,0]}/></BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={S.card}>
                  <div style={{fontWeight:800,fontSize:15,color:C.text,marginBottom:16}}>Consultations par mois</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={CONSULT_DATA}><XAxis dataKey="m" tick={{fontSize:12}}/><YAxis hide/><Tooltip/><Line type="monotone" dataKey="v" stroke={C.amber} strokeWidth={3} dot={{fill:C.amber}}/></LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {tab==="ordonnances"&&(
            <div>
              <p style={S.pageTitle}>Ordonnances Digitales</p>
              <p style={S.sub}>Créez et gérez vos prescriptions en ligne</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
                <div>
                  <h3 style={{fontSize:15,fontWeight:800,color:C.text,marginBottom:12}}>Nouvelle ordonnance</h3>
                  <div style={{...S.card,display:"flex",flexDirection:"column",gap:12}}>
                    <div><label style={S.label}>Patient</label><select style={S.input}><option>Kofi Mensah</option><option>Awa Diarra</option><option>Ibrahim Sow</option></select></div>
                    <div><label style={S.label}>Médicament 1</label><input style={S.input} placeholder="Nom du médicament, posologie..."/></div>
                    <div><label style={S.label}>Médicament 2</label><input style={S.input} placeholder="Optionnel"/></div>
                    <div><label style={S.label}>Instructions</label><textarea style={{...S.input,minHeight:70}} placeholder="Instructions de traitement..."/></div>
                    <div><label style={S.label}>Durée du traitement</label><input style={S.input} placeholder="Ex: 7 jours"/></div>
                    <button style={{...S.btn,width:"100%",justifyContent:"center",padding:"12px"}}><FileText size={15}/>Générer l'ordonnance</button>
                  </div>
                </div>
                <div>
                  <h3 style={{fontSize:15,fontWeight:800,color:C.text,marginBottom:12}}>Ordonnances récentes</h3>
                  {[{p:"Kofi Mensah",med:"Amlodipine 5mg",date:"12 Mai",id:"ORD-2026-084"},{p:"Awa Diarra",med:"Metformine 850mg",date:"03 Avr",id:"ORD-2026-071"},{p:"Ibrahim Sow",med:"Bisoprolol 2.5mg",date:"15 Mar",id:"ORD-2026-058"}].map((o,i)=>(
                    <div key={i} style={{...S.card,marginBottom:10,padding:"12px 16px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                        <span style={{fontWeight:800,fontSize:14,color:C.text}}>{o.p}</span>
                        <span style={{fontSize:11,color:C.textS}}>{o.date}</span>
                      </div>
                      <div style={{fontSize:13,color:C.textS,marginBottom:8}}>💊 {o.med}</div>
                      <div style={{display:"flex",gap:8,alignItems:"center"}}>
                        <span style={{fontSize:11,color:C.textS}}>{o.id}</span>
                        <button style={{...S.btnOut,padding:"5px 12px",fontSize:12,marginLeft:"auto"}}><Eye size={12}/>Voir</button>
                        <button style={{...S.btn,padding:"5px 12px",fontSize:12}}><Upload size={12}/>Envoyer</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab==="profil"&&(
            <div>
              <p style={S.pageTitle}>Mon Profil Public</p>
              <p style={S.sub}>Ces informations sont visibles par les patients</p>
              <div style={{maxWidth:520}}>
                <div style={{...S.card,marginBottom:20}}>
                  <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:20,paddingBottom:20,borderBottom:`1px solid ${C.border}`}}>
                    <Av i="AK" size={72} bg={C.tealL} c={C.tealD}/>
                    <div>
                      <div style={{fontSize:20,fontWeight:900,color:C.text}}>Dr. Amina Konaté</div>
                      <div style={{fontSize:14,color:C.textS}}>Cardiologue · 12 ans d'expérience</div>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginTop:6}}>
                        <Bdg bg={C.greenL} c="#166534">✓ Profil vérifié</Bdg>
                        <div style={{display:"flex",alignItems:"center",gap:3}}><Star size={14} fill={C.amber} color={C.amber}/><span style={{fontWeight:700,fontSize:13,color:C.amberD}}>4.9</span></div>
                      </div>
                    </div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    <div><label style={S.label}>Biographie</label><textarea style={{...S.input,minHeight:80}} defaultValue="Cardiologue diplômée de l'Université de Dakar avec 12 ans d'expérience. Spécialisée dans l'hypertension et les maladies coronariennes."/></div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                      <div><label style={S.label}>Tarif consultation</label><input style={S.input} defaultValue="15 000 FCFA"/></div>
                      <div><label style={S.label}>Langues parlées</label><input style={S.input} defaultValue="Français, Bambara"/></div>
                    </div>
                    <button style={{...S.btn,width:"100%",justifyContent:"center",padding:"12px"}}>Enregistrer les modifications ✓</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 5 : SALLE DE CONSULTATION VIDÉO
// ══════════════════════════════════════════════════════════════════════════════
function VideoRoom({onClose}){
  const [mic,setMic]=useState(true);
  const [cam,setCam]=useState(true);
  const [chat,setChat]=useState([{from:"doc",text:"Bonjour ! Je suis le Dr. Amina Konaté. Comment allez-vous aujourd'hui ?"}]);
  const [msg,setMsg]=useState("");
  const [ordShown,setOrdShown]=useState(false);
  const [timer,setTimer]=useState(847);
  const [urgence,setUrgence]=useState(false);

  const fmt=(s)=>`${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;
  const send=()=>{if(!msg.trim())return;setChat(c=>[...c,{from:"me",text:msg},{from:"doc",text:"Bien noté. Je vais examiner cela attentivement."}]);setMsg("");};

  return(
    <div style={{minHeight:"100vh",background:"#0A1A1A",display:"flex",flexDirection:"column",fontFamily:"system-ui,sans-serif"}}>
      {/* Header */}
      <div style={{background:"rgba(0,0,0,.6)",padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",backdropFilter:"blur(10px)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:32,height:32,borderRadius:8,background:C.grad,display:"flex",alignItems:"center",justifyContent:"center"}}><Heart size={16} color="#fff" fill="#fff"/></div>
          <span style={{fontWeight:900,color:"#fff",fontSize:16,letterSpacing:-0.5}}>WELBE<span style={{color:C.amber}}>-BEN</span></span>
          <span style={{fontSize:13,color:"rgba(255,255,255,.5)"}}>— Consultation vidéo sécurisée</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:C.green,animation:"pulse 2s infinite"}}/>
            <span style={{color:"#fff",fontSize:14,fontWeight:700}}>{fmt(timer)}</span>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.1)",border:"none",borderRadius:8,padding:"7px 14px",color:"rgba(255,255,255,.7)",fontSize:13,cursor:"pointer"}}>← Quitter</button>
        </div>
      </div>

      {/* Main area */}
      <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 340px",gap:0}}>
        {/* Video area */}
        <div style={{position:"relative",background:"#111",display:"flex",alignItems:"center",justifyContent:"center"}}>
          {/* Main video (doctor) */}
          <div style={{width:"80%",maxWidth:580,aspectRatio:"16/9",background:"linear-gradient(135deg,#0B5E5E 0%,#083E3E 100%)",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,right:0,bottom:0,left:0,opacity:.15,backgroundImage:"radial-gradient(circle at 30% 50%,#1D9E85 0%,transparent 60%)"}}/>
            <div style={{textAlign:"center",position:"relative"}}>
              <Av i="AK" size={96} bg="rgba(255,255,255,.15)" c="rgba(255,255,255,.9)"/>
              <div style={{color:"#fff",fontWeight:800,fontSize:18,marginTop:12}}>Dr. Amina Konaté</div>
              <div style={{color:"rgba(255,255,255,.6)",fontSize:14}}>Cardiologue</div>
            </div>
            <div style={{position:"absolute",bottom:12,left:12}}><Bdg bg="rgba(0,0,0,.5)" c="#fff">● Médecin</Bdg></div>
          </div>
          {/* Self video (small) */}
          <div style={{position:"absolute",bottom:24,right:24,width:160,height:90,background:"linear-gradient(135deg,#1a3a3a,#0d2424)",borderRadius:12,border:"2px solid rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
            {cam?<Av i="KD" size={44} bg="rgba(255,255,255,.1)" c="rgba(255,255,255,.8)"/>:<div style={{color:"rgba(255,255,255,.4)",fontSize:12,textAlign:"center"}}><VideoOff size={24}/><div style={{fontSize:11,marginTop:4}}>Caméra désactivée</div></div>}
            <div style={{position:"absolute",bottom:6,left:8}}><span style={{fontSize:11,color:"rgba(255,255,255,.7)",fontWeight:600}}>Vous</span></div>
          </div>
          {/* Controls */}
          <div style={{position:"absolute",bottom:24,left:"50%",transform:"translateX(-50%)",display:"flex",gap:12,alignItems:"center"}}>
            {[
              {icon:mic?<Mic size={20}/>:<MicOff size={20}/>,action:()=>setMic(m=>!m),active:mic,label:mic?"Micro":"Micro Off"},
              {icon:cam?<Video size={20}/>:<VideoOff size={20}/>,action:()=>setCam(c=>!c),active:cam,label:cam?"Caméra":"Caméra Off"},
            ].map((btn,i)=>(
              <button key={i} onClick={btn.action} title={btn.label} style={{width:52,height:52,borderRadius:"50%",border:"none",cursor:"pointer",background:btn.active?"rgba(255,255,255,.15)":"rgba(226,75,74,.8)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>{btn.icon}</button>
            ))}
            <button onClick={onClose} style={{width:56,height:56,borderRadius:"50%",background:C.red,border:"none",cursor:"pointer",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}><PhoneOff size={22}/></button>
            <button onClick={()=>setOrdShown(o=>!o)} style={{width:52,height:52,borderRadius:"50%",border:"none",cursor:"pointer",background:ordShown?"rgba(239,159,39,.8)":"rgba(255,255,255,.15)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}} title="Ordonnance"><FileText size={20}/></button>
          </div>
          {/* Bouton urgence */}
          <button onClick={()=>setUrgence(true)} style={{position:"absolute",top:16,right:16,background:urgence?"#991B1B":C.red,border:"none",borderRadius:10,padding:"8px 16px",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
            🚨 {urgence?"Urgence signalée !":"Urgence"}
          </button>
          {/* Ordonnance overlay */}
          {ordShown&&(
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"#fff",borderRadius:16,padding:"24px",width:340,boxShadow:"0 20px 60px rgba(0,0,0,.5)",zIndex:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div style={{fontWeight:900,fontSize:16,color:C.text}}>📋 Ordonnance en cours</div>
                <button onClick={()=>setOrdShown(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={18} color={C.textS}/></button>
              </div>
              <div style={{fontSize:13,color:C.textS,marginBottom:12}}>Dr. Amina Konaté · {new Date().toLocaleDateString("fr-FR")}</div>
              <div style={{background:C.tealL,borderRadius:10,padding:12,marginBottom:12}}>
                <div style={{fontWeight:700,fontSize:14,color:C.tealD}}>Amlodipine 5mg</div>
                <div style={{fontSize:13,color:C.textS}}>1 comprimé/jour le matin · 30 jours</div>
              </div>
              <div style={{background:C.tealL,borderRadius:10,padding:12,marginBottom:16}}>
                <div style={{fontWeight:700,fontSize:14,color:C.tealD}}>Ramipril 5mg</div>
                <div style={{fontSize:13,color:C.textS}}>1 comprimé/soir · 30 jours</div>
              </div>
              <button style={{...S.btn,width:"100%",justifyContent:"center"}}><Upload size={15}/>Envoyer au patient</button>
            </div>
          )}
        </div>
        {/* Chat sidebar */}
        <div style={{background:"#0F2222",borderLeft:"1px solid rgba(255,255,255,.08)",display:"flex",flexDirection:"column"}}>
          <div style={{padding:"16px 16px 12px",borderBottom:"1px solid rgba(255,255,255,.08)"}}>
            <div style={{fontWeight:800,fontSize:14,color:"#fff"}}>Chat en direct</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>Messages sécurisés</div>
          </div>
          <div style={{flex:1,padding:"16px",overflow:"auto",display:"flex",flexDirection:"column",gap:10}}>
            {chat.map((c,i)=>(
              <div key={i} style={{display:"flex",justifyContent:c.from==="me"?"flex-end":"flex-start"}}>
                <div style={{maxWidth:"80%",padding:"10px 13px",borderRadius:c.from==="me"?"12px 12px 4px 12px":"12px 12px 12px 4px",background:c.from==="me"?C.teal:"rgba(255,255,255,.1)",color:"#fff",fontSize:13,lineHeight:1.5}}>{c.text}</div>
              </div>
            ))}
          </div>
          <div style={{padding:"12px",borderTop:"1px solid rgba(255,255,255,.08)",display:"flex",gap:8}}>
            <input style={{...S.input,flex:1,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",color:"#fff"}} placeholder="Message..." value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}/>
            <button style={{...S.btn,padding:"10px 14px"}} onClick={send}>▶</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 6 : ADMINISTRATION
// ══════════════════════════════════════════════════════════════════════════════
function AdminDash({setRole}){
  const [tab,setTab]=useState("overview");
  const items=[
    {id:"overview",icon:<Activity size={16}/>,label:"Vue d'ensemble"},
    {id:"users",icon:<Users size={16}/>,label:"Utilisateurs"},
    {id:"medecins",icon:<Stethoscope size={16}/>,label:"Valider Médecins",badge:3},
    {id:"revenus",icon:<DollarSign size={16}/>,label:"Revenus"},
    {id:"support",icon:<AlertCircle size={16}/>,label:"Support & Litiges",badge:2},
  ];

  const PENDING_DOCS=[
    {name:"Dr. Moussa Diabaté",spec:"Neurologie",date:"14 Mai",file:"diplome_diabate.pdf"},
    {name:"Dr. Rokhaya Sall",spec:"Dermatologie",date:"13 Mai",file:"diplome_sall.pdf"},
    {name:"Dr. Koffi Asante",spec:"ORL",date:"12 Mai",file:"diplome_asante.pdf"},
  ];

  return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"system-ui,sans-serif"}}>
      <TopNav role="admin" setRole={setRole}/>
      <div style={{display:"flex"}}>
        <Sidebar items={items} active={tab} setActive={setTab}/>
        <div style={{flex:1,padding:"28px 32px",overflowY:"auto",maxHeight:"calc(100vh - 60px)"}}>

          {tab==="overview"&&(
            <div>
              <p style={S.pageTitle}>Vue d'ensemble · WELBE-BEN</p>
              <p style={S.sub}>Tableau de bord administrateur — Mai 2026</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginBottom:28}}>
                <Stat icon={<Users size={22}/>} label="Patients inscrits" value="1 240" color={C.teal} bg={C.tealL}/>
                <Stat icon={<Stethoscope size={22}/>} label="Médecins actifs" value="87" color={C.amberD} bg={C.amberL}/>
                <Stat icon={<Video size={22}/>} label="Consultations totales" value="3 420" color={C.tealM} bg={C.greenL}/>
                <Stat icon={<DollarSign size={22}/>} label="Revenu plateforme (FCFA)" value="12.4M" color={C.red} bg={C.redL}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div style={S.card}>
                  <div style={{fontWeight:800,fontSize:15,color:C.text,marginBottom:16}}>Croissance revenus (milliers FCFA)</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={REV_DATA}><XAxis dataKey="m" tick={{fontSize:12}}/><YAxis hide/><Tooltip formatter={v=>`${v}K FCFA`}/><Bar dataKey="v" fill={C.teal} radius={[4,4,0,0]}/></BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={S.card}>
                  <div style={{fontWeight:800,fontSize:15,color:C.text,marginBottom:16}}>Consultations mensuelles</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={CONSULT_DATA}><XAxis dataKey="m" tick={{fontSize:12}}/><YAxis hide/><Tooltip/><Line type="monotone" dataKey="v" stroke={C.amber} strokeWidth={3} dot={{fill:C.amber}}/></LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:16}}>
                <div style={{...S.card,background:`linear-gradient(135deg,${C.red}15,${C.redL})`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><div style={{fontSize:13,color:C.textS}}>Médecins en attente de validation</div><div style={{fontSize:28,fontWeight:900,color:C.red}}>3</div></div>
                    <button style={{...S.btn,background:C.red,padding:"8px 16px",fontSize:13}} onClick={()=>setTab("medecins")}>Valider →</button>
                  </div>
                </div>
                <div style={{...S.card,background:`linear-gradient(135deg,${C.amber}15,${C.amberL})`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><div style={{fontSize:13,color:C.textS}}>Litiges ouverts</div><div style={{fontSize:28,fontWeight:900,color:C.amberD}}>2</div></div>
                    <button style={{...S.btn,background:C.amberD,padding:"8px 16px",fontSize:13}} onClick={()=>setTab("support")}>Gérer →</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab==="users"&&(
            <div>
              <p style={S.pageTitle}>Gestion des Utilisateurs</p>
              <p style={S.sub}>1 327 comptes enregistrés sur la plateforme</p>
              <div style={{display:"flex",gap:10,marginBottom:20}}>
                <div style={{position:"relative",flex:1}}><Search size={16} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.textS}}/><input style={{...S.input,paddingLeft:36}} placeholder="Rechercher par nom, email..."/></div>
                <select style={{...S.input,width:"auto"}}><option>Tous les rôles</option><option>Patients</option><option>Médecins</option></select>
              </div>
              <div style={{...S.card,padding:0,overflow:"hidden"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 120px 100px 80px",padding:"10px 18px",background:C.tealL,borderBottom:`1px solid ${C.border}`}}>
                  {["Nom","Email","Rôle","Statut","Action"].map(h=><div key={h} style={{fontSize:12,fontWeight:700,color:C.tealD}}>{h}</div>)}
                </div>
                {[
                  {n:"Kofi Mensah",e:"kofi@mail.com",r:"Patient",s:"Actif"},
                  {n:"Dr. Amina Konaté",e:"amina@mail.com",r:"Médecin",s:"Actif"},
                  {n:"Awa Diarra",e:"awa@mail.com",r:"Patient",s:"Actif"},
                  {n:"Dr. Jean Diallo",e:"jean@mail.com",r:"Médecin",s:"Actif"},
                  {n:"Ibrahim Sow",e:"ibrahim@mail.com",r:"Patient",s:"Suspendu"},
                ].map((u,i)=>(
                  <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 120px 100px 80px",padding:"12px 18px",borderBottom:`1px solid ${C.border}`,alignItems:"center"}}>
                    <div style={{fontWeight:700,fontSize:14,color:C.text}}>{u.n}</div>
                    <div style={{fontSize:13,color:C.textS}}>{u.e}</div>
                    <Bdg bg={u.r==="Médecin"?C.amberL:C.tealL} c={u.r==="Médecin"?C.amberD:C.tealD}>{u.r}</Bdg>
                    <Bdg bg={u.s==="Actif"?C.greenL:C.redL} c={u.s==="Actif"?"#166534":C.red}>{u.s}</Bdg>
                    <button style={{...S.btnOut,padding:"5px 10px",fontSize:12}}><Eye size={12}/></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==="medecins"&&(
            <div>
              <p style={S.pageTitle}>Validation des Médecins</p>
              <p style={S.sub}>3 dossiers en attente de vérification</p>
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {PENDING_DOCS.map((d,i)=>(
                  <div key={i} style={{...S.card,display:"flex",alignItems:"center",gap:16,flexWrap:"wrap",borderLeft:`4px solid ${C.amber}`}}>
                    <Av i={d.name.split(" ").map(w=>w[0]).join("").slice(1,3)} size={52} bg={C.amberL} c={C.amberD}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:800,fontSize:15,color:C.text}}>{d.name}</div>
                      <div style={{fontSize:13,color:C.textS}}>{d.spec} · Soumis le {d.date}</div>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginTop:6}}>
                        <FileText size={14} color={C.teal}/>
                        <span style={{fontSize:13,color:C.teal,cursor:"pointer",fontWeight:600}}>{d.file}</span>
                      </div>
                    </div>
                    <Bdg bg={C.amberL} c={C.amberD}>En attente</Bdg>
                    <div style={{display:"flex",gap:8}}>
                      <button style={{...S.btnOut,padding:"8px 16px",fontSize:13,borderColor:C.red,color:C.red}}><X size={14}/>Rejeter</button>
                      <button style={{...S.btn,padding:"8px 16px",fontSize:13}}><Check size={14}/>Valider</button>
                    </div>
                  </div>
                ))}
              </div>
              <h3 style={{fontSize:15,fontWeight:800,color:C.text,margin:"28px 0 12px"}}>Médecins récemment validés</h3>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {[{name:"Dr. Amina Konaté",spec:"Cardiologue",date:"10 Mai"},{name:"Dr. Seydou Coulibaly",spec:"Généraliste",date:"08 Mai"}].map((d,i)=>(
                  <div key={i} style={{...S.card,display:"flex",alignItems:"center",gap:12,padding:"12px 16px"}}>
                    <Av i={d.name.split(" ").map(w=>w[0]).join("").slice(1,3)} size={38}/>
                    <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14,color:C.text}}>{d.name}</div><div style={{fontSize:12,color:C.textS}}>{d.spec} · Validé le {d.date}</div></div>
                    <Bdg bg={C.greenL} c="#166534">✓ Validé</Bdg>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==="revenus"&&(
            <div>
              <p style={S.pageTitle}>Revenus de la Plateforme</p>
              <p style={S.sub}>Commission WELBE-BEN : 15% par consultation</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginBottom:28}}>
                <Stat icon={<DollarSign size={22}/>} label="Revenus Mai (FCFA)" value="1.86M" color={C.teal} bg={C.tealL}/>
                <Stat icon={<TrendingUp size={22}/>} label="Croissance" value="+31%" color="#166534" bg={C.greenL}/>
                <Stat icon={<Activity size={22}/>} label="Transactions" value="620" color={C.amberD} bg={C.amberL}/>
                <Stat icon={<Users size={22}/>} label="Médecins actifs" value="87" color={C.red} bg={C.redL}/>
              </div>
              <div style={S.card}>
                <div style={{fontWeight:800,fontSize:15,color:C.text,marginBottom:16}}>Revenus mensuels (milliers FCFA)</div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={[{m:"Jan",wb:21,med:124},{m:"Fév",wb:28,med:161},{m:"Mar",wb:31,med:179},{m:"Avr",wb:26,med:152},{m:"Mai",wb:35,med:199}]}>
                    <XAxis dataKey="m" tick={{fontSize:12}}/><YAxis hide/><Tooltip/>
                    <Bar dataKey="wb" name="WELBE-BEN" fill={C.teal} radius={[4,4,0,0]} stackId="a"/>
                    <Bar dataKey="med" name="Médecins" fill={C.tealL} radius={[4,4,0,0]} stackId="a"/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {tab==="support"&&(
            <div>
              <p style={S.pageTitle}>Support & Litiges</p>
              <p style={S.sub}>2 litiges ouverts · 8 tickets de support en attente</p>
              <h3 style={{fontSize:15,fontWeight:800,color:C.text,marginBottom:12}}>Litiges ouverts</h3>
              <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:28}}>
                {[
                  {id:"LIT-001",patient:"Kofi Mensah",doc:"Dr. Seydou Coulibaly",motif:"Ordonnance non reçue",date:"12 Mai",urgent:true},
                  {id:"LIT-002",patient:"Awa Diarra",doc:"Dr. Amina Konaté",motif:"Remboursement consultation annulée",date:"10 Mai",urgent:false},
                ].map((l,i)=>(
                  <div key={i} style={{...S.card,borderLeft:`4px solid ${l.urgent?C.red:C.amber}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                      <div>
                        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                          <span style={{fontWeight:800,fontSize:14,color:C.text}}>{l.id}</span>
                          {l.urgent&&<Bdg bg={C.redL} c={C.red}>🔴 Urgent</Bdg>}
                        </div>
                        <div style={{fontSize:13,color:C.textS}}>Patient : <b style={{color:C.text}}>{l.patient}</b> · Médecin : <b style={{color:C.text}}>{l.doc}</b></div>
                        <div style={{fontSize:13,color:C.textS,marginTop:4}}>Motif : {l.motif} · {l.date}</div>
                      </div>
                      <div style={{display:"flex",gap:8}}>
                        <button style={{...S.btnOut,padding:"8px 14px",fontSize:13}}><Eye size={14}/>Voir</button>
                        <button style={{...S.btn,padding:"8px 14px",fontSize:13}}><Check size={14}/>Résoudre</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <h3 style={{fontSize:15,fontWeight:800,color:C.text,marginBottom:12}}>Tickets support récents</h3>
              <div style={{...S.card,padding:0,overflow:"hidden"}}>
                {[
                  {t:"#321",u:"Ibrahim Sow",s:"Problème de connexion vidéo",st:"Ouvert"},
                  {t:"#320",u:"Mariama Baldé",s:"Mobile Money : paiement en double",st:"En cours"},
                  {t:"#319",u:"Youssouf Traoré",s:"Médecin introuvable",st:"Résolu"},
                ].map((tk,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"13px 18px",borderBottom:`1px solid ${C.border}`}}>
                    <span style={{fontWeight:700,fontSize:13,color:C.teal,minWidth:50}}>{tk.t}</span>
                    <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14,color:C.text}}>{tk.u}</div><div style={{fontSize:12,color:C.textS}}>{tk.s}</div></div>
                    <Bdg bg={tk.st==="Résolu"?C.greenL:tk.st==="En cours"?C.amberL:C.redL} c={tk.st==="Résolu"?"#166534":tk.st==="En cours"?C.amberD:C.red}>{tk.st}</Bdg>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════════════════════════════════════
export default function App(){
  const [role,setRole]=useState(null);
  const [video,setVideo]=useState(false);

  if(video) return <VideoRoom onClose={()=>setVideo(false)}/>;
  if(!role) return <Landing setRole={setRole}/>;
  if(role==="auth") return <Auth setRole={setRole}/>;
  if(role==="patient") return <PatientDash setRole={setRole} openVideo={()=>setVideo(true)}/>;
  if(role==="doctor") return <DoctorDash setRole={setRole} openVideo={()=>setVideo(true)}/>;
  if(role==="admin") return <AdminDash setRole={setRole}/>;
  return null;
}