"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const formulas = [
  {
    name: "P'tits Gourmands",
    sub: "Pizza en famille",
    horaire: "Matin uniquement · 10h–13h",
    color: "#FF5722",
    bg: "#FFF3EE",
    border: "#FFCCBC",
    image: "/images/birthday/formula-pizza.png",
    highlight: false,
  },
  {
    name: "Formule du Lion",
    sub: "L'anniversaire complet",
    horaire: "10h–13h ou 14h–18h",
    color: "#F5A623",
    bg: "#FFFBEE",
    border: "#FFE082",
    image: "/images/birthday/formula-lion.png",
    highlight: true,
  },
  {
    name: "Gira Fun Karaoké",
    sub: "Musique & fête",
    horaire: "10h–13h ou 14h–18h",
    color: "#7C3AED",
    bg: "#F5F0FF",
    border: "#DDD6FE",
    image: "/images/birthday/formula-karaoke.png",
    highlight: false,
  },
];

function FormulaCard({ f, i, inView }: { f: typeof formulas[0]; i: number; inView: boolean }) {
  const [err, setErr] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 55 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
      className={`relative rounded-3xl overflow-visible border-2 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col ${f.highlight ? "scale-[1.03]" : ""}`}
      style={{ background: f.bg, borderColor: f.border }}
    >
      {f.highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span
            className="px-4 py-1.5 rounded-full text-white text-xs font-extrabold shadow-lg"
            style={{ background: f.color, fontFamily: "var(--font-nunito)" }}
          >
            ⭐ Plus populaire
          </span>
        </div>
      )}

      {/* Image complète sans crop */}
      <div className="rounded-t-3xl overflow-hidden" style={{ background: f.bg }}>
        {!err ? (
          <Image
            src={f.image}
            alt={f.name}
            width={420}
            height={420}
            className="w-full h-auto"
            onError={() => setErr(true)}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="h-56 img-placeholder" style={{ background: f.bg }}>
            <span className="text-4xl opacity-30">🎂</span>
            <span className="text-xs opacity-50">{f.name}</span>
          </div>
        )}
      </div>

      {/* Info + boutons */}
      <div className="px-6 pt-4 pb-6 flex flex-col gap-1 flex-1">
        <h3
          className="text-2xl font-extrabold leading-tight"
          style={{ color: f.color, fontFamily: "var(--font-baloo)" }}
        >
          {f.name}
        </h3>
        <p className="text-sm font-semibold text-amber-800/60" style={{ fontFamily: "var(--font-nunito)" }}>{f.sub}</p>
        <p className="text-xs text-amber-800/45 mb-4" style={{ fontFamily: "var(--font-nunito)" }}>⏰ {f.horaire}</p>

        <div className="flex gap-3 mt-auto">
          <a
            href="tel:0231537268"
            className="btn-shine flex-1 py-3 rounded-2xl text-center text-white font-extrabold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            style={{ background: f.color, fontFamily: "var(--font-nunito)" }}
          >
            Je réserve
          </a>
          <a
            href="#infos"
            className="flex-1 py-3 rounded-2xl text-center font-extrabold text-sm border-2 hover:scale-[1.02] transition-all duration-200"
            style={{ borderColor: f.color, color: f.color, fontFamily: "var(--font-nunito)" }}
          >
            En savoir +
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Birthday() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const starsOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={sectionRef} id="anniversaires" className="relative py-16 sm:py-24 overflow-hidden">
      {/* White base */}
      <div className="absolute inset-0" style={{ background: "#ffffff" }} />
      {/* Subtle amber radial glow top-right */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,166,35,0.13) 0%, transparent 70%)", filter: "blur(60px)" }} />
      {/* Subtle warm glow bottom-left */}
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,94,60,0.10) 0%, transparent 70%)", filter: "blur(80px)" }} />
      {/* Very faint dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: "radial-gradient(circle, #F5A623 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

      {/* Confetti left — pegado al borde superior, detrás de todo el contenido */}
      <motion.div
        className="hidden lg:block absolute pointer-events-none select-none"
        style={{ left: "-3rem", top: 0, zIndex: 0, opacity: starsOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ y: [0, -8, -2, -6, 0], rotateZ: [0, -1, 0, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/birthday/confettis-left.png" alt="" loading="lazy" style={{ height: "clamp(100px, 16vw, 220px)", width: "auto", display: "block" }} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Confetti right — pegado al borde superior, detrás de todo el contenido */}
      <motion.div
        className="hidden lg:block absolute pointer-events-none select-none"
        style={{ right: "-3rem", top: 0, zIndex: 0, opacity: starsOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ y: [0, -10, -3, -7, 0], rotateZ: [0, 1, 0, -1, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/birthday/confettis-right.png" alt="" loading="lazy" style={{ height: "clamp(100px, 16vw, 220px)", width: "auto", display: "block" }} />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative text-center mb-16"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-sm font-bold mb-4"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Des fêtes inoubliables
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-amber-900 mb-3 leading-tight break-words"
            style={{ fontFamily: "var(--font-baloo)" }}
          >
            Anniversaires{" "}
            <span className="text-pop">magiques</span>
          </h2>
          <p
            className="text-xl font-semibold text-amber-900/70 mb-6"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            De 10h à 13h ou de 14h à 18h, 3 formules au choix
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {formulas.map((f, i) => (
            <FormulaCard key={i} f={f} i={i} inView={inView} />
          ))}
        </div>

        {/* Info box con estrellas */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative mt-12 rounded-2xl px-8 py-7 text-center text-white overflow-visible"
          style={{ background: "#C0392B" }}
        >
          <p className="text-base leading-relaxed" style={{ fontFamily: "var(--font-nunito)" }}>
            Un minimum de 8 enfants est requis pour l&rsquo;organisation d&rsquo;un anniversaire.<br />
            Nous vous conseillons de réserver au moins 15 jours avant la date. Un acompte de 30 € vous sera demandé à la réservation.<br />
            Les cartons d&rsquo;invitations sont à retirer sur place au moment de la réservation ou sont envoyés par mail en cas de réservation internet.<br />
            <strong>L&rsquo;apport de bonbons, boissons ou gâteaux supplémentaires est interdit.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
