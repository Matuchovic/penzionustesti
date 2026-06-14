"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeRoom, setActiveRoom] = useState(0);
  const [activeDest, setActiveDest] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rooms = [
    "/images/room1.jpg","/images/room2.jpg","/images/bathroom.jpg",
    "/images/dining.jpg","/images/bar.jpg"
  ];

  const destinations = [
    { name: "Prachovské skály", desc: "Jedinečné skalní město v srdci Českého ráje. Labyrint pískovcových věží obklopený hustými lesy.", img: "/images/hero.jpg" },
    { name: "Hrad Trosky", desc: "Symbol Českého ráje. Dva čedičové sloupy s věžemi Baby a Panny tyčící se nad krajinou.", img: "/images/exterior.jpg" },
    { name: "Hrubá Skála", desc: "Impozantní skalní labyrint s výhledem na celý Český ráj a renesančním zámkem.", img: "/images/pool.jpg" },
    { name: "Valdštejn", desc: "Nejstarší hrad v Českém ráji obklopený romantickými skalními soutěskami.", img: "/images/garden.jpg" },
    { name: "Malá Skála", desc: "Malebné údolí řeky Jizery lemované pískovcovými skalami a hustými lesy.", img: "/images/firepit.jpg" },
  ];

  const S: Record<string, React.CSSProperties> = {
    nav: { position:"fixed", top:0, left:0, right:0, zIndex:1000, display:"flex", alignItems:"center", justifyContent:"space-between", padding: scrolled ? "0.75rem 2.5rem" : "1.1rem 2.5rem", background: scrolled ? "rgba(5,15,8,0.85)" : "rgba(5,15,8,0.45)", backdropFilter:"blur(30px)", WebkitBackdropFilter:"blur(30px)", borderBottom:"1px solid rgba(184,154,106,0.12)", boxShadow: scrolled ? "0 0 40px rgba(184,154,106,0.08),0 8px 40px rgba(0,0,0,0.5)" : "0 2px 30px rgba(0,0,0,0.3)", transition:"all 0.5s ease" },
    logoWrap: { display:"flex", alignItems:"center", gap:"0.75rem" },
    logoText: { fontFamily:"'Cormorant Garamond',serif", fontSize:"0.95rem", fontWeight:500, letterSpacing:"0.08em", color:"#0F241D", lineHeight:1.2 },
    logoSub: { display:"block", fontSize:"0.65rem", letterSpacing:"0.15em", color:"#B89A6A", textTransform:"uppercase" as const },
    navLinks: { display:"flex", gap:"2.5rem", listStyle:"none" },
    navLink: { fontSize:"0.6rem", letterSpacing:"0.13em", textTransform:"uppercase" as const, color:"rgba(246,241,232,0.55)", fontWeight:400, transition:"color 0.3s", padding:"0 1rem" },
    btnPrimary: { background:"#0F241D", color:"#F6F1E8", padding:"0.65rem 1.6rem", fontSize:"0.72rem", letterSpacing:"0.14em", textTransform:"uppercase" as const, fontWeight:500, border:"none", cursor:"pointer", fontFamily:"'Inter',sans-serif" },
    hero: { position:"relative" as const, height:"100vh", minHeight:700, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", background:"#0a1a14" },
    heroBg: { position:"absolute" as const, inset:0, backgroundImage:"url('/images/hero.jpg')", backgroundSize:"cover", backgroundPosition:"center", opacity:0.8 },
    heroOverlay: { position:"absolute" as const, inset:0, background:"linear-gradient(180deg,rgba(10,25,18,0.3) 0%,rgba(10,25,18,0.1) 40%,rgba(10,25,18,0.65) 100%)" },
    heroContent: { position:"relative" as const, zIndex:2, textAlign:"center" as const, padding:"0 2rem" },
    heroTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(4.5rem,10vw,9rem)", fontWeight:300, color:"#F6F1E8", lineHeight:0.9, letterSpacing:"-0.02em" },
    heroTitleItalic: { display:"block", fontStyle:"italic", color:"#EFE7DA" },
    heroSubtitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.1rem,2vw,1.5rem)", color:"rgba(239,231,218,0.85)", letterSpacing:"0.08em", margin:"1.5rem 0 2.5rem", fontStyle:"italic", fontWeight:300 },
    btnOutline: { background:"transparent", color:"#F6F1E8", border:"1px solid rgba(246,241,232,0.6)", padding:"0.75rem 2rem", fontSize:"0.72rem", letterSpacing:"0.14em", textTransform:"uppercase" as const, cursor:"pointer", fontFamily:"'Inter',sans-serif" },
    scrollIndicator: { position:"absolute" as const, bottom:"2.5rem", left:"50%", transform:"translateX(-50%)", color:"rgba(239,231,218,0.6)", fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase" as const, display:"flex", flexDirection:"column" as const, alignItems:"center", gap:"0.75rem" },
    scrollLine: { width:1, height:50, background:"linear-gradient(180deg,rgba(239,231,218,0.6),transparent)" },
    editorial: { background:"#F6F1E8", padding:"8rem 6rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6rem", alignItems:"center" } as React.CSSProperties,
    eyebrow: { fontSize:"0.62rem", letterSpacing:"0.25em", textTransform:"uppercase" as const, color:"#B89A6A", marginBottom:"2rem" },
    sectionTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.8rem,4.5vw,4.5rem)", fontWeight:400, lineHeight:1.05, color:"#0F241D", marginBottom:"1.5rem" },
    divider: { width:60, height:1, background:"#B89A6A", margin:"0 0 2rem" },
    bodyText: { fontSize:"1rem", lineHeight:1.9, color:"#4a4a4a", fontWeight:300, maxWidth:440 },
    polaroid: { background:"#fff", padding:"1.2rem 1.2rem 3.5rem", boxShadow:"4px 4px 30px rgba(0,0,0,0.12)", transform:"rotate(2deg)", maxWidth:380, margin:"0 auto", position:"relative" as const },
    polaroidImg: { width:"100%", height:300, objectFit:"cover" as const },
    polaroidCaption: { textAlign:"center" as const, fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", color:"#888", marginTop:"1rem", fontStyle:"italic" },
    stamp: { position:"absolute" as const, bottom:-20, right:-20, width:100, height:100, borderRadius:"50%", border:"2px solid #0F241D", background:"#F6F1E8", display:"flex", flexDirection:"column" as const, alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", textAlign:"center" as const, color:"#0F241D", transform:"rotate(-10deg)" },
    rooms: { display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"85vh" } as React.CSSProperties,
    roomsLeft: { position:"relative" as const, overflow:"hidden", minHeight:500 },
    roomsImg: { position:"absolute" as const, inset:0, width:"100%", height:"100%", objectFit:"cover" as const, transition:"opacity 0.6s ease" },
    roomNav: { position:"absolute" as const, top:"50%", transform:"translateY(-50%)", display:"flex", justifyContent:"space-between", width:"100%", padding:"0 1rem", pointerEvents:"none" as const },
    roomBtn: { width:44, height:44, border:"1px solid rgba(246,241,232,0.5)", background:"rgba(246,241,232,0.15)", backdropFilter:"blur(8px)", color:"#F6F1E8", fontSize:"1.2rem", cursor:"pointer", pointerEvents:"all" as const },
    roomsRight: { background:"#EFE7DA", padding:"5rem 4rem", display:"flex", flexDirection:"column" as const, justifyContent:"center", position:"relative" as const },
    features: { display:"flex", flexWrap:"wrap" as const, gap:"0.75rem", margin:"2rem 0" },
    featureTag: { padding:"0.5rem 1rem", border:"1px solid rgba(184,154,106,0.3)", fontSize:"0.75rem", letterSpacing:"0.06em", color:"#0F241D", background:"rgba(255,255,255,0.5)" },
    ceskyRaj: { background:"#0F241D", padding:"7rem 6rem", display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:"5rem", alignItems:"start", position:"relative", overflow:"hidden" } as React.CSSProperties,
    ceskyList: { listStyle:"none", borderTop:"1px solid rgba(215,195,164,0.15)" },
    ceskyItem: { display:"flex", alignItems:"center", gap:"1rem", padding:"1.2rem 0", borderBottom:"1px solid rgba(215,195,164,0.15)", cursor:"pointer", transition:"all 0.3s" },
    destCard: { background:"#fff", boxShadow:"0 20px 60px rgba(0,0,0,0.4)", overflow:"hidden" },
    destImg: { width:"100%", height:300, objectFit:"cover" as const, display:"block" },
    destInfo: { padding:"2rem" },
    destName: { fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:500, color:"#0F241D", marginBottom:"0.5rem" },
    destDesc: { fontSize:"0.875rem", color:"#666", lineHeight:1.7, marginBottom:"1.5rem" },
    destLink: { fontSize:"0.7rem", letterSpacing:"0.15em", textTransform:"uppercase" as const, color:"#B89A6A", fontWeight:500 },
    gallery: { background:"#F6F1E8", padding:"7rem 4rem" },
    galleryHeader: { display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"3.5rem" },
    galleryTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.5rem,4vw,4rem)", fontWeight:400, color:"#0F241D" },
    galleryGrid: { display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:"0.5rem" },
    quoteSection: { position:"relative" as const, minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" },
    quoteBg: { position:"absolute" as const, inset:0, backgroundImage:"url('/images/hero.jpg')", backgroundSize:"cover", backgroundPosition:"center 60%", filter:"brightness(0.4)" },
    quoteOverlay: { position:"absolute" as const, inset:0, background:"rgba(10,25,18,0.5)" },
    quoteContent: { position:"relative" as const, zIndex:2, textAlign:"center" as const, padding:"0 4rem" },
    quoteText: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,4.5vw,4rem)", fontWeight:300, color:"#F6F1E8", lineHeight:1.25, fontStyle:"italic" },
    quoteLine: { width:60, height:1, background:"#B89A6A", margin:"2.5rem auto 0" },
    reservation: { background:"#EFE7DA", padding:"7rem 6rem" } as React.CSSProperties,
    resTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,3vw,3rem)", fontWeight:400, color:"#0F241D", marginBottom:"1rem" },
    resSub: { fontSize:"0.9rem", color:"#666", lineHeight:1.7, maxWidth:420, marginBottom:"3rem" },
    resForm: { background:"#fff", padding:"2.5rem", boxShadow:"0 8px 60px rgba(15,36,29,0.08)", border:"1px solid rgba(184,154,106,0.1)", display:"grid", gridTemplateColumns:"1fr 1fr 1fr auto", gap:"2rem", alignItems:"end" } as React.CSSProperties,
    formGroup: { display:"flex", flexDirection:"column" as const, gap:"0.5rem" },
    formLabel: { fontSize:"0.62rem", letterSpacing:"0.2em", textTransform:"uppercase" as const, color:"#0F241D", fontWeight:500 },
    formInput: { border:"none", borderBottom:"1.5px solid rgba(184,154,106,0.4)", background:"transparent", padding:"0.75rem 0", fontSize:"0.9rem", outline:"none", fontFamily:"'Inter',sans-serif" },
    btnReserve: { background:"#0F241D", color:"#F6F1E8", border:"none", padding:"0.9rem 2rem", fontSize:"0.72rem", letterSpacing:"0.14em", textTransform:"uppercase" as const, cursor:"pointer", whiteSpace:"nowrap" as const, fontFamily:"'Inter',sans-serif" },
    footer: { background:"#0F241D", color:"#F6F1E8", padding:"5rem 6rem 3rem", position:"relative" } as React.CSSProperties,
    footerGrid: { display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1fr", gap:"4rem", marginBottom:"4rem", borderBottom:"1px solid rgba(215,195,164,0.12)", paddingBottom:"4rem" } as React.CSSProperties,
    footerLogoName: { fontFamily:"'Cormorant Garamond',serif", fontSize:"1.5rem", color:"#F6F1E8", marginBottom:"0.25rem" },
    footerLogoSub: { fontSize:"0.65rem", letterSpacing:"0.15em", color:"#B89A6A", textTransform:"uppercase" as const, marginBottom:"1.5rem" },
    footerDesc: { fontSize:"0.85rem", color:"rgba(239,231,218,0.45)", lineHeight:1.8 },
    footerHeading: { fontSize:"0.62rem", letterSpacing:"0.2em", textTransform:"uppercase" as const, color:"#B89A6A", marginBottom:"1.5rem", fontWeight:500 },
    footerLink: { fontSize:"0.85rem", color:"rgba(239,231,218,0.45)", display:"block", marginBottom:"0.8rem" },
    footerBottom: { display:"flex", justifyContent:"space-between", fontSize:"0.75rem", color:"rgba(239,231,218,0.25)" },
    socialRow: { display:"flex", gap:"0.75rem", marginTop:"1.5rem" },
    socialBtn: { width:36, height:36, border:"1px solid rgba(215,195,164,0.2)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(239,231,218,0.4)", fontSize:"0.75rem", cursor:"pointer" },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; overflow-x: hidden; }
        body { font-family: 'Inter', sans-serif; background: #F6F1E8; overflow-x: hidden; }
        img { display: block; max-width: 100%; }
        a { text-decoration: none; color: inherit; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        .hero-title { animation: fadeInUp 1.4s ease 0.3s both; }
        .hero-sub { animation: fadeInUp 1.2s ease 0.7s both; }
        .hero-cta { animation: fadeInUp 1s ease 1s both; }
        .scroll-line { animation: pulse 2s ease infinite; }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes expand-line{to{width:90px}}
        @keyframes fade-up{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
        .logo-top{animation:fade-up 0.8s ease 0s both}
        .logo-main{animation:fade-up 0.8s ease 0.15s both}
        .logo-line{width:0;height:1px;background:linear-gradient(90deg,transparent,#B89A6A,transparent);animation:expand-line 1.8s ease 0.3s forwards}
        .logo-sub-txt{animation:fade-up 0.8s ease 0.3s both}
        @keyframes liq1{0%,100%{width:28px}50%{width:22px}}
        @keyframes liq2{0%,100%{width:20px}50%{width:14px;transform:translateX(4px)}}
        @keyframes liq3{0%,100%{width:28px}50%{width:24px}}
        .liq-l{height:2px;background:#e8dcc8;border-radius:2px;transition:width 0.45s cubic-bezier(0.4,0,0.2,1),transform 0.45s cubic-bezier(0.4,0,0.2,1),background 0.3s,box-shadow 0.3s,opacity 0.3s}
        .liq-l1{animation:liq1 3s ease-in-out infinite}
        .liq-l2{animation:liq2 3s ease-in-out infinite 0.5s}
        .liq-l3{animation:liq3 3s ease-in-out infinite 1s}
        .liq-open1{animation:none!important;width:24px!important;transform:rotate(45deg) translate(5px,6px)!important;background:#B89A6A!important;box-shadow:0 0 12px rgba(184,154,106,0.9),0 0 28px rgba(184,154,106,0.4)!important}
        .liq-open2{animation:none!important;width:0!important;opacity:0!important}
        .liq-open3{animation:none!important;width:24px!important;transform:rotate(-45deg) translate(5px,-6px)!important;background:#B89A6A!important;box-shadow:0 0 12px rgba(184,154,106,0.9),0 0 28px rgba(184,154,106,0.4)!important}
        .nav-links-desktop { display: flex; }
        .nav-cta-desktop { display: block; }
        .hamburger { display: none; }
        .mobile-menu { display: none; }
        .mobile-menu.open { display: flex; }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .hamburger { display: flex !important; }
          .editorial-grid { grid-template-columns: 1fr !important; padding: 4rem 1.5rem !important; gap: 3rem !important; }
          .rooms-grid { grid-template-columns: 1fr !important; }
          .rooms-right-pad { padding: 3rem 1.5rem !important; }
          .cesky-grid { grid-template-columns: 1fr !important; padding: 4rem 1.5rem !important; gap: 2rem !important; }
          .gallery-grid-mobile { grid-template-columns: 1fr 1fr !important; }
          .gallery-item-tall { grid-row: span 1 !important; height: 200px !important; }
          .gallery-item-short { height: 200px !important; }
          .res-form-grid { grid-template-columns: 1fr !important; padding: 1.5rem !important; }
          .footer-grid-mobile { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; padding: 3rem 1.5rem 2rem !important; }
          .quote-pad { padding: 0 1.5rem !important; }
          .reservation-pad { padding: 4rem 1.5rem !important; }
          .polaroid-wrap { transform: rotate(0deg) !important; max-width: 100% !important; }
          .hero-title-mobile { font-size: clamp(3rem,14vw,5rem) !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={S.nav}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.1rem",cursor:"pointer"}}>
          <div className="logo-top" style={{fontFamily:"'Inter',sans-serif",fontSize:"0.42rem",letterSpacing:"0.45em",textTransform:"uppercase" as const,color:"rgba(184,154,106,0.6)",fontWeight:300}}>Penzion</div>
          <div className="logo-main" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:300,color:"#F6F1E8",letterSpacing:"0.04em",lineHeight:1}}>U <em style={{fontStyle:"italic",color:"#B89A6A"}}>Štěstí</em></div>
          <div className="logo-line"></div>
          <div className="logo-sub-txt" style={{fontFamily:"'Inter',sans-serif",fontSize:"0.38rem",letterSpacing:"0.38em",textTransform:"uppercase" as const,color:"rgba(184,154,106,0.45)",fontWeight:300}}>Český ráj</div>
        </div>
        <ul className="nav-links-desktop" style={S.navLinks}>
          {["Pokoje","O penzionu","Český ráj","Galerie","Kontakt"].map(item => (
            <li key={item}><a href={`#${item.toLowerCase().replace(" ","-")}`} style={S.navLink}>{item}</a></li>
          ))}
        </ul>
        <button className="nav-cta-desktop" style={{background:"linear-gradient(135deg,rgba(184,154,106,0.2),rgba(184,154,106,0.08))",border:"1px solid rgba(184,154,106,0.3)",padding:"0.55rem 1.4rem",fontSize:"0.6rem",letterSpacing:"0.14em",textTransform:"uppercase" as const,color:"#C9AA7A",cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>Rezervovat pobyt</button>
        <button className="hamburger liq-btn" onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"none",cursor:"pointer",flexDirection:"column" as const,gap:"5px",padding:"8px",display:"flex",alignItems:"flex-start"}}>
          <span className={menuOpen?"liq-l liq-l1 liq-open1":"liq-l liq-l1"} style={{display:"block"}}/>
          <span className={menuOpen?"liq-l liq-l2 liq-open2":"liq-l liq-l2"} style={{display:"block"}}/>
          <span className={menuOpen?"liq-l liq-l3 liq-open3":"liq-l liq-l3"} style={{display:"block"}}/>
        </button>
      </nav>
      {menuOpen && (
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:999,background:"rgba(5,15,8,0.97)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",flexDirection:"column" as const,alignItems:"center",justifyContent:"center"}}>
          <button onClick={()=>setMenuOpen(false)} style={{position:"absolute",top:"1.5rem",right:"1.5rem",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column" as const,gap:"6px",padding:"8px"}}>
            <span style={{width:26,height:2,background:"#F6F1E8",display:"block",transform:"rotate(45deg) translate(0,8px)"}}/>
            <span style={{width:26,height:2,background:"#F6F1E8",display:"block",opacity:0}}/>
            <span style={{width:26,height:2,background:"#F6F1E8",display:"block",transform:"rotate(-45deg) translate(0,-8px)"}}/>
          </button>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:"0.5rem",letterSpacing:"0.3em",textTransform:"uppercase" as const,color:"rgba(184,154,106,0.4)",marginBottom:"3rem"}}>Menu</div>
          {["Pokoje","O penzionu","Český ráj","Galerie","Kontakt"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(" ","-")}`} onClick={()=>setMenuOpen(false)}
              style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2.8rem",fontWeight:300,color:"#F6F1E8",letterSpacing:"0.06em",padding:"0.7rem 0",borderBottom:"1px solid rgba(184,154,106,0.1)",width:"70%",textAlign:"center" as const}}>
              {item}
            </a>
          ))}
          <button onClick={()=>setMenuOpen(false)} style={{marginTop:"3rem",background:"linear-gradient(135deg,rgba(184,154,106,0.2),rgba(184,154,106,0.08))",border:"1px solid rgba(184,154,106,0.4)",padding:"0.9rem 3rem",fontSize:"0.65rem",letterSpacing:"0.15em",textTransform:"uppercase" as const,color:"#C9AA7A",cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>Rezervovat pobyt</button>
        </div>
      )}
      {/* HERO */}
      <section style={S.hero}>
        <div style={S.heroBg}/>
        <div style={S.heroOverlay}/>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.92) 100%)",zIndex:1,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"35%",background:"linear-gradient(180deg,rgba(0,0,0,0.75) 0%,transparent 100%)",zIndex:1,pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"40%",background:"linear-gradient(0deg,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.5) 50%,transparent 100%)",zIndex:1,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:0,bottom:0,left:0,width:"20%",background:"linear-gradient(90deg,rgba(0,0,0,0.7) 0%,transparent 100%)",zIndex:1,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:0,bottom:0,right:0,width:"20%",background:"linear-gradient(270deg,rgba(0,0,0,0.7) 0%,transparent 100%)",zIndex:1,pointerEvents:"none"}}/>
        <div style={S.heroContent}>
          <h1 className="hero-title hero-title-mobile" style={S.heroTitle}>
            PENZION<span style={S.heroTitleItalic}>U ŠTĚSTÍ</span>
          </h1>
          <p className="hero-sub" style={S.heroSubtitle}>Váš domov v srdci Českého ráje</p>
          <div className="hero-cta">
            <button style={S.btnOutline}>REZERVOVAT POBYT</button>
          </div>
        </div>
        <div style={S.scrollIndicator}>
          <div className="scroll-line" style={S.scrollLine}/>
          SCROLLUJTE DOLŮ
        </div>
      </section>

      {/* EDITORIAL */}
      <section id="o-penzionu" className="editorial-grid" style={S.editorial}>
        <div>
          <p style={S.eyebrow}>Náš příběh</p>
          <h2 style={S.sectionTitle}>
            Objevte místo,<br/>kde čas plyne<br/><em style={{color:"#B89A6A"}}>pomaleji.</em>
          </h2>
          <div style={S.divider}/>
          <p style={S.bodyText}>
            Penzion U Štěstí je klidné místo obklopené přírodou Českého ráje. Nacházíme se uprostřed luk a lesů, daleko od shonu velkoměsta. Ideální pro odpočinek, romantické víkendy i aktivní dovolenou.<br/><br/>
            Vítejte v místě, kde ráno začíná zpěvem ptáků a večer dozní v klidu hvězdné oblohy.
          </p>
        </div>
        <div style={{position:"relative",display:"flex",justifyContent:"center"}}>
          <div style={S.polaroid}>
            <img src="/images/exterior.jpg" alt="Penzion" style={S.polaroidImg}/>
            <p style={S.polaroidCaption}>U Štěstí, Český ráj</p>
          </div>
          <div style={S.stamp}>
            <span style={{fontSize:"0.5rem",letterSpacing:"0.12em",textTransform:"uppercase" as const}}>Český ráj</span>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",lineHeight:1}}>✦</span>
            <span style={{fontSize:"0.45rem",letterSpacing:"0.1em",textTransform:"uppercase" as const}}>U Štěstí</span>
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section id="pokoje" className="rooms-grid" style={S.rooms}>
        <div style={S.roomsLeft}>
          <img key={activeRoom} src={rooms[activeRoom]} alt="Pokoj" style={S.roomsImg}/>
          <div style={S.roomNav}>
            <button style={S.roomBtn} onClick={()=>setActiveRoom((activeRoom-1+rooms.length)%rooms.length)}>←</button>
            <button style={S.roomBtn} onClick={()=>setActiveRoom((activeRoom+1)%rooms.length)}>→</button>
          </div>
        </div>
        <div className="rooms-right-pad" style={S.roomsRight}>
          <p style={S.eyebrow}>Naše pokoje</p>
          <h2 style={{...S.sectionTitle,fontSize:"clamp(2.2rem,3.5vw,3.5rem)"}}>Pohodlí s výhledem<br/>do přírody</h2>
          <p style={{...S.bodyText,marginBottom:"1rem"}}>Nabízíme útulné pokoje a apartmány zařízené v přírodním stylu. Každý z nich má své kouzlo a výhled, který pohladí duši.</p>
          <div style={S.features}>
            {["Wi-Fi zdarma","Snídaně","Parkování","Výhled do přírody","Relax & odpočinek","Bazén"].map(f=>(
              <span key={f} style={S.featureTag}>{f}</span>
            ))}
          </div>
          <button style={S.btnPrimary}>ZOBRAZIT POKOJE</button>
        </div>
      </section>

      {/* ČESKÝ RÁJ */}
      <section id="český-ráj" className="cesky-grid" style={S.ceskyRaj}>
        <div>
          <p style={{...S.eyebrow,color:"#B89A6A"}}>Český ráj</p>
          <h2 style={{...S.sectionTitle,color:"#F6F1E8",marginBottom:"3rem"}}>Co můžete<br/>zažít</h2>
          <ul style={S.ceskyList}>
            {destinations.map((d,i)=>(
              <li key={d.name} style={{...S.ceskyItem,color:activeDest===i?"#F6F1E8":"rgba(239,231,218,0.4)"}} onClick={()=>setActiveDest(i)}>
                <span style={{width:8,height:8,borderRadius:"50%",border:"1px solid #D7C3A4",background:activeDest===i?"#B89A6A":"transparent",flexShrink:0,display:"inline-block"}}/>
                <span style={{fontSize:"0.9rem",letterSpacing:"0.03em",fontWeight:activeDest===i?500:400}}>{d.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={S.destCard}>
          <img src={destinations[activeDest].img} alt={destinations[activeDest].name} style={S.destImg}/>
          <div style={S.destInfo}>
            <h3 style={S.destName}>{destinations[activeDest].name}</h3>
            <p style={S.destDesc}>{destinations[activeDest].desc}</p>
            <span style={S.destLink}>ZJISTIT VÍCE →</span>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="galerie" style={S.gallery}>
        <div style={S.galleryHeader}>
          <h2 style={S.galleryTitle}>Galerie</h2>
          <div style={{textAlign:"right" as const}}>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",color:"#B89A6A",fontSize:"1.3rem"}}>Okolí, které si<br/>zamilujete.</p>
            <div style={{width:40,height:1,background:"#B89A6A",marginTop:"0.75rem",marginLeft:"auto"}}/>
          </div>
        </div>
        <div className="gallery-grid-mobile" style={S.galleryGrid}>
          {[
            {src:"/images/hero.jpg",col:"span 2",h:260},
            {src:"/images/pool.jpg",col:"span 2",h:260},
            {src:"/images/garden.jpg",col:"span 2",h:530,row:"span 2",tall:true},
            {src:"/images/room1.jpg",col:"span 2",h:260},
            {src:"/images/firepit.jpg",col:"span 2",h:260},
          ].map((img,i)=>(
            <div key={i} style={{gridColumn:img.col,gridRow:img.row||"span 1",height:img.h,overflow:"hidden",position:"relative" as const}}>
              <img src={img.src} alt="" style={{width:"100%",height:"100%",objectFit:"cover" as const,transition:"transform 0.6s ease"}}
                onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.08)")}
                onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}
              />
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section style={S.quoteSection}>
        <div style={S.quoteBg}/>
        <div style={S.quoteOverlay}/>
        <div className="quote-pad" style={S.quoteContent}>
          <blockquote style={S.quoteText}>„Nejkrásnější vzpomínky<br/>nevznikají ve spěchu."</blockquote>
          <div style={S.quoteLine}/>
        </div>
      </section>

      {/* RESERVATION */}
      <section id="rezervace" className="reservation-pad" style={S.reservation}>
        <h2 style={S.resTitle}>Rezervujte<br/>svůj pobyt</h2>
        <p style={S.resSub}>Těšíme se na vaši návštěvu v srdci Českého ráje. Vyberte termín a my se postaráme o zbytek.</p>
        <div className="res-form-grid" style={S.resForm}>
          <div style={S.formGroup}>
            <label style={S.formLabel}>Příjezd</label>
            <input type="date" defaultValue="2024-06-20" style={S.formInput}/>
          </div>
          <div style={S.formGroup}>
            <label style={S.formLabel}>Odjezd</label>
            <input type="date" defaultValue="2024-06-22" style={S.formInput}/>
          </div>
          <div style={S.formGroup}>
            <label style={S.formLabel}>Počet hostů</label>
            <select style={S.formInput}>
              <option>1 dospělý</option>
              <option>2 dospělí</option>
              <option>3 dospělí</option>
              <option>4 dospělí</option>
            </select>
          </div>
          <button style={S.btnReserve}>OVĚŘIT DOSTUPNOST</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="kontakt" style={{background:"#0F241D",color:"#F6F1E8",position:"relative" as const,overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:"linear-gradient(90deg,transparent,rgba(184,154,106,0.4),transparent)"}}/>
        <div style={{padding: isMobile ? "3rem 1.5rem 2rem" : "5rem 6rem 3rem"}}>
          {isMobile ? (
            <div style={{display:"flex",flexDirection:"column" as const,gap:"2.5rem"}}>
              <div style={{textAlign:"center" as const}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontWeight:300,color:"#F6F1E8",letterSpacing:"0.1em"}}>PENZION</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontStyle:"italic",fontWeight:300,color:"#B89A6A",letterSpacing:"0.06em",marginTop:"-0.2rem"}}>U Štěstí</div>
                <div style={{width:60,height:1,background:"linear-gradient(90deg,transparent,#B89A6A,transparent)",margin:"1rem auto"}}/>
                <div style={{fontSize:"0.5rem",letterSpacing:"0.3em",textTransform:"uppercase" as const,color:"rgba(184,154,106,0.5)"}}>Český ráj · Rovensko pod Troskami</div>
                <div style={{display:"flex",justifyContent:"center",gap:"0.75rem",marginTop:"1.5rem"}}>
                  {["f","ig","in"].map(s=>(
                    <div key={s} style={{width:38,height:38,border:"1px solid rgba(184,154,106,0.25)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(239,231,218,0.4)",fontSize:"0.7rem",cursor:"pointer"}}>{s}</div>
                  ))}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2rem"}}>
                <div>
                  <p style={{fontSize:"0.55rem",letterSpacing:"0.2em",textTransform:"uppercase" as const,color:"#B89A6A",marginBottom:"1.2rem",fontWeight:500}}>Kontakt</p>
                  <p style={{fontSize:"0.85rem",color:"rgba(239,231,218,0.5)",marginBottom:"0.6rem",lineHeight:1.6}}>+420 123 456 789</p>
                  <p style={{fontSize:"0.85rem",color:"rgba(239,231,218,0.5)",marginBottom:"0.6rem",lineHeight:1.6}}>info@penzionustesti.cz</p>
                  <p style={{fontSize:"0.8rem",color:"rgba(239,231,218,0.4)",lineHeight:1.6}}>Rovensko pod Troskami 123, 512 63</p>
                </div>
                <div>
                  <p style={{fontSize:"0.55rem",letterSpacing:"0.2em",textTransform:"uppercase" as const,color:"#B89A6A",marginBottom:"1.2rem",fontWeight:500}}>Menu</p>
                  {["Pokoje","O penzionu","Český ráj","Galerie","Kontakt","Rezervace"].map(l=>(
                    <a key={l} href="#" style={{fontSize:"0.85rem",color:"rgba(239,231,218,0.45)",display:"block",marginBottom:"0.6rem",letterSpacing:"0.02em"}}>{l}</a>
                  ))}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"0.4rem",borderRadius:"4px",overflow:"hidden"}}>
                {["/images/hero.jpg","/images/pool.jpg","/images/room1.jpg","/images/garden.jpg"].map(src=>(
                  <div key={src} style={{height:70,overflow:"hidden"}}>
                    <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover" as const,opacity:0.55}}/>
                  </div>
                ))}
              </div>
              <div style={{borderTop:"1px solid rgba(215,195,164,0.1)",paddingTop:"1.5rem",display:"flex",flexDirection:"column" as const,alignItems:"center",gap:"0.5rem",textAlign:"center" as const}}>
                <span style={{fontSize:"0.72rem",color:"rgba(239,231,218,0.2)"}}>© 2026 Penzion U Štěstí. Všechna práva vyhrazena.</span>
              </div>
            </div>
          ) : (
            <>
              <div style={{display:"grid",gridTemplateColumns:"1.8fr 1fr 1fr 1fr",gap:"4rem",marginBottom:"4rem",borderBottom:"1px solid rgba(215,195,164,0.1)",paddingBottom:"4rem"}}>
                <div>
                  <div style={{marginBottom:"1.5rem"}}>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:300,color:"#F6F1E8",letterSpacing:"0.1em",lineHeight:1}}>PENZION</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontStyle:"italic",fontWeight:300,color:"#B89A6A",letterSpacing:"0.06em",lineHeight:1}}>U Štěstí</div>
                    <div style={{width:50,height:1,background:"linear-gradient(90deg,transparent,#B89A6A,transparent)",margin:"0.8rem 0"}}/>
                    <div style={{fontSize:"0.48rem",letterSpacing:"0.25em",textTransform:"uppercase" as const,color:"rgba(184,154,106,0.4)"}}>Český ráj</div>
                  </div>
                  <p style={{fontSize:"0.85rem",color:"rgba(239,231,218,0.4)",lineHeight:1.9,maxWidth:280}}>Klidné místo obklopené přírodou Českého ráje. Rovensko pod Troskami — ideální destinace pro odpočinek a dobrodružství.</p>
                  <div style={{display:"flex",gap:"0.75rem",marginTop:"1.5rem"}}>
                    {["f","ig","in"].map(s=>(
                      <div key={s} style={{width:38,height:38,border:"1px solid rgba(184,154,106,0.2)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(239,231,218,0.35)",fontSize:"0.7rem",cursor:"pointer",transition:"all 0.3s"}}>{s}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{fontSize:"0.55rem",letterSpacing:"0.22em",textTransform:"uppercase" as const,color:"#B89A6A",marginBottom:"1.5rem",fontWeight:500}}>Kontakt</p>
                  <p style={{fontSize:"0.85rem",color:"rgba(239,231,218,0.45)",marginBottom:"0.8rem"}}>+420 123 456 789</p>
                  <p style={{fontSize:"0.85rem",color:"rgba(239,231,218,0.45)",marginBottom:"0.8rem"}}>info@penzionustesti.cz</p>
                  <p style={{fontSize:"0.82rem",color:"rgba(239,231,218,0.3)",lineHeight:1.6}}>Rovensko pod Troskami 123<br/>512 63</p>
                </div>
                <div>
                  <p style={{fontSize:"0.55rem",letterSpacing:"0.22em",textTransform:"uppercase" as const,color:"#B89A6A",marginBottom:"1.5rem",fontWeight:500}}>Rychlé odkazy</p>
                  {["Pokoje","O penzionu","Český ráj","Galerie","Kontakt","Rezervace"].map(l=>(
                    <a key={l} href="#" style={{fontSize:"0.85rem",color:"rgba(239,231,218,0.4)",display:"block",marginBottom:"0.75rem",transition:"color 0.2s"}}>{l}</a>
                  ))}
                </div>
                <div>
                  <p style={{fontSize:"0.55rem",letterSpacing:"0.22em",textTransform:"uppercase" as const,color:"#B89A6A",marginBottom:"1.5rem",fontWeight:500}}>Sledujte nás</p>
                  <p style={{fontSize:"0.75rem",color:"rgba(239,231,218,0.3)",marginBottom:"1rem",letterSpacing:"0.05em"}}>#PenzionUStesti</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.4rem"}}>
                    {["/images/hero.jpg","/images/pool.jpg","/images/room1.jpg","/images/garden.jpg"].map(src=>(
                      <div key={src} style={{height:65,overflow:"hidden",borderRadius:"2px"}}>
                        <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover" as const,opacity:0.5}}/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"0.72rem",color:"rgba(239,231,218,0.2)"}}>
                <span>© 2026 Penzion U Štěstí. Všechna práva vyhrazena.</span>
                <span>Rovensko pod Troskami · Český ráj</span>
              </div>
            </>
          )}
        </div>
      </footer>
    </>
  );
}
