"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import ReglesParc from "./ReglesParc";
import BeachClub from "./BeachClub";
import { PACKS_URL, TICKETING_URL } from "@/lib/anniversaires";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";
const BROWN = "#6B4423";
const VALUE = "#E05A2F";
const RED = "#C0392B";
// Crème exacte de la carte sur le site d'origine (#FEF1D6). Les découpes (girafe,
// enfants, confettis) sont détourées sur transparence, donc ce ton s'affiche
// uniformément derrière elles, sans aucune bordure visible.
const CREAM = "#FEF1D6";

// Wrapper d'apparition au scroll — chaque bloc a son propre useInView (cascade réelle).
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 34 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: BALOO, color: BROWN }}>
        {children}
      </h2>
      <span className="block w-14 h-1 rounded-full mx-auto mt-3" style={{ background: RED }} />
    </div>
  );
}

export default function PrixEntrees({ t }: { t: Dictionary["pages"]["prix"] }) {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Fresque peinte du parc (mur « GIRAFOU ») */}
        <Image
          src="/images/prix-entrees/hero.jpg"
          alt="La fresque peinte du parc Girafou"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 44%" }}
        />
        {/* Voile crème léger : lisibilité du texte + raccord avec la section crème dessous. */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,248,225,0.52) 0%, rgba(255,243,196,0.36) 45%, rgba(255,253,245,0.94) 100%)" }} />

        <div ref={heroRef} className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1, y: [0, -8, 0] } : { opacity: 0 }}
            transition={{ opacity: { duration: 0.5 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold mb-4"
            style={{ fontFamily: NUNITO }}
          >
            {t.badge}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-6xl font-extrabold text-amber-900 mb-4 leading-tight" style={{ fontFamily: BALOO }}>
            {t.titleStart} <span className="text-giraffe">{t.titleAccent}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-amber-900/60 max-w-xl mx-auto" style={{ fontFamily: NUNITO }}>
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      <div style={{ background: "#FFFDF5" }}>
        <div className="max-w-4xl mx-auto px-6 py-14 space-y-12">

          {/* ── Carte Tarifs ── */}
          <Reveal>
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl" style={{ background: CREAM }}>
              {/* Confettis dans les coins */}
              <Image src="/images/prix-entrees/spots-tl.png" alt="" width={172} height={178} className="absolute top-0 left-0 w-16 sm:w-24 h-auto pointer-events-none select-none" />
              <Image src="/images/prix-entrees/spots-tr.png" alt="" width={234} height={132} className="absolute top-0 right-0 w-20 sm:w-28 h-auto pointer-events-none select-none" />
              {/* Girafe : relevée et centrée dans la zone des jetons, sans chevaucher le texte. Masquée sur mobile. */}
              <Image src="/images/prix-entrees/giraffe-full.png" alt="" width={387} height={412} className="hidden sm:block absolute bottom-16 md:bottom-20 left-2 md:left-6 w-32 md:w-40 lg:w-48 h-auto pointer-events-none select-none" />

              <div className="relative px-6 sm:px-12 pt-12 sm:pt-14 pb-10 sm:pb-12">
                {/* Prix des entrées */}
                <Title>{t.pricesTitle}</Title>
                <ul className="mt-7 space-y-3 text-center">
                  {t.prices.map((p, i) => (
                    <li key={i} className="text-base sm:text-lg leading-snug" style={{ fontFamily: NUNITO }}>
                      <span className="font-extrabold" style={{ color: BROWN }}>{p.label} : </span>
                      <span className="font-extrabold" style={{ color: VALUE }}>{p.price}</span>
                    </li>
                  ))}
                </ul>

                {/* Packs d'entrées à tarif préférentiel — mis en avant en deux
                    cartes cliquables qui renvoient vers leur vente sur Qweekle. */}
                <div className="mt-10">
                  <div className="text-center mb-5">
                    <span
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white text-xs sm:text-sm font-extrabold uppercase tracking-wide"
                      style={{ fontFamily: NUNITO, background: RED }}
                    >
                      🎟️ {t.passes.badge}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {t.passes.items.map((pack, i) => (
                      <a
                        key={i}
                        href={PACKS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-2xl bg-white/80 border-2 border-amber-200 p-5 text-center shadow-sm hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md transition-all"
                      >
                        <span className="block text-lg sm:text-xl font-extrabold" style={{ fontFamily: BALOO, color: BROWN }}>{pack.n}</span>
                        <span className="block text-2xl sm:text-3xl font-extrabold mt-1" style={{ fontFamily: BALOO, color: VALUE }}>{pack.price}</span>
                        <p className="text-xs sm:text-sm mt-2 leading-snug" style={{ fontFamily: NUNITO, color: BROWN }}>{pack.note}</p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Jetons */}
                <div className="mt-12">
                  <Title>{t.tokensTitle}</Title>
                  <ul className="mt-6 space-y-2 text-center">
                    {t.tokens.map((j) => (
                      <li key={j.n} className="text-base sm:text-lg" style={{ fontFamily: NUNITO }}>
                        <span className="font-extrabold" style={{ color: BROWN }}>{j.n} : </span>
                        <span className="font-extrabold" style={{ color: VALUE }}>{j.price}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-center">
                    <a
                      href={TICKETING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-extrabold text-sm sm:text-base shadow-lg hover:-translate-y-0.5 transition-all"
                      style={{ background: "linear-gradient(135deg, #F5A623, #FF5722)", fontFamily: NUNITO }}
                    >
                      🎟️ {t.tickets}
                    </a>
                  </div>
                </div>

                <p className="mt-9 text-center text-sm sm:text-base font-semibold" style={{ fontFamily: NUNITO, color: BROWN }}>
                  {t.payment}
                </p>
              </div>
            </div>
          </Reveal>

          {/* ── Horaires ── */}
          <Reveal>
            {/* Bandeau enfants */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-md mb-6 min-h-[140px] sm:min-h-[170px] flex items-center justify-center" style={{ background: CREAM }}>
              <Image src="/images/prix-entrees/spots-h.png" alt="" width={300} height={165} className="absolute top-0 left-0 w-24 sm:w-32 h-auto pointer-events-none select-none" />
              <Image src="/images/prix-entrees/kids.png" alt="" width={283} height={284} className="absolute bottom-0 right-3 sm:right-8 w-20 sm:w-28 h-auto pointer-events-none select-none" />
              <h2 className="relative text-2xl sm:text-4xl font-extrabold px-24 sm:px-32 text-center" style={{ fontFamily: BALOO, color: BROWN }}>
                {t.hoursTitle}
              </h2>
            </div>

            {/* Tableau */}
            <div className="rounded-[1.5rem] overflow-hidden shadow-lg border border-amber-900/10">
              <div className="py-3.5 text-center text-white text-lg font-extrabold tracking-wide" style={{ background: RED, fontFamily: BALOO }}>
                {t.allYear}
              </div>

              {/* En-têtes de colonnes */}
              <div className="flex items-stretch bg-white" style={{ borderBottom: "1px solid rgba(120,80,40,0.12)" }}>
                <div className="flex-1 px-5 py-3 text-center text-lg font-extrabold" style={{ fontFamily: BALOO, color: BROWN }}>{t.colDays}</div>
                <div className="w-32 sm:w-52 px-4 py-3 text-center text-lg font-extrabold" style={{ fontFamily: BALOO, color: BROWN, borderLeft: "1px solid rgba(120,80,40,0.12)" }}>{t.colHours}</div>
              </div>

              {t.hours.map((h, i) => (
                <div key={i} className="flex items-stretch bg-white" style={{ borderTop: i === 0 ? "none" : "1px solid rgba(120,80,40,0.08)" }}>
                  <div className="flex-1 px-5 py-4">
                    <p className="font-bold text-sm sm:text-base text-amber-900/85" style={{ fontFamily: NUNITO }}>{h.day}</p>
                    {h.note && <p className="text-xs sm:text-sm text-amber-900/50 mt-0.5" style={{ fontFamily: NUNITO }}>{h.note}</p>}
                  </div>
                  <div className="w-32 sm:w-52 px-4 py-4 flex items-center justify-center text-center font-bold text-sm sm:text-base text-amber-900/85" style={{ fontFamily: NUNITO, borderLeft: "1px solid rgba(120,80,40,0.08)" }}>
                    {h.time}
                  </div>
                </div>
              ))}

              {/* Vacances scolaires */}
              {t.holidayZones.map((zone) => (
                <div key={zone}>
                  <div className="px-5 py-3 text-center text-white text-sm sm:text-base font-bold" style={{ background: RED, fontFamily: NUNITO }}>
                    {zone}
                  </div>
                  <div className="flex items-stretch bg-white">
                    <div className="flex-1 px-5 py-4 font-bold text-sm sm:text-base text-amber-900/85" style={{ fontFamily: NUNITO }}>{t.everyDay}</div>
                    <div className="w-32 sm:w-52 px-4 py-4 flex items-center justify-center text-center font-bold text-sm sm:text-base text-amber-900/85" style={{ fontFamily: NUNITO, borderLeft: "1px solid rgba(120,80,40,0.08)" }}>
                      {t.holidayHours}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ── Girafou Plage (Ouistreham) ── */}
          <Reveal>
            <BeachClub t={t.beach} />
          </Reveal>

          {/* ── Règles du parc ── */}
          <ReglesParc />

        </div>
      </div>
    </>
  );
}
