"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Wifi, Coffee, Car, Eye, Leaf, MapPin, ChevronLeft, ChevronRight, Calendar, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ── Types ──────────────────────────────────────────────
interface Destination {
  name: string;
  desc: string;
  img: string;
}

// ── Data ──────────────────────────────────────────────
const destinations: Destination[] = [
  {
    name: "Prachovské skály",
    desc: "Jedinečné skalní město v srdci Českého ráje. Labyrint pískovcových skalních věží obklopený hustými lesy. Ideální pro turistiku, horolezectví i romantické procházky.",
    img: "/images/hero.jpg",
  },
  {
    name: "Hrad Trosky",
    desc: "Symbol Českého ráje. Dva čedičové sloupy s věžemi Baby a Panny se tyčí nad krajinou jako strážci dávných tajemství.",
    img: "/images/exterior.jpg",
  },
  {
    name: "Hrubá Skála",
    desc: "Impozantní skalní labyrint s výhledem na celý Český ráj. Renesanční zámek ukrytý v přirozené skalní pevnosti.",
    img: "/images/pool.jpg",
  },
  {
    name: "Valdštejn",
    desc: "Nejstarší hrad v Českém ráji obklopený romantickými skalními soutěskami a gotickou a renesanční architekturou.",
    img: "/images/room1.jpg",
  },
  {
    name: "Malá Skála",
    desc: "Malebné údolí řeky Jizery lemované pískovcovými skalami. Turistické stezky vedou k úchvatným panoramatům.",
    img: "/images/garden.jpg",
  },
];

const galleryImages = [
  { src: "/images/hero.jpg", alt: "Krajina Českého ráje", span: "col-span-2" },
  { src: "/images/pool.jpg", alt: "Bazén", span: "col-span-2" },
  { src: "/images/garden.jpg", alt: "Zahrada", span: "col-span-2 row-span-2" },
  { src: "/images/room1.jpg", alt: "Pokoj", span: "col-span-2" },
  { src: "/images/firepit.jpg", alt: "Večerní ohniště", span: "col-span-2" },
];

