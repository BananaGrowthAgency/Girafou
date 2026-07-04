"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* Horizontal marquee ticker of park keywords */
const ticker = [
  "Hélicoptère exclusif",
  "Trampolines XXL",
  "Karting & Motos",
  "NeoXperience",
  "Piscine à balles",
  "Structures gonflables",
  "Anniversaires",
  "Restauration",
  "Beach Club été",
  "Ouvert 365 jours",
];

const reasons = [
  {
    icon: "🏆",
    title: "Exclusif en Normandie",
    desc: "L'hélicoptère et la NeoXperience sont des attractions introuvables ailleurs dans la région.",
    color: "#F5A623",
    bg: "rgba(245,166,35,0.10)",
  },
  {
    icon: "☁️",
    title: "Par tous les temps",
    desc: "1 300 m² couverts — pluie, vent ou soleil, chez Girafou il fait toujours beau !",
    color: "#0288D1",
    bg: "rgba(2,136,209,0.10)",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Toute la famille",
    desc: "Des zones adaptées à chaque âge (2–12 ans) et un espace confort pour les parents.",
    color: "#00897B",
    bg: "rgba(0,137,123,0.10)",
  },
  {
    icon: "🛡️",
    title: "Sécurité & hygiène",
    desc: "Équipements certifiés, personnel formé, chaussettes obligatoires — vos enfants sont entre de bonnes mains.",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.10)",
  },
];

export default function WhyGirafou() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const cometeOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: "#1C1008" }}>

      {/* Giant spot decorations */}
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #F5A623 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

      {/* ── Marquee ticker ── */}
      <div className="relative overflow-hidden py-5 border-b border-white/5">
        <div className="flex gap-0 w-max animate-marquee">
          {[...ticker, ...ticker].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-4 px-6 text-amber-300 font-bold text-sm uppercase tracking-widest whitespace-nowrap"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              {t}
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* ── Main section ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10 sm:py-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative text-center mb-14"
        >
          {/* Comet PNG — floating 3D, right of h2 */}
          <motion.div
            className="hidden lg:block absolute pointer-events-none select-none z-10"
            style={{ right: "-1rem", top: "-8%", opacity: cometeOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ y: [0, -14, -3, -10, 0], rotateZ: [0, -2, 0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ perspective: 900, transformStyle: "preserve-3d" }}
              >
                <motion.div
                  animate={{ rotateY: [0, -8, 0, 8, 0], rotateX: [0, 4, 6, 2, 0], scale: [1, 1.04, 1.01, 1.03, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/comete.png"
                    alt="Comète"
                    style={{
                      height: "clamp(80px, 10vw, 130px)",
                      width: "auto",
                      display: "block",
                      filter: "drop-shadow(-3px 8px 14px rgba(245,166,35,0.3))",
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 text-amber-300 text-sm font-bold mb-4"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Pourquoi choisir Girafou ?
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight break-words"
            style={{ fontFamily: "var(--font-baloo)" }}
          >
            Bien plus qu&rsquo;un{" "}
            <span style={{
              background: "linear-gradient(135deg, #F5A623 0%, #FF5722 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              simple parc
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.12 }}
              className="group relative rounded-3xl p-7 border border-white/8 hover:border-white/15 transition-all duration-300"
              style={{ background: r.bg, backdropFilter: "blur(4px)" }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                style={{ background: r.bg, border: `1.5px solid ${r.color}40` }}
              >
                {r.icon}
              </div>
              <h3
                className="text-xl font-extrabold mb-2"
                style={{ color: r.color, fontFamily: "var(--font-baloo)" }}
              >
                {r.title}
              </h3>
              <p
                className="text-sm text-white/55 leading-relaxed"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="tel:0231537268"
            className="btn-shine px-10 py-5 rounded-2xl font-extrabold text-lg text-white shadow-2xl hover:-translate-y-1 transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #F5A623 0%, #FF5722 100%)",
              boxShadow: "0 20px 60px rgba(245,166,35,0.35)",
              fontFamily: "var(--font-nunito)",
            }}
          >
            Préparer notre visite
          </a>
          <a
            href="#anniversaires"
            className="px-10 py-5 rounded-2xl font-extrabold text-lg text-amber-300 border-2 border-amber-400/30 hover:border-amber-400/70 hover:text-amber-200 transition-all duration-200"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Organiser un anniversaire
          </a>
        </motion.div>
      </div>

    </section>
  );
}
