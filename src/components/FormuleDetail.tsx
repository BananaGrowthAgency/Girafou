"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  BASE_INCLUSIONS,
  CRENEAUX,
  RESERVATION_URL,
  type Formule,
} from "@/lib/anniversaires";
import { OptionPizzaBanner, ConditionsBlock } from "./AnniversairesShared";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";

export default function FormuleDetail({ formule: f }: { formule: Formule }) {
  const listRef = useRef(null);
  const listInView = useInView(listRef, { once: true, margin: "-80px" });

  // Toutes les inclusions à afficher : base + éventuel extra propre à la formule.
  const inclusions = f.extra ? [...BASE_INCLUSIONS, f.extra] : BASE_INCLUSIONS;
  const extraIndex = f.extra ? inclusions.length - 1 : -1;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-16 pb-14 overflow-hidden" style={{ background: f.gradient }}>
        <div className="absolute inset-0 spots-pattern opacity-[0.08] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Fil d'ariane */}
          <div className="flex items-center justify-center gap-2 text-white/70 text-sm font-bold mb-5" style={{ fontFamily: NUNITO }}>
            <Link href="/anniversaires" className="hover:text-white transition-colors">Anniversaires</Link>
            <span>›</span>
            <span className="text-white">{f.name}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-5 w-28 h-28 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
          >
            <Image src={f.illustration} alt={f.name} width={160} height={160} className="w-auto h-24 object-contain drop-shadow-lg" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl font-extrabold text-white mb-2 leading-tight" style={{ fontFamily: BALOO }}>
            {f.name}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-white/85 text-lg font-semibold mb-4" style={{ fontFamily: NUNITO }}>
            {f.tagline} · {CRENEAUX}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-baseline gap-2 px-6 py-3 rounded-full bg-white shadow-xl">
            <span className="text-3xl font-extrabold" style={{ color: f.accent, fontFamily: BALOO }}>{f.price}</span>
            <span className="text-sm font-bold text-amber-800/60" style={{ fontFamily: NUNITO }}>/ enfant</span>
          </motion.div>
        </div>
      </section>

      {/* ── Inclusions ── */}
      <section ref={listRef} className="relative py-16 max-w-3xl mx-auto px-6">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={listInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center text-sm font-extrabold uppercase tracking-widest mb-8" style={{ color: f.accent, fontFamily: NUNITO }}>
          Ce que comprend la formule
        </motion.p>

        <div className="rounded-3xl bg-white shadow-xl border border-amber-100 p-6 sm:p-8">
          <ul className="flex flex-col">
            {inclusions.map((item, i) => {
              const isExtra = i === extraIndex;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={listInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  className={`flex items-start gap-3 py-3 border-b border-dashed border-amber-900/10 last:border-0 ${isExtra ? "rounded-2xl px-4 -mx-2 mt-1" : ""}`}
                  style={isExtra ? { background: f.soft } : undefined}
                >
                  <span
                    className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-extrabold"
                    style={{ background: f.accent }}
                  >
                    {isExtra ? "★" : "✓"}
                  </span>
                  <span className={`text-[15px] leading-snug ${isExtra ? "font-extrabold text-amber-900" : "font-semibold text-amber-900/85"}`} style={{ fontFamily: NUNITO }}>
                    {isExtra && <span className="mr-1">{f.emoji}</span>}
                    {item}
                  </span>
                </motion.li>
              );
            })}
          </ul>

          <a
            href={RESERVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine mt-7 w-full py-4 rounded-2xl text-center text-white font-extrabold text-base shadow-lg hover:-translate-y-0.5 transition-all duration-200 block"
            style={{ background: f.gradient, fontFamily: NUNITO }}
          >
            Je réserve cette formule
          </a>
        </div>
      </section>

      {/* ── Option Pizza ── */}
      {f.optionPizza && (
        <section className="relative pb-16 max-w-5xl mx-auto px-6">
          <OptionPizzaBanner />
        </section>
      )}

      {/* ── Conditions ── */}
      <section className="relative pb-20 px-6">
        <ConditionsBlock />
      </section>

      {/* ── Autres formules ── */}
      <section className="relative pb-20 max-w-3xl mx-auto px-6 text-center">
        <Link href="/anniversaires" className="inline-flex items-center gap-2 text-sm font-extrabold text-amber-700 hover:text-amber-900 transition-colors" style={{ fontFamily: NUNITO }}>
          ← Voir toutes les formules
        </Link>
      </section>
    </>
  );
}
