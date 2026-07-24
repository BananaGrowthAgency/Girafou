"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ReglesParc from "./ReglesParc";
import { useLocalePath } from "@/lib/i18n/useLocale";
import type { Dictionary } from "@/lib/i18n/dictionaries";

import { TEXT_OUTLINE, TEXT_OUTLINE_SOFT } from "@/lib/text";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";

// Réservation en ligne (billetterie Qweekle) — ouverture dans un nouvel onglet.
const RESERVATION_URL =
  "https://girafou.qweekle.com/shop/girafou/ticketing?type=ticket&lang=fr&_gl=1*427gqt*_gcl_au*NDAwNzYxOTg1LjE3ODIzNDQwMDQ.*_ga*MTQ5MTU5NjY1MC4xNzgyMzQ0MDA0*_ga_W96LVS4H2M*czE3ODQwMjYyMDMkbzEzJGcxJHQxNzg0MDI2ODA5JGo1OSRsMCRoNTMwMzE3NDg.";

// Présentation des 4 offres (photo, lien, couleur) — les textes, eux, vivent
// dans le dictionnaire, dans le même ordre.
const offres = [
  { image: "/images/nos-offres/prix-entrees.jpg", href: "/prix-des-entrees", accent: "#E8940A" },
  { image: "/images/nos-offres/groupes.jpg", href: "mailto:contact@girafou.com", accent: "#00A0B0" },
  { image: "/images/nos-offres/cse.jpg", href: "mailto:contact@girafou.com", accent: "#7C3AED" },
  { image: "/images/nos-offres/privatisation.jpg", href: "mailto:contact@girafou.com", accent: "#FF4081" },
];

function OffreCard({
  o,
  i,
  texte,
}: {
  o: (typeof offres)[number];
  i: number;
  texte: Dictionary["pages"]["nosOffres"]["offres"][number];
}) {
  const lp = useLocalePath();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const isMail = o.href.startsWith("mailto:");
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 55, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
    >
      {/* Photo */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={o.image}
          alt={texte.title}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: o.accent }} />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl sm:text-2xl font-extrabold mb-3" style={{ fontFamily: BALOO, color: o.accent }}>
          {texte.title}
        </h3>
        <p className="text-sm sm:text-base text-amber-900/60 leading-relaxed flex-1" style={{ fontFamily: NUNITO }}>
          {texte.desc}
        </p>

        <Link
          href={lp(o.href)}
          {...(isMail ? {} : { prefetch: false })}
          className="self-start mt-6 px-5 py-2.5 rounded-xl text-white text-sm font-extrabold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          style={{ background: o.accent, fontFamily: NUNITO }}
        >
          {texte.cta}
        </Link>
      </div>
    </motion.div>
  );
}

export default function NosOffres({ t }: { t: Dictionary["pages"]["nosOffres"] }) {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const resaRef = useRef(null);
  const resaInView = useInView(resaRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* ── Hero avec photo ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/nos-offres-hero/hero-v2.jpg"
            alt="Enfant sur une moto au parc Girafou"
            fill
            priority
            sizes="(max-width: 768px) 200vw, 100vw"
            className="object-cover object-center"
          />
          {/* Overlay pour la lisibilité du texte */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(28,16,8,0.72) 0%, rgba(28,16,8,0.5) 55%, rgba(192,57,43,0.55) 100%)" }} />
        </div>

        <div ref={heroRef} className="relative max-w-3xl mx-auto px-6 py-24 sm:py-32 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1, y: [0, -8, 0] } : { opacity: 0 }}
            transition={{
              opacity: { duration: 0.5 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
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

        {/* Wave divider vers la section crème */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none leading-[0]">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[60px]">
            <path d="M0,50 C360,90 720,10 1080,40 C1260,55 1380,45 1440,40 L1440,80 L0,80 Z" fill="#FFFDF5" />
          </svg>
        </div>
      </section>

      {/* ── Bouton Réservez ── */}
      <section className="relative pt-2 pb-2 flex justify-center" style={{ background: "#FFFDF5" }}>
        <motion.a
          ref={resaRef}
          href={RESERVATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={resaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block px-12 py-4 rounded-2xl text-white text-xl font-extrabold tracking-wide shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
          style={{ background: "#C0392B", fontFamily: BALOO }}
        >
          {t.book}
        </motion.a>
      </section>

      {/* ── Grille des offres ── */}
      <section className="relative pt-6 pb-14 max-w-5xl mx-auto px-6" style={{ background: "#FFFDF5" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {offres.map((o, i) => (
            <OffreCard key={o.href + i} o={o} i={i} texte={t.offres[i]} />
          ))}
        </div>
      </section>

      {/* ── Note chaussettes ── */}
      <section className="relative pb-20 max-w-5xl mx-auto px-6" style={{ background: "#FFFDF5" }}>
        <ReglesParc />
      </section>
    </>
  );
}
