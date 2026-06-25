"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const icons = [
  // Maximize2 — superficie couverte
  <svg key="m2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
  </svg>,
  // Zap — activités dynamiques
  <svg key="zap" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>,
  // Baby — âge enfants
  <svg key="baby" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12h.01M15 12h.01M10 16c.5.3 1.1.5 2 .5s1.5-.2 2-.5"/>
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
    <path d="M9 9c0-.6.4-1 1-1s1 .4 1 1M13 9c0-.6.4-1 1-1s1 .4 1 1"/>
  </svg>,
  // Sun — ouvert toute l'année
  <svg key="sun" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>,
];

const stats = [
  { value: 1300, suffix: "m²", label: "de jeux couverts", color: "#F5A623", bg: "#FFF8E1" },
  { value: 9, suffix: "+", label: "activités uniques", color: "#FF5722", bg: "#FBE9E7" },
  { value: 12, suffix: "ans", label: "âge maximum", color: "#7C3AED", bg: "#EDE9FE" },
  { value: 365, suffix: "j", label: "ouvert toute l'année", color: "#00897B", bg: "#E0F2F1" },
];

function Counter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const step = Math.max(1, Math.ceil(value / (duration / 16)));
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, value);
      setCount(current);
      if (current >= value) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active, value]);

  return <>{count.toLocaleString("fr-FR")}{suffix}</>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative py-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35, scale: 0.94 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center overflow-hidden"
              style={{ background: s.bg, border: `1.5px solid ${s.color}25` }}
            >
              <div
                className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${s.color}20 0%, transparent 70%)`, transform: "translate(30%,-30%)" }}
              />
              <div className="flex justify-center mb-3" style={{ color: s.color }}>
                {icons[i]}
              </div>
              <div
                className="text-4xl md:text-5xl font-extrabold mb-1"
                style={{ color: s.color, fontFamily: "var(--font-baloo)" }}
              >
                <Counter value={s.value} suffix={s.suffix} active={inView} />
              </div>
              <p
                className="text-sm font-bold"
                style={{ color: s.color + "99", fontFamily: "var(--font-nunito)" }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
