"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FORMULES, type Formule } from "@/lib/anniversaires";
import { useLocale, useLocalePath } from "@/lib/i18n/useLocale";
import { ui } from "@/lib/i18n/ui";
import type { Dictionary, FormuleTexte } from "@/lib/i18n/dictionaries";
import { OptionPizzaBanner, ConditionsBlock } from "./AnniversairesShared";
import Reviews, { REVIEWS_ANNIVERSAIRES, SECTION_BG as REVIEWS_BG } from "./Reviews";
import Wave from "./Wave";

import { TEXT_OUTLINE, TEXT_OUTLINE_SOFT } from "@/lib/text";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";

function FormuleCard({
  f,
  i,
  inView,
  texte,
  t,
  creneaux,
}: {
  f: Formule;
  i: number;
  inView: boolean;
  texte: FormuleTexte;
  t: Dictionary["pages"]["anniversaires"]["hub"];
  creneaux: string;
}) {
  const lp = useLocalePath();
  const name = ui(useLocale()).names.formules[f.slug];
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
            {t.popular}
          </span>
        </div>
      )}

      {/* Image complète (illustration + prix intégrés) */}
      <div className="rounded-t-3xl overflow-hidden" style={{ background: f.soft }}>
        <Image src={f.illustration} alt={name} width={420} height={420} className="w-full h-auto" />
      </div>

      {/* Infos + boutons */}
      <div className="px-6 pt-4 pb-6 flex flex-col gap-1 flex-1">
        <h3 className="text-2xl font-extrabold leading-tight" style={{ color: f.accent, fontFamily: BALOO }}>{name}</h3>
        <p className="text-sm font-semibold text-amber-800/60" style={{ fontFamily: NUNITO }}>{texte.tagline}</p>
        <p className="text-xs text-amber-800/45" style={{ fontFamily: NUNITO }}>⏰ {creneaux}</p>

        {/* Prix en texte, en plus de celui incrusté dans l'illustration. */}
        <p className="mb-4 mt-2 flex items-baseline gap-1.5" style={{ fontFamily: NUNITO }}>
          <span className="text-2xl font-extrabold" style={{ color: f.accent, fontFamily: BALOO }}>
            {texte.price}
          </span>
          <span className="text-xs font-semibold text-amber-800/55">{t.perChild}</span>
        </p>

        <div className="flex gap-3 mt-auto">
          <a
            href={f.reserveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine flex-1 py-3 rounded-2xl text-center text-white font-extrabold text-sm shadow-md hover:scale-[1.02] transition-all duration-200"
            style={{ background: f.accent, fontFamily: NUNITO }}
          >
            {t.book}
          </a>
          <Link
            href={lp(`/anniversaires/${f.slug}`)}
            className="flex-1 py-3 rounded-2xl text-center font-extrabold text-sm border-2 hover:scale-[1.02] transition-all duration-200"
            style={{ borderColor: f.accent, color: f.accent, fontFamily: NUNITO }}
          >
            {t.more}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function AnniversairesHub({
  t,
  reviews,
  formules,
  anniversaires,
}: {
  t: Dictionary["pages"]["anniversaires"]["hub"];
  reviews: Dictionary["pages"]["anniversaires"]["reviews"];
  formules: Dictionary["anniversaires"]["formules"];
  anniversaires: Dictionary["anniversaires"];
}) {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── Hero avec photo ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/anniversaires-hero/hero.jpg"
            alt="Enfants fêtant un anniversaire au parc Girafou"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Overlay pour la lisibilité du texte */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(28,16,8,0.72) 0%, rgba(28,16,8,0.5) 55%, rgba(236,72,153,0.45) 100%)" }} />
        </div>

        <div ref={heroRef} className="relative max-w-3xl mx-auto px-6 py-24 sm:py-32 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1, y: [0, -8, 0] } : { opacity: 0 }}
            transition={{ opacity: { duration: 0.5 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-bold mb-4"
            style={{ fontFamily: NUNITO }}
          >
            {t.badge}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg" style={{ fontFamily: BALOO, textShadow: TEXT_OUTLINE }}>
            {t.titleStart} <span style={{ color: "#FFD23F" }}>{t.titleAccent}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-white/85 max-w-xl mx-auto drop-shadow" style={{ fontFamily: NUNITO, textShadow: TEXT_OUTLINE_SOFT }}>
            {anniversaires.creneaux} {t.subtitleSuffix}
          </motion.p>
        </div>

        {/* Wave divider vers la grille */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none leading-[0]">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[60px]">
            <path d="M0,50 C360,90 720,10 1080,40 C1260,55 1380,45 1440,40 L1440,80 L0,80 Z" fill="#FFFDF5" />
          </svg>
        </div>
      </section>

      {/* ── Formules (confettis + 3 cartes) ── */}
      <section className="relative pt-10 pb-16 overflow-hidden">
        {/* Confettis */}
        <motion.div className="absolute pointer-events-none select-none" style={{ left: "clamp(-2rem, -5vw, -0.7rem)", top: "0.5rem", zIndex: 0 }} animate={{ y: [0, -8, 0], rotateZ: [0, -1, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/birthday/confettis-left.png" alt="" loading="lazy" style={{ height: "clamp(58px, 13vw, 170px)", width: "auto" }} />
        </motion.div>
        <motion.div className="absolute pointer-events-none select-none" style={{ right: "clamp(-2rem, -5vw, -0.7rem)", top: "0.5rem", zIndex: 0 }} animate={{ y: [0, -10, 0], rotateZ: [0, 1, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/birthday/confettis-right.png" alt="" loading="lazy" style={{ height: "clamp(58px, 13vw, 170px)", width: "auto" }} />
        </motion.div>

        <div ref={cardsRef} className="relative max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {FORMULES.map((f, i) => (
              <FormuleCard
                key={f.slug}
                f={f}
                i={i}
                inView={cardsInView}
                texte={formules[f.slug]}
                t={t}
                creneaux={anniversaires.creneaux}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Option Pizza ── */}
      <section className="relative pb-16 max-w-5xl mx-auto px-6">
        <OptionPizzaBanner t={anniversaires.optionPizza} />
      </section>

      {/* ── Conditions ── */}
      <section className="relative pb-20 px-6">
        <ConditionsBlock t={anniversaires} />
      </section>

      {/* ── Avis Google (filtrés sur les anniversaires) ──
          La section est sombre : une vague fait la jonction depuis le crème de
          la page. Côté bas c'est le footer qui enchaîne, d'où son `waveColor`
          calé sur ce même brun dans anniversaires/page.tsx. */}
      <Wave above="#FFFDF5" fill={REVIEWS_BG} />
      <Reviews t={reviews} appId={REVIEWS_ANNIVERSAIRES} />
    </>
  );
}
