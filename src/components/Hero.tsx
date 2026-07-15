"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useMounted } from "@/hooks/useMounted";
import YouTubeHeroBg from "./YouTubeHeroBg";

function CountUp({ to, duration = 1800 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return <span ref={ref}>{count.toLocaleString("fr-FR")}</span>;
}

// Conservé pour un usage futur (autres sections) — plus utilisé dans le hero
// depuis le passage à la vidéo de fond.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const slides: { src: string; flip?: boolean }[] = [
  { src: "/images/slider/slider-1.jpg" },
  { src: "/images/slider/slider-2.png" },
  { src: "/images/slider/slider-3.png" },
  { src: "/images/slider/slider-4.jpg" },
  { src: "/images/slider/slider-5.png" },
  { src: "/images/slider/slider-6.jpg" },
  { src: "/images/slider/slider-7.jpg" },
  { src: "/images/slider/slider-8.png", flip: true },
  { src: "/images/slider/slider-9.jpg" },
];

const stats = [
  {
    icon: (
      // Arrows pointing outward — surface/espace
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="#F5A623" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="30 6 42 6 42 18" />
        <polyline points="18 42 6 42 6 30" />
        <line x1="42" y1="6" x2="28" y2="20" />
        <line x1="6" y1="42" x2="20" y2="28" />
        <polyline points="6 18 6 6 18 6" />
        <polyline points="42 30 42 42 30 42" />
        <line x1="6" y1="6" x2="20" y2="20" />
        <line x1="42" y1="42" x2="28" y2="28" />
      </svg>
    ),
    prefix: "", to: 1300, suffix: " m²",
    label: "de jeux couverts",
  },
  {
    icon: (
      // Lightning bolt — activités dynamiques
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="#F5A623" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="26 4 6 28 24 28 22 44 42 20 24 20 26 4" />
      </svg>
    ),
    prefix: "", to: 9, suffix: "+",
    label: "activités uniques",
  },
  {
    icon: (
      // Star — avis clients
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="#F5A623" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="24 5 29.5 17.5 43 19 33 28.5 35.5 42 24 35.5 12.5 42 15 28.5 5 19 18.5 17.5 24 5" />
      </svg>
    ),
    prefix: "+", to: 500, suffix: "",
    label: "avis · Note 4,8/5 ⭐",
  },
  {
    icon: (
      // Map pin — 2 sites en Normandie
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="#F5A623" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 44c8-9 13-15.5 13-23a13 13 0 0 0-26 0c0 7.5 5 14 13 23z" />
        <circle cx="24" cy="20" r="5" />
      </svg>
    ),
    prefix: "", to: 2, suffix: "",
    label: "sites près de Caen",
  },
];