// ── Components ────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "bg-cream/88 backdrop-blur-xl border-b border-gold/15 py-3.5 px-12"
          : "py-5 px-12"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full border border-gold flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
            <path d="M14 4C14 4 8 8 8 14s6 10 6 10 6-4 6-10S14 4 14 4z" stroke="#B89A6A" strokeWidth="1.2"/>
            <circle cx="14" cy="14" r="2" fill="#B89A6A" opacity="0.5"/>
          </svg>
        </div>
        <div className="font-cormorant text-dark-forest leading-tight">
          <div className="text-base font-medium tracking-widest">PENZION</div>
          <div className="text-[0.6rem] tracking-[0.15em] text-gold uppercase">U Štěstí</div>
        </div>
      </div>

      <ul className="hidden lg:flex gap-10 list-none">
        {["Pokoje", "O penzionu", "Český ráj", "Galerie", "Kontakt"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase().replace(" ", "-").replace("č", "c").replace("ý", "y")}`}
              className="text-[0.7rem] tracking-[0.14em] uppercase text-dark-forest hover:text-gold transition-colors relative group"
            >
              {item}
              <span className="absolute bottom-[-2px] left-0 w-0 h-px bg-gold transition-all group-hover:w-full" />
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#rezervace"
        className="bg-dark-forest text-cream px-6 py-2.5 text-[0.65rem] tracking-[0.14em] uppercase font-medium hover:bg-deep-moss transition-all"
      >
        Rezervovat pobyt
      </a>
    </nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0a1a14]">
      <motion.div
        style={{ y }}
        className="absolute inset-0 scale-110"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-cormorant text-cream font-light leading-none tracking-tight"
          style={{ fontSize: "clamp(5rem, 11vw, 10rem)" }}
        >
          PENZION
          <br />
          <em className="text-warm-beige">U ŠTĚSTÍ</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="font-cormorant text-cream/80 italic tracking-widest mt-6 mb-10"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
        >
          Váš domov v srdci Českého ráje
        </motion.p>

        <motion.a
          href="#rezervace"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="inline-block border border-cream/60 text-cream px-8 py-3 text-[0.7rem] tracking-[0.15em] uppercase hover:bg-cream/10 transition-all"
        >
          Rezervovat pobyt
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-cream/50 text-[0.6rem] tracking-[0.2em] uppercase"
      >
        <div className="w-px h-12 bg-gradient-to-b from-cream/50 to-transparent animate-pulse" />
        Scrollujte dolů
      </motion.div>
    </section>
  );
}

function Editorial() {
  return (
    <section id="o-penzionu" className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-12 lg:px-24 py-32 bg-cream">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="text-[0.62rem] tracking-[0.25em] uppercase text-gold mb-8">Náš příběh</p>
        <h2
          className="font-cormorant font-light text-dark-forest leading-tight mb-6"
          style={{ fontSize: "clamp(2.8rem, 4.5vw, 4.5rem)" }}
        >
          Objevte místo,
          <br />
          kde čas plyne
          <br />
          <em className="text-gold">pomaleji.</em>
        </h2>
        <div className="w-16 h-px bg-gold mb-8" />
        <p className="text-[#4a4a4a] leading-relaxed font-light max-w-md">
          Penzion U Štěstí je klidné místo obklopené přírodou Českého ráje. Nacházíme se
          uprostřed luk a lesů, daleko od shonu velkoměsta. Ideální pro odpočinek,
          romantické víkendy i aktivní dovolenou.
          <br /><br />
          Vítejte v místě, kde ráno začíná zpěvem ptáků a večer dozní v klidu hvězdné oblohy.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative flex justify-center"
      >
        <div className="relative">
          <div
            className="bg-white p-5 shadow-2xl rotate-2 max-w-sm"
            style={{ paddingBottom: "4rem" }}
          >
            <img src="/images/exterior.jpg" alt="Penzion" className="w-full h-72 object-cover" />
            <p className="text-center font-cormorant italic text-gray-500 mt-4 text-lg">
              U Štěstí, Český ráj
            </p>
          </div>
          <div
            className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border-2 border-dark-forest bg-cream flex flex-col items-center justify-center text-dark-forest -rotate-12"
          >
            <span className="text-[0.5rem] tracking-widest uppercase">Český ráj</span>
            <span className="font-cormorant text-lg italic leading-none">✦</span>
            <span className="text-[0.45rem] tracking-widest uppercase">U Štěstí</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Rooms() {
  const [idx, setIdx] = useState(0);
  const images = [
    "/images/room1.jpg",
    "/images/bathroom.jpg",
    "/images/room2.jpg",
    "/images/dining.jpg",
    "/images/bar.jpg",
  ];

  const features = [
    { icon: <Wifi size={14} />, label: "Wi-Fi zdarma" },
    { icon: <Coffee size={14} />, label: "Snídaně" },
    { icon: <Car size={14} />, label: "Parkování" },
    { icon: <Eye size={14} />, label: "Výhled do přírody" },
    { icon: <Leaf size={14} />, label: "Relax & odpočinek" },
    { icon: <Eye size={14} />, label: "Bazén" },
  ];

  return (
    <section id="pokoje" className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">
      <div className="relative overflow-hidden min-h-[50vh]">
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={images[idx]}
            alt="Pokoj"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
          <button
            onClick={() => setIdx((idx - 1 + images.length) % images.length)}
            className="w-11 h-11 border border-white/40 bg-white/15 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setIdx((idx + 1) % images.length)}
            className="w-11 h-11 border border-white/40 bg-white/15 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="bg-warm-beige px-12 lg:px-20 py-20 flex flex-col justify-center relative"
      >
        <p className="text-[0.62rem] tracking-[0.25em] uppercase text-gold mb-5">Naše pokoje</p>
        <h2
          className="font-cormorant font-light text-dark-forest leading-tight mb-6"
          style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)" }}
        >
          Pohodlí s výhledem
          <br />
          do přírody
        </h2>
        <p className="text-[#5a5a5a] leading-relaxed font-light mb-8 text-sm">
          Nabízíme útulné pokoje a apartmány zařízené v přírodním stylu. Každý z nich má
          své kouzlo a výhled, který pohladí duši. Dřevěné detaily, přírodní materiály a ticho
          — to je náš příslib pohody.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          {features.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-2 px-4 py-2 border border-gold/30 bg-white/50 text-dark-forest text-xs tracking-wide"
            >
              <span className="text-gold">{f.icon}</span>
              {f.label}
            </div>
          ))}
        </div>

        <a
          href="#pokoje"
          className="inline-block bg-dark-forest text-cream px-8 py-3 text-[0.65rem] tracking-[0.14em] uppercase font-medium hover:bg-deep-moss transition-all w-fit"
        >
          Zobrazit pokoje
        </a>
      </motion.div>
    </section>
  );
}

function CeskyRaj() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="cesky-raj"
      className="bg-dark-forest px-8 lg:px-24 py-28 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 relative overflow-hidden"
    >
      <div>
        <p className="text-[0.62rem] tracking-[0.25em] uppercase text-gold mb-8">Český ráj</p>
        <h2
          className="font-cormorant font-light text-cream leading-tight mb-12"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
        >
          Co můžete
          <br />
          zažít
        </h2>

        <ul className="border-t border-cream/10">
          {destinations.map((d, i) => (
            <li
              key={d.name}
              onClick={() => setActive(i)}
              className={`flex items-center gap-4 py-5 border-b border-cream/10 cursor-pointer transition-all ${
                active === i ? "text-cream" : "text-cream/40 hover:text-cream/70"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full border border-sandstone transition-all flex-shrink-0 ${
                  active === i ? "bg-gold shadow-[0_0_12px_rgba(184,154,106,0.5)]" : "bg-transparent"
                }`}
              />
              <MapPin size={15} className={active === i ? "text-gold" : "text-current"} />
              <span className={`text-sm tracking-wide ${active === i ? "font-medium" : ""}`}>
                {d.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
          >
            <img
              src={destinations[active].img}
              alt={destinations[active].name}
              className="w-full h-72 object-cover"
            />
            <div className="p-8">
              <h3 className="font-cormorant text-3xl font-medium text-dark-forest mb-3">
                {destinations[active].name}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                {destinations[active].desc}
              </p>
              <div className="text-[0.65rem] tracking-[0.15em] uppercase text-gold flex items-center gap-2 font-medium">
                Zjistit více <span>→</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="absolute top-8 right-0 font-cormorant text-[14rem] font-light text-white/[0.02] pointer-events-none select-none leading-none"
      >
        ✦
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="galerie" className="bg-cream px-8 lg:px-16 py-28">
      <div className="flex justify-between items-end mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-cormorant font-light text-dark-forest"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
        >
          Galerie
        </motion.h2>
        <div className="text-right">
          <p className="font-cormorant italic text-gold text-xl">
            Okolí, které si
            <br />
            zamilujete.
          </p>
          <div className="w-10 h-px bg-gold mt-3 ml-auto" />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-1.5">
        {galleryImages.map((img, i) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className={`relative overflow-hidden cursor-pointer group ${img.span} ${
              i === 2 ? "row-span-2 h-[530px]" : "h-64"
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-dark-forest/0 group-hover:bg-dark-forest/25 transition-all duration-400" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-[center_60%] brightness-[0.4] saturate-80"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-[#0a1914]/50" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-8 max-w-4xl"
      >
        <blockquote
          className="font-cormorant font-light text-cream italic leading-tight"
          style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
        >
          „Nejkrásnější vzpomínky
          <br />
          nevznikají ve spěchu."
        </blockquote>
        <div className="w-16 h-px bg-gold mx-auto mt-8" />
      </motion.div>
    </section>
  );
}

function Reservation() {
  return (
    <section id="rezervace" className="bg-warm-beige px-8 lg:px-24 py-28 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="font-cormorant font-light text-dark-forest text-[2.5rem] mb-3">
          Rezervujte
          <br />
          svůj pobyt
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed max-w-md">
          Těšíme se na vaši návštěvu v srdci Českého ráje. Vyberte termín a my se postaráme o
          zbytek.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="bg-white shadow-[0_8px_60px_rgba(15,36,29,0.08)] border border-gold/10 p-10 grid grid-cols-1 md:grid-cols-4 gap-8 items-end"
      >
        {[
          { label: "Příjezd", type: "date", defaultValue: "2024-06-20", icon: <Calendar size={15} /> },
          { label: "Odjezd", type: "date", defaultValue: "2024-06-22", icon: <Calendar size={15} /> },
        ].map((field) => (
          <div key={field.label} className="flex flex-col gap-2">
            <label className="text-[0.6rem] tracking-[0.2em] uppercase text-dark-forest font-medium">
              {field.label}
            </label>
            <div className="relative flex items-center">
              <input
                type={field.type}
                defaultValue={field.defaultValue}
                className="w-full border-0 border-b-[1.5px] border-gold/40 bg-transparent pb-2 text-sm outline-none focus:border-gold transition-colors"
              />
              <span className="absolute right-0 text-gold/40">{field.icon}</span>
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <label className="text-[0.6rem] tracking-[0.2em] uppercase text-dark-forest font-medium">
            Počet hostů
          </label>
          <div className="relative flex items-center">
            <select className="w-full border-0 border-b-[1.5px] border-gold/40 bg-transparent pb-2 text-sm outline-none focus:border-gold appearance-none cursor-pointer">
              <option>1 dospělý</option>
              <option selected>2 dospělí</option>
              <option>3 dospělí</option>
              <option>4 dospělí</option>
              <option>5+ dospělých</option>
            </select>
            <Users size={14} className="absolute right-0 text-gold/40 pointer-events-none" />
          </div>
        </div>

        <button className="bg-dark-forest text-cream py-3.5 px-8 text-[0.65rem] tracking-[0.14em] uppercase font-medium hover:bg-deep-moss transition-all whitespace-nowrap">
          Ověřit dostupnost
        </button>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="kontakt" className="bg-dark-forest text-cream relative overflow-hidden px-8 lg:px-24 pt-20 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pb-16 border-b border-cream/10 mb-8">
        <div>
          <div className="mb-6">
            <div className="font-cormorant text-2xl font-light mb-1">PENZION U ŠTĚSTÍ</div>
            <div className="text-[0.65rem] tracking-[0.15em] uppercase text-gold">Český ráj</div>
          </div>
          <p className="text-cream/40 text-sm leading-relaxed">
            Klidné místo obklopené přírodou Českého ráje. Rovensko pod Troskami — ideální
            destinace pro odpočinek a dobrodružství.
          </p>
          <div className="flex gap-3 mt-6">
            {["f", "✦", "in"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-9 h-9 border border-cream/20 flex items-center justify-center text-cream/40 hover:border-gold hover:text-gold transition-all text-xs"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gold mb-6 font-medium">Kontakt</p>
          {[
            { text: "+420 123 456 789" },
            { text: "info@penzionustesti.cz" },
            { text: "Rovensko pod Troskami 123, 512 63" },
          ].map((c) => (
            <p key={c.text} className="text-cream/40 text-sm mb-3">
              {c.text}
            </p>
          ))}
        </div>

        <div>
          <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gold mb-6 font-medium">Rychlé odkazy</p>
          <ul className="space-y-3">
            {["Pokoje", "O penzionu", "Český ráj", "Galerie", "Kontakt", "Rezervace"].map((l) => (
              <li key={l}>
                <a href="#" className="text-cream/40 hover:text-cream text-sm transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gold mb-6 font-medium">Sledujte nás</p>
          <p className="text-cream/40 text-xs leading-relaxed mb-4">
            Sdílejte své zážitky s hashtagem #PenzionUStesti
          </p>
          <div className="grid grid-cols-2 gap-1">
            {["/images/hero.jpg", "/images/exterior.jpg", "/images/room1.jpg", "/images/garden.jpg"].map(
              (img) => (
                <div key={img} className="h-16 overflow-hidden bg-white/5">
                  <img src={img} alt="" className="w-full h-full object-cover opacity-50 hover:opacity-70 transition-opacity" />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-cream/25 text-xs">
        <span>© 2024 Penzion U Štěstí. Všechna práva vyhrazena.</span>
        <span>Vytvořeno s ❤ pro Český ráj</span>
      </div>
    </footer>
  );
}

// ── Main Page ──────────────────────────────────────────
export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <Editorial />
      <Rooms />
      <CeskyRaj />
      <Gallery />
      <Quote />
      <Reservation />
      <Footer />
    </main>
  );
}
