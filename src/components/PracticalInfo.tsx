"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const hours = [
  { day: "Mer. · Sam. · Dim.", time: "10h ~ 19h" },
  { day: "Jours fériés", time: "10h ~ 19h" },
  { day: "Vacances scolaires Zone B (Normandie)", time: "Tous les jours · 10h ~ 19h" },
  { day: "Vacances scolaires Zone C (Paris)", time: "Tous les jours · 10h ~ 19h" },
];

const tips = [
  { icon: "🧦", label: "Chaussettes obligatoires", sub: "En vente sur place si besoin", color: "#F5A623" },
  { icon: "🚗", label: "Parking gratuit", sub: "Grand parking devant le parc", color: "#00897B" },
  { icon: "👧", label: "2 à 12 ans", sub: "Zones adaptées à chaque âge", color: "#7C3AED" },
  { icon: "🎂", label: "Anniversaires", sub: "3 formules — réservez à l'avance", color: "#FF5722" },
];

export default function PracticalInfo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const starsOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={sectionRef} id="infos" className="relative py-24 overflow-hidden spots-pattern" style={{ background: "linear-gradient(to bottom, #FFF8E1 0%, #FFE8A0 100%)" }}>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative text-center mb-14"
        >
          {/* Star left */}
          <motion.div
            className="hidden lg:block absolute pointer-events-none select-none z-10"
            style={{ left: "-1rem", top: "-8%", opacity: starsOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ y: [0, -14, -3, -10, 0], rotateZ: [0, -3, 0, 3, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ perspective: 900, transformStyle: "preserve-3d" }}
              >
                <motion.div
                  animate={{ rotateY: [0, -8, 0, 8, 0], rotateX: [0, 4, 6, 2, 0], scale: [1, 1.05, 1.01, 1.04, 1] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/etoile-1.png" alt="" loading="lazy" style={{ height: "clamp(36px, 4vw, 56px)", width: "auto", display: "block", filter: "drop-shadow(-3px 8px 14px rgba(245,166,35,0.35))" }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Star right */}
          <motion.div
            className="hidden lg:block absolute pointer-events-none select-none z-10"
            style={{ right: "2rem", top: "30%", opacity: starsOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ y: [0, -12, -5, -16, 0], rotateZ: [0, 3, 0, -3, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ perspective: 900, transformStyle: "preserve-3d" }}
              >
                <motion.div
                  animate={{ rotateY: [0, 8, 0, -8, 0], rotateX: [0, 3, 7, 2, 0], scale: [1, 1.04, 1.02, 1.05, 1] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/etoile-2.png" alt="" loading="lazy" style={{ height: "clamp(36px, 4vw, 56px)", width: "auto", display: "block", filter: "drop-shadow(3px 8px 14px rgba(245,166,35,0.35))" }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold mb-4"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Comment nous rejoindre
          </span>
          <h2
            className="text-5xl md:text-6xl font-extrabold text-amber-900"
            style={{ fontFamily: "var(--font-baloo)" }}
          >
            Infos{" "}
            <span className="text-giraffe">pratiques</span>
          </h2>
        </motion.div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            {/* Hours card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-amber-50 border border-amber-100">
              <h3
                className="text-2xl font-extrabold text-amber-900 mb-6"
                style={{ fontFamily: "var(--font-baloo)" }}
              >
                Horaires d&rsquo;ouverture
              </h3>
              <div className="space-y-0 divide-y divide-amber-50">
                {hours.map((h, i) => (
                  <div key={i} className="flex items-center justify-between py-3.5">
                    <span className="font-bold text-amber-800" style={{ fontFamily: "var(--font-nunito)" }}>{h.day}</span>
                    <span className="font-extrabold text-amber-500" style={{ fontFamily: "var(--font-baloo)" }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-amber-50 border border-amber-100">
              <h3
                className="text-2xl font-extrabold text-amber-900 mb-5"
                style={{ fontFamily: "var(--font-baloo)" }}
              >
                Nous trouver
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <p className="font-bold text-amber-900" style={{ fontFamily: "var(--font-nunito)" }}>Bénouville</p>
                    <p className="text-sm text-amber-700/55" style={{ fontFamily: "var(--font-nunito)" }}>Proche de l&rsquo;aéroport de Caen-Carpiquet</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🏖️</span>
                  <div>
                    <p className="font-bold text-amber-900" style={{ fontFamily: "var(--font-nunito)" }}>Ouistreham — Beach Club (juin–sept.)</p>
                    <p className="text-sm text-amber-700/55" style={{ fontFamily: "var(--font-nunito)" }}>Expérience estivale en bord de mer</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:0231537268"
                  className="btn-shine flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-bold text-sm shadow-lg hover:-translate-y-0.5 transition-all"
                  style={{ background: "linear-gradient(135deg, #F5A623, #FF5722)", fontFamily: "var(--font-nunito)" }}
                >
                  📞 02 31 53 72 68
                </a>
                <a
                  href="mailto:contact@girafou.com"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 font-bold text-sm hover:bg-white hover:border-amber-300 transition-all"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  ✉️ contact@girafou.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {/* Tip cards */}
            <div className="grid grid-cols-2 gap-4">
              {tips.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="bg-white rounded-2xl p-5 border-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  style={{ borderColor: t.color + "30" }}
                >
                  <div className="text-3xl mb-2">{t.icon}</div>
                  <h4
                    className="font-extrabold text-sm text-amber-900 mb-0.5"
                    style={{ fontFamily: "var(--font-baloo)", color: t.color }}
                  >
                    {t.label}
                  </h4>
                  <p className="text-xs text-amber-800/50" style={{ fontFamily: "var(--font-nunito)" }}>{t.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <div className="flex-1 rounded-3xl overflow-hidden shadow-xl border border-amber-100" style={{ minHeight: 240 }}>
              <iframe
                src="https://maps.google.com/maps?q=Girafou,+ZA+Clos+de+la+Hogue,+14970+B%C3%A9nouville,+France&output=embed&z=15"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 240 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Girafou Bénouville"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
