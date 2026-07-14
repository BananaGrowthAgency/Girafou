"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FORMULES, CRENEAUX, type Formule } from "@/lib/anniversaires";
import { OptionPizzaBanner, ConditionsBlock } from "./AnniversairesShared";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";

function FormuleCard({ f, i, inView }: { f: Formule; i: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 55 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
      className={`relative rounded-3xl overflow-visible border-2 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col ${f.highlight ? "sm:scale-[1.03]" : ""}`}
      style={{ background: f.soft, borderColor: f.accent + "40" }}
    >
      {f.highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="px-4 py-1.5 rounded-full text-white text-xs font-extrabold shadow-lg" style={{ background: f.accent, fontFamily: NUNITO }}>
            ⭐ Plus populaire
          </span>
        </div>
      )}

      {/* Image complète (illustration + prix intégrés) */}
      <div className="rounded-t-3xl overflow-hidden" style={{ background: f.soft }}>
        <Image src={f.illustration} alt={f.name} width={420} height={420} className="w-full h-auto" />
      </div>

      {/* Infos + boutons */}
      <div className="px-6 pt-4 pb-6 flex flex-col gap-1 flex-1">
        <h3 className="text-2xl font-extrabold leading-tight" style={{ color: f.accent, fontFamily: BALOO }}>{f.name}</h3>
        <p className="text-sm font-semibold text-amber-800/60" style={{ fontFamily: NUNITO }}>{f.tagline}</p>
        <p className="text-xs text-amber-800/45 mb-4" style={{ fontFamily: NUNITO }}>⏰ {CRENEAUX}</p>

        <div className="flex gap-3 mt-auto">
          <a
            href={f.reserveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine flex-1 py-3 rounded-2xl text-center text-white font-extrabold text-sm shadow-md hover:scale-[1.02] transition-all duration-200"
            style={{ background: f.accent, fontFamily: NUNITO }}
          >
            Je réserve
          </a>
          <Link
            href={`/anniversaires/${f.slug}`}
            className="flex-1 py-3 rounded-2xl text-center font-extrabold text-sm border-2 hover:scale-[1.02] transition-all duration-200"
            style={{ borderColor: f.accent, color: f.accent, fontFamily: NUNITO }}
          >
            En savoir +
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function AnniversairesHub() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-16 pb-12 overflow-hidden spots-pattern" style={{ background: "linear-gradient(to bottom, #FCE7F3 0%, #FFF3D0 55%, #FFFDF5 100%)" }}>
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full pointer-events-none animate-blob" style={{ background: "radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none animate-blob-delay" style={{ background: "radial-gradient(circle, rgba(255,87,34,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />

        {/* Confettis */}
        <motion.div className="absolute pointer-events-none select-none" style={{ left: "clamp(-2rem, -5vw, -0.7rem)", top: "1rem", zIndex: 0 }} animate={{ y: [0, -8, 0], rotateZ: [0, -1, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/birthday/confettis-left.png" alt="" loading="lazy" style={{ height: "clamp(58px, 13vw, 170px)", width: "auto" }} />
        </motion.div>
        <motion.div className="absolute pointer-events-none select-none" style={{ right: "clamp(-2rem, -5vw, -0.7rem)", top: "1rem", zIndex: 0 }} animate={{ y: [0, -10, 0], rotateZ: [0, 1, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/birthday/confettis-right.png" alt="" loading="lazy" style={{ height: "clamp(58px, 13vw, 170px)", width: "auto" }} />
        </motion.div>

        <div ref={heroRef} className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-4">
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-sm font-bold"
              style={{ fontFamily: NUNITO }}
            >
              🎉 Des fêtes inoubliables
            </motion.span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-6xl font-extrabold text-amber-900 mb-4 leading-tight" style={{ fontFamily: BALOO }}>
            Anniversaires <span className="text-pop">magiques</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-amber-900/60 max-w-xl mx-auto" style={{ fontFamily: NUNITO }}>
            {CRENEAUX} · 3 formules tout inclus au choix. On s&rsquo;occupe de tout, vous profitez !
          </motion.p>
        </div>
      </section>

      {/* ── Formules ── */}
      <section className="relative py-16 max-w-6xl mx-auto px-6">
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {FORMULES.map((f, i) => (
            <FormuleCard key={f.slug} f={f} i={i} inView={cardsInView} />
          ))}
        </div>
      </section>

      {/* ── Option Pizza ── */}
      <section className="relative pb-16 max-w-5xl mx-auto px-6">
        <OptionPizzaBanner />
      </section>

      {/* ── Conditions ── */}
      <section className="relative pb-20 px-6">
        <ConditionsBlock />
      </section>
    </>
  );
}
