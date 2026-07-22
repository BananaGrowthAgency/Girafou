"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ACTIVITES, type Activite } from "@/lib/activites";
import { useLocalePath } from "@/lib/i18n/useLocale";
import type { ActiviteTexte, Dictionary } from "@/lib/i18n/dictionaries";
import { useLocale } from "@/lib/i18n/useLocale";
import { ui } from "@/lib/i18n/ui";
import ReglesParc from "./ReglesParc";

import { TEXT_OUTLINE, TEXT_OUTLINE_SOFT } from "@/lib/text";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";

function ActiviteCard({
  a,
  i,
  inView,
  texte,
  more,
}: {
  a: Activite;
  i: number;
  inView: boolean;
  texte: ActiviteTexte;
  more: string;
}) {
  const lp = useLocalePath();
  const name = ui(useLocale()).names.activites[a.slug];
  return (
    <motion.div
      initial={{ opacity: 0, y: 55, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
    >
      <div className="relative h-48 overflow-hidden" style={{ background: a.accentLight }}>
        <Image
          src={a.image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-[11px] font-extrabold shadow-md"
          style={{ background: a.tagBg, fontFamily: NUNITO }}
        >
          {texte.tag}
        </span>
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: `linear-gradient(to top, ${a.accentLight}, transparent)` }} />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-xl font-extrabold" style={{ fontFamily: BALOO, color: a.accent }}>
          {name}
        </h3>
        <p className="text-sm text-amber-900/60 leading-relaxed flex-1" style={{ fontFamily: NUNITO }}>
          {texte.cardDesc}
        </p>
        <Link
          href={lp(`/activites/${a.slug}`)}
          className="self-start mt-1 px-4 py-2 rounded-xl text-white text-xs font-extrabold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          style={{ background: a.accent, fontFamily: NUNITO }}
        >
          {more}
        </Link>
      </div>
    </motion.div>
  );
}

export default function ActivitesHub({
  t,
  activites,
}: {
  t: Dictionary["pages"]["activites"]["hub"];
  activites: Dictionary["activites"];
}) {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── Hero avec photo ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/activites-hero/hero.png"
            alt="Enfant dans la piscine à balles Girafou"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Overlay pour la lisibilité du texte */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(28,16,8,0.72) 0%, rgba(28,16,8,0.5) 55%, rgba(245,166,35,0.45) 100%)" }} />
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
            {t.subtitle}
          </motion.p>
        </div>

        {/* Wave divider vers la grille */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none leading-[0]">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[60px]">
            <path d="M0,50 C360,90 720,10 1080,40 C1260,55 1380,45 1440,40 L1440,80 L0,80 Z" fill="#FFFDF5" />
          </svg>
        </div>
      </section>

      {/* ── Grille ── */}
      <section ref={gridRef} className="relative py-16 max-w-7xl mx-auto px-6">
        {/* ── Règles du parc — au-dessus des activités pour être vues d'abord ── */}
        <div className="mb-12">
          <ReglesParc />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITES.map((a, i) => (
            <ActiviteCard
              key={a.slug}
              a={a}
              i={i}
              inView={gridInView}
              texte={activites[a.slug]}
              more={t.more}
            />
          ))}
        </div>
      </section>
    </>
  );
}