export default function Hero() {
  const mounted = useMounted();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-visible"
      style={{ height: "100svh", minHeight: 560 }}
    >
      {/* ── Fond vidéo YouTube (boucle 0:03 → 0:38) ── */}
      <YouTubeHeroBg />

      {/* ── Dark gradient overlay ── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(28,16,8,0.75) 0%, rgba(28,16,8,0.42) 55%, rgba(28,16,8,0.18) 100%)",
        }}
      />

      {/* ── Bottom gradient — fades into page bg ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: 220,
          background: "linear-gradient(to bottom, transparent 0%, rgba(28,16,8,0.6) 55%, #FFF8E1 100%)",
        }}
      />

      {/* ── Giraffe mascot — desktop/tablet only, keeps the mobile hero uncluttered ── */}
      <motion.div
        className="hidden sm:block absolute right-0 z-20 pointer-events-none select-none"
        style={{ bottom: "22%", opacity: overlayOpacity }}
        initial={mounted ? { opacity: 0, x: 80, scale: 0.85 } : false}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ scaleX: [1, 1.12, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: "60%", height: 24,
            background: "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
        <motion.div
          animate={{ y: [0, -26, -5, -20, 0], rotateZ: [0, 1.5, 0, -1.5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ perspective: 900, transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ rotateY: [0, 8, 0, -8, 0], rotateX: [0, 3, 6, 2, 0], scale: [1, 1.04, 1.01, 1.03, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/girafou-mascotte.png"
              alt="Mascotte Girafou"
              style={{
                height: "clamp(170px, 34vh, 520px)",
                width: "auto",
                display: "block",
                filter: "drop-shadow(-8px 20px 30px rgba(0,0,0,0.5)) drop-shadow(0 0 60px rgba(245,166,35,0.25))",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Hero text content ── */}
      <motion.div
        style={{ y: textY, opacity: overlayOpacity }}
        className="relative z-20 h-full flex flex-col justify-end sm:justify-center max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-48 sm:pb-36 pr-0 sm:pr-[clamp(0px,30vw,460px)]"
      >
        <motion.h1
          initial={mounted ? { opacity: 0, y: 30 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35 }}
          className="text-[1.9rem] sm:text-5xl xl:text-6xl font-extrabold text-white leading-[1.15] sm:leading-[1.12] mb-3 sm:mb-5 max-w-2xl"
          style={{ fontFamily: "var(--font-baloo)" }}
        >
          La plaine de jeux{" "}
          <span style={{ background: "linear-gradient(135deg, #F5A623 0%, #FF5722 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            préférée des enfants
          </span>{" "}
          <span className="text-white">près de Caen</span>
        </motion.h1>

        <motion.p
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-sm sm:text-lg text-white/90 max-w-lg mb-5 sm:mb-8 leading-relaxed"
          style={{ fontFamily: "var(--font-nunito)", textShadow: "0 1px 4px rgba(0,0,0,0.85), 0 2px 10px rgba(0,0,0,0.6)" }}
        >
          <strong className="text-white">1 300 m²</strong> de jeux couverts — hélicoptère exclusif, trampolines, karting, NeoXperience et bien plus. Pour les <strong className="text-white">2 à 12 ans</strong>, ouvert toute l&rsquo;année.
        </motion.p>

        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="grid self-start gap-2.5 sm:flex sm:flex-row sm:self-auto sm:gap-3"
        >
          <Link
            href="/activites"
            className="btn-shine text-center px-5 py-2.5 text-sm sm:px-7 sm:py-3.5 sm:text-base rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-extrabold shadow-2xl shadow-orange-900/40 hover:-translate-y-1 transition-all duration-200"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Découvrir les activités
          </Link>
          <a
            href="#anniversaires"
            className="text-center px-5 py-2.5 text-sm sm:px-7 sm:py-3.5 sm:text-base rounded-2xl text-white font-extrabold hover:-translate-y-1 transition-all duration-200"
            style={{ fontFamily: "var(--font-nunito)", background: "#1C1008", border: "1.5px solid rgba(180,110,30,0.4)" }}
          >
            Organiser un anniversaire
          </a>
        </motion.div>
      </motion.div>

      {/* ── STAT CARDS — overlap bottom of hero ── */}
      <div className="absolute bottom-10 left-0 right-0 z-30 translate-y-1/2 px-6 lg:px-10 max-w-7xl mx-auto">
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-xl sm:rounded-2xl p-2.5 sm:p-5 flex flex-col items-center text-center overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.94)",
                border: "1.5px solid rgba(245,166,35,0.35)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 12px 34px rgba(90,53,32,0.16)",
              }}
            >
              {/* Amber glow corner */}
              <div
                className="absolute -top-6 -right-6 w-20 h-20 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(245,166,35,0.2) 0%, transparent 70%)" }}
              />
              {/* Border glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1.5px rgba(245,166,35,0.7)" }}
              />

              <div className="mb-1 sm:mb-3 opacity-90 scale-[0.6] sm:scale-100">{s.icon}</div>
              <div
                className="text-lg sm:text-3xl font-extrabold mb-0.5 sm:mb-1 whitespace-nowrap tabular-nums"
                style={{
                  fontFamily: "var(--font-baloo)",
                  background: "linear-gradient(135deg, #F5A623 0%, #FF5722 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.prefix}<CountUp to={s.to} duration={1600} />{s.suffix}
              </div>
              <p className="text-amber-900/60 text-[10px] sm:text-xs font-semibold leading-tight" style={{ fontFamily: "var(--font-nunito)" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
