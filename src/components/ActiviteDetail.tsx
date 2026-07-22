"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ACTIVITES, RESERVATION_URL, type Activite } from "@/lib/activites";
import ReglesParc from "./ReglesParc";

import { TEXT_OUTLINE, TEXT_OUTLINE_SOFT } from "@/lib/text";
import { useLocale, useLocalePath } from "@/lib/i18n/useLocale";
import { ui } from "@/lib/i18n/ui";
import type { ActiviteTexte, Dictionary } from "@/lib/i18n/dictionaries";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";

/* ── Icônes SVG (pas d'emojis) ── */
const IconChevron = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={p.className}><path d="m9 18 6-6-6-6" /></svg>
);
const IconArrowLeft = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={p.className}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
);
const IconUser = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" /></svg>
);
const IconTicket = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className}><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 6 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-6Z" /><path d="M13 5v2M13 17v2M13 11v2" /></svg>
);
const IconInfo = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className}><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></svg>
);
const IconCheck = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={p.className}><path d="M20 6 9 17l-5-5" /></svg>
);
const IconClock = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);

/* ── Bandeau de faits clés (âge / accès / à savoir) ── */
type Detail = Dictionary["pages"]["activites"]["detail"];

function QuickFacts({ a, texte, t }: { a: Activite; texte: ActiviteTexte; t: Detail }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const facts = [
    { icon: <IconUser className="w-5 h-5" />, label: t.factAge, value: texte.age ?? t.allAges },
    { icon: <IconTicket className="w-5 h-5" />, label: t.factAccess, value: a.payant ? t.paid : t.included },
    texte.ageDetail
      ? { icon: <IconInfo className="w-5 h-5" />, label: t.factInfo, value: texte.ageDetail }
      : { icon: <IconCheck className="w-5 h-5" />, label: t.factSafety, value: t.socksRequired },
  ];
  return (
    <div ref={ref} className="grid sm:grid-cols-3 gap-3 sm:gap-4">
      {facts.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-start gap-3 rounded-2xl bg-white shadow-md border border-amber-100 p-4"
        >
          <span className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: a.accentLight, color: a.accent }}>{f.icon}</span>
          <div className="min-w-0">
            <p className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: a.accent, fontFamily: NUNITO }}>{f.label}</p>
            <p className="text-sm font-bold text-amber-900/85 leading-snug" style={{ fontFamily: NUNITO }}>{f.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Autres activités (maillage interne) ── */
function AutresActivites({
  current,
  activites,
  title,
}: {
  current: Activite;
  activites: Dictionary["activites"];
  title: string;
}) {
  const lp = useLocalePath();
  const names = ui(useLocale()).names.activites;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const others = ACTIVITES.filter((a) => a.slug !== current.slug);
  return (
    <div ref={ref}>
      <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-amber-900 mb-8" style={{ fontFamily: BALOO }}>
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {others.map((a, i) => (
          <motion.div key={a.slug} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.04 }}>
            <Link href={lp(`/activites/${a.slug}`)} className="group block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-28 sm:h-32 overflow-hidden" style={{ background: a.accentLight }}>
                <Image src={a.image} alt={names[a.slug]} fill sizes="(max-width: 768px) 45vw, 22vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-white text-[10px] font-extrabold shadow" style={{ background: a.tagBg, fontFamily: NUNITO }}>{activites[a.slug].tag}</span>
              </div>
              <p className="px-3 py-2.5 text-sm font-extrabold leading-tight group-hover:translate-x-0.5 transition-transform" style={{ color: a.accent, fontFamily: BALOO }}>{names[a.slug]}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ActiviteDetail({
  activite: a,
  t,
  activites,
}: {
  activite: Activite;
  t: Detail;
  activites: Dictionary["activites"];
}) {
  const texte = activites[a.slug];
  const lp = useLocalePath();
  const name = ui(useLocale()).names.activites[a.slug];
  const descRef = useRef(null);
  const descInView = useInView(descRef, { once: true, margin: "-80px" });
  const rulesRef = useRef(null);
  const rulesInView = useInView(rulesRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "62vh" }}>
        <Image src={a.image} alt={`${name} — Girafou`} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: a.gradient, opacity: 0.45, mixBlendMode: "multiply" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,10,4,0.45) 0%, rgba(20,10,4,0.3) 45%, rgba(20,10,4,0.78) 100%)" }} />

        <div className="relative py-20 w-full">
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            {/* Fil d'ariane */}
            <div className="flex items-center justify-center gap-1.5 text-white/75 text-xs sm:text-sm font-bold mb-5" style={{ fontFamily: NUNITO }}>
              <Link href={lp("/activites")} className="hover:text-white transition-colors">{t.breadcrumb}</Link>
              <IconChevron className="w-3.5 h-3.5" />
              <span className="text-white">{name}</span>
            </div>

            {/* Pastilles */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
              <span className="px-3 py-1 rounded-full text-white text-xs font-extrabold shadow-md" style={{ background: a.tagBg, fontFamily: NUNITO }}>{activites[a.slug].tag}</span>
              {texte.age && <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-sm border border-white/20" style={{ fontFamily: NUNITO }}>{texte.age}</span>}
              {a.payant && <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-sm border border-white/20" style={{ fontFamily: NUNITO }}>{t.paid}</span>}
            </div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-3 leading-tight drop-shadow-md" style={{ fontFamily: BALOO, textShadow: TEXT_OUTLINE }}>
              {name}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-white/90 text-lg font-semibold drop-shadow max-w-xl mx-auto mb-7" style={{ fontFamily: NUNITO, textShadow: TEXT_OUTLINE_SOFT }}>
              {texte.tagline}
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              href={RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-white font-extrabold shadow-2xl shadow-black/30 hover:-translate-y-0.5 transition-transform duration-200"
              style={{ background: a.gradient, fontFamily: NUNITO }}
            >
              <IconTicket className="w-5 h-5" /> {t.book}
            </motion.a>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none leading-[0]">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[56px]">
            <path d="M0,50 C360,90 720,10 1080,40 C1260,55 1380,45 1440,40 L1440,80 L0,80 Z" fill="#FFFDF5" />
          </svg>
        </div>
      </section>

      <div style={{ background: "#FFFDF5" }}>
        <div className="max-w-4xl mx-auto px-6 py-14 space-y-12">

          {/* ── Faits clés ── */}
          <QuickFacts a={a} texte={texte} t={t} />

          {/* ── Description ── */}
          <motion.div
            ref={descRef}
            initial={{ opacity: 0, y: 24 }}
            animate={descInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="relative rounded-3xl bg-white shadow-lg border border-amber-100 overflow-hidden"
          >
            <div className="h-1.5 w-full" style={{ background: a.gradient }} />
            <div className="p-7 sm:p-10">
              <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: a.accent, fontFamily: NUNITO }}>{t.attraction}</p>
              <div className="flex flex-col gap-4">
                {texte.description.map((p, i) => (
                  <p key={i} className="text-[17px] sm:text-lg leading-relaxed text-amber-900/80 font-medium" style={{ fontFamily: NUNITO }}>{p}</p>
                ))}
              </div>
              <a
                href={RESERVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine mt-8 inline-flex items-center gap-2 px-9 py-3.5 rounded-2xl text-white font-extrabold text-base shadow-lg hover:-translate-y-0.5 transition-transform duration-200"
                style={{ background: a.gradient, fontFamily: NUNITO }}
              >
                <IconTicket className="w-5 h-5" /> {t.book}
              </a>
            </div>
          </motion.div>

          {/* ── Règlement de l'attraction (checklist) ── */}
          {texte.rules.length > 0 && (
            <motion.div
              ref={rulesRef}
              initial={{ opacity: 0, y: 24 }}
              animate={rulesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="rounded-3xl px-7 py-8 text-white shadow-xl"
              style={{ background: a.gradient }}
            >
              <p className="font-extrabold text-lg sm:text-xl mb-5" style={{ fontFamily: BALOO }}>{t.rulesTitle}</p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                {texte.rules.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-[15px] leading-snug text-white/95" style={{ fontFamily: NUNITO }}>
                    <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><IconCheck className="w-3.5 h-3.5" /></span>
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* ── Horaires d'ouverture ── */}
          <div className="rounded-3xl bg-white shadow-lg border border-amber-100 p-6 sm:p-8">
            <h3 className="flex items-center gap-2.5 text-lg sm:text-xl font-extrabold mb-5" style={{ fontFamily: BALOO, color: a.accent }}>
              <IconClock className="w-5 h-5" /> {t.hoursTitle}
            </h3>
            <ul className="divide-y divide-amber-900/10">
              {t.hours.map((h, i) => (
                <li key={i} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="font-bold text-sm sm:text-base text-amber-900/85" style={{ fontFamily: NUNITO }}>{h.period}</p>
                    <p className="text-xs sm:text-sm text-amber-900/55" style={{ fontFamily: NUNITO }}>{h.days}</p>
                  </div>
                  <span className="flex-shrink-0 font-extrabold text-sm sm:text-base whitespace-nowrap" style={{ color: a.accent, fontFamily: BALOO }}>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Règles du parc (composant partagé) ── */}
          <ReglesParc />

        </div>
      </div>

      {/* ── Autres activités ── */}
      <section className="relative pb-8 max-w-5xl mx-auto px-6" style={{ background: "#FFFDF5" }}>
        <AutresActivites current={a} activites={activites} title={t.continueAdventure} />
      </section>

      {/* ── Retour au hub ── */}
      <section className="relative pb-20 pt-10 max-w-3xl mx-auto px-6 text-center" style={{ background: "#FFFDF5" }}>
        <Link href={lp("/activites")} className="inline-flex items-center gap-2 text-sm font-extrabold text-amber-700 hover:text-amber-900 transition-colors" style={{ fontFamily: NUNITO }}>
          <IconArrowLeft className="w-4 h-4" /> {t.backToAll}
        </Link>
      </section>
    </>
  );
}
