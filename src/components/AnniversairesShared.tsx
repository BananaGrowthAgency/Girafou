"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { OPTION_PIZZA, CONDITIONS, CHAUSSETTES } from "@/lib/anniversaires";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";

const pizzaSlides = [
  "/images/resto/option-pizza-1.jpg",
  "/images/resto/option-pizza-2.jpg",
  "/images/resto/option-pizza-3.jpg",
];

/* ── Option Pizza add-on banner (réutilise le style de la home) ── */
export function OptionPizzaBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-visible shadow-xl"
    >
      {/* Pastille flottante */}
      <motion.div
        className="absolute pointer-events-none select-none z-20"
        style={{ left: "-1.2rem", top: "-2rem" }}
        animate={{ y: [0, -8, -2, -6, 0], rotateZ: [0, -3, 0, 3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/resto/pastille-pizza-2-50.png"
          alt="2,50 € par enfant"
          loading="lazy"
          style={{ height: "clamp(64px, 8vw, 96px)", width: "auto", display: "block", filter: "drop-shadow(-2px 6px 12px rgba(0,0,0,0.28))" }}
        />
      </motion.div>

      <div className="relative rounded-3xl overflow-hidden flex flex-col sm:flex-row sm:items-stretch" style={{ background: "#E8400C" }}>
        <div className="flex flex-col justify-center py-6 sm:py-8" style={{ paddingLeft: "clamp(3rem, 8vw, 5.5rem)", paddingRight: "1.5rem" }}>
          <span className="inline-block w-fit px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold mb-2" style={{ fontFamily: NUNITO }}>
            En option · {OPTION_PIZZA.price}
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-tight" style={{ fontFamily: BALOO }}>
            {OPTION_PIZZA.title}
          </h3>
          <p className="text-white/85 text-sm leading-snug" style={{ fontFamily: NUNITO }}>
            {OPTION_PIZZA.text}
          </p>
        </div>
        <div className="flex gap-2 p-3 sm:flex-1">
          {pizzaSlides.map((src, i) => (
            <div key={i} className="relative flex-1 rounded-xl overflow-hidden min-h-[110px] sm:min-h-[170px]">
              <Image src={src} alt={`Option Pizza ${i + 1}`} fill className="object-cover" sizes="(max-width: 640px) 33vw, 25vw" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Chaussettes + conditions ── */
export function ConditionsBlock() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Chaussettes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 rounded-2xl bg-white border border-amber-100 shadow-md p-5"
      >
        <span className="flex-shrink-0 text-3xl">🧦</span>
        <div>
          <p className="font-extrabold text-amber-900 mb-0.5" style={{ fontFamily: BALOO }}>Chaussettes obligatoires</p>
          <p className="text-sm text-amber-800/60 leading-snug" style={{ fontFamily: NUNITO }}>{CHAUSSETTES}</p>
        </div>
      </motion.div>

      {/* Conditions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-3xl px-7 py-7 text-white shadow-xl"
        style={{ background: "#C0392B" }}
      >
        <p className="font-extrabold text-lg mb-3" style={{ fontFamily: BALOO }}>Bon à savoir</p>
        <ul className="flex flex-col gap-2.5">
          {CONDITIONS.map((c, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-snug text-white/90" style={{ fontFamily: NUNITO }}>
              <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-white/70" />
              {c}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
