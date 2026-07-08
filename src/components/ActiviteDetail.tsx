"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ACTIVITES,
  RESERVATION_URL,
  CHAUSSETTES,
  type Activite,
} from "@/lib/activites";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";

/* ── Bloc « Bon à savoir » : consignes propres à l'attraction + chaussettes ── */
function InfosPratiques({ a }: { a: Activite }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const rules = [...a.rules, CHAUSSETTES];

  return (
    <div ref={ref} className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Chaussettes — badge flottant + rappel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative flex items-center gap-4 rounded-2xl bg-white border border-amber-100 shadow-md p-5 lg:pl-24"
      >
        <motion.div
          className="hidden lg:block absolute pointer-events-none select-none z-10"
          style={{ left: "-1.9rem", top: "-2rem" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -10, -2, -8, 0], rotateZ: [0, 2, 0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ perspective: 900, transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{ rotateY: [0, 8, 0, -8, 0], rotateX: [0, 4, 6, 2, 0], scale: [1, 1.04, 1.01, 1.03, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/chaussettes-obligatoires.png"
                  alt="Chaussettes obligatoires"
                  style={{ height: "clamp(66px, 7vw, 92px)", width: "auto", display: "block", filter: "drop-shadow(-3px 8px 14px rgba(0,0,0,0.18))" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Chaussettes — sticker flottant (mobile) */}
        <motion.div
          className="lg:hidden flex-shrink-0"
          animate={{ y: [0, -8, 0], rotateZ: [0, 2, 0, -2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/chaussettes-obligatoires.png"
            alt="Chaussettes obligatoires"
            style={{ height: 56, width: "auto", display: "block", filter: "drop-shadow(-2px 6px 10px rgba(0,0,0,0.18))" }}
          />
        </motion.div>
        <div>
          <p className="font-extrabold text-amber-900 mb-0.5" style={{ fontFamily: BALOO }}>Chaussettes obligatoires</p>
          <p className="text-sm text-amber-800/60 leading-snug" style={{ fontFamily: NUNITO }}>{CHAUSSETTES}</p>
        </div>
      </motion.div>

      {/* Consignes de l'attraction */}
      {a.rules.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl px-7 py-7 text-white shadow-xl"
          style={{ background: a.gradient }}
        >
          <p className="font-extrabold text-lg mb-3" style={{ fontFamily: BALOO }}>Le règlement de l&apos;attraction</p>
          <ul className="flex flex-col gap-2.5">
            {a.rules.map((c, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm leading-snug text-white/90" style={{ fontFamily: NUNITO }}>
                <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-white/70" />
                {c}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}

/* ── Autres activités (maillage interne) ── */
function AutresActivites({ current }: { current: Activite }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const others = ACTIVITES.filter((a) => a.slug !== current.slug);

  return (
    <div ref={ref}>
      <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-amber-900 mb-8" style={{ fontFamily: BALOO }}>
        Continue l&apos;aventure
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {others.map((a, i) => (
          <motion.div
            key={a.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: i * 0.04 }}
          >
            <Link
              href={`/activites/${a.slug}`}
              className="group block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-24 sm:h-28 overflow-hidden" style={{ background: a.accentLight }}>
                <Image src={a.image} alt={a.name} fill sizes="(max-width: 768px) 45vw, 22vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <p className="px-3 py-2.5 text-sm font-extrabold leading-tight" style={{ color: a.accent, fontFamily: BALOO }}>
                {a.name}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ActiviteDetail({ activite: a }: { activite: Activite }) {
  const descRef = useRef(null);
  const descInView = useInView(descRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "58vh" }}>
        <Image
          src={a.image}
          alt={`${a.name} — parc de jeux Girafou`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: a.gradient, opacity: 0.5, mixBlendMode: "multiply" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,10,4,0.42) 0%, rgba(20,10,4,0.28) 45%, rgba(20,10,4,0.7) 100%)" }} />
        <div className="absolute inset-0 spots-pattern opacity-[0.06] pointer-events-none" />

        <div className="relative py-16">
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            {/* Fil d'ariane */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-white/75 text-xs sm:text-sm font-bold mb-5" style={{ fontFamily: NUNITO }}>
              <Link href="/activites" className="hover:text-white transition-colors">Activités</Link>
              <span>›</span>
              <span className="text-white">{a.name}</span>
            </div>

            {/* Pastilles */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
              <span className="px-3 py-1 rounded-full text-white text-xs font-extrabold shadow-md" style={{ background: a.tagBg, fontFamily: NUNITO }}>
                {a.tag}
              </span>
              {a.age && (
                <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-sm" style={{ fontFamily: NUNITO }}>
                  {a.age}
                </span>
              )}
              {a.payant && (
                <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-sm" style={{ fontFamily: NUNITO }}>
                  Payant en supplément
                </span>
              )}
            </div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-3 leading-tight drop-shadow-md" style={{ fontFamily: BALOO }}>
              {a.name}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-white/90 text-lg font-semibold drop-shadow max-w-xl mx-auto" style={{ fontFamily: NUNITO }}>
              {a.tagline}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Description ── */}
      <section ref={descRef} className="relative py-16 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[1.6fr_1fr] gap-6 items-start">
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={descInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="rounded-3xl p-7 sm:p-9 shadow-xl"
            style={{ background: a.accentLight }}
          >
            <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: a.accent, fontFamily: NUNITO }}>
              L&apos;attraction
            </p>
            <div className="flex flex-col gap-4">
              {a.description.map((p, i) => (
                <p key={i} className="text-[17px] sm:text-lg leading-relaxed text-amber-900/80 font-semibold" style={{ fontFamily: NUNITO }}>
                  {p}
                </p>
              ))}
            </div>
            <a
              href={RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine mt-7 inline-block px-10 py-3.5 rounded-full text-white font-extrabold text-base shadow-lg hover:-translate-y-0.5 transition-transform duration-200"
              style={{ background: a.gradient, fontFamily: NUNITO }}
            >
              Je réserve
            </a>
          </motion.div>

          {/* Carte infos */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={descInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-3xl bg-white border-2 shadow-lg p-6 flex flex-col gap-4"
            style={{ borderColor: a.accent + "33" }}
          >
            <p className="text-sm font-extrabold" style={{ color: a.accent, fontFamily: BALOO }}>Bon à savoir</p>
            <ul className="flex flex-col gap-3.5">
              {(a.age || a.ageDetail) && (
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-lg">👶</span>
                  <span className="text-sm text-amber-900/75 leading-snug" style={{ fontFamily: NUNITO }}>
                    {a.age && <span className="font-extrabold text-amber-900">{a.age}. </span>}
                    {a.ageDetail}
                  </span>
                </li>
              )}
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 text-lg">🎟️</span>
                <span className="text-sm text-amber-900/75 leading-snug" style={{ fontFamily: NUNITO }}>
                  {a.payant
                    ? <><span className="font-extrabold text-amber-900">Payant en supplément</span> (hors entrée au parc).</>
                    : <><span className="font-extrabold text-amber-900">Inclus</span> dans l&apos;entrée au parc.</>}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 text-lg">🧦</span>
                <span className="text-sm text-amber-900/75 leading-snug" style={{ fontFamily: NUNITO }}>
                  <span className="font-extrabold text-amber-900">Chaussettes obligatoires</span> pour accéder aux jeux.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Bon à savoir / règlement ── */}
      <section className="relative pb-16 px-6">
        <InfosPratiques a={a} />
      </section>

      {/* ── Autres activités ── */}
      <section className="relative pb-20 max-w-5xl mx-auto px-6">
        <AutresActivites current={a} />
      </section>

      {/* ── Retour au hub ── */}
      <section className="relative pb-20 max-w-3xl mx-auto px-6 text-center">
        <Link href="/activites" className="inline-flex items-center gap-2 text-sm font-extrabold text-amber-700 hover:text-amber-900 transition-colors" style={{ fontFamily: NUNITO }}>
          ← Voir toutes les activités
        </Link>
      </section>
    </>
  );
}
