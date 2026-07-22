"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import type { SummaryCard } from "@/lib/menu/summary";
import { useLocale } from "@/lib/i18n/useLocale";
import { ui } from "@/lib/i18n/ui";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const pizzaSlides = [
  "/images/resto/option-pizza-1.jpg",
  "/images/resto/option-pizza-2.jpg",
  "/images/resto/option-pizza-3.jpg",
];

function MenuCard({ item, index, inView }: { item: SummaryCard; index: number; inView: boolean }) {
  const [err, setErr] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 bg-amber-50 flex-shrink-0">
        {!err ? (
          <Image
            src={item.image}
            alt={item.label}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setErr(true)}
            sizes="(max-width: 640px) 100vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 img-placeholder rounded-none border-0 text-xs">
            <span className="text-2xl opacity-40">📸</span>
            <span className="opacity-50">{item.label}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h4
            className="font-extrabold text-amber-900 text-xl"
            style={{ fontFamily: "var(--font-baloo)" }}
          >
            {item.label}
          </h4>
          {item.price && (
            <span
              className="flex-shrink-0 font-extrabold text-lg"
              style={{ color: "#E8400C", fontFamily: "var(--font-baloo)" }}
            >
              {item.price}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          {item.sections.map((s, j) => (
            <div key={j}>
              <p
                className="text-xs font-extrabold uppercase tracking-wide text-amber-700 mb-0.5"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                {s.title}
              </p>
              <p
                className="text-sm text-amber-900/60 leading-snug"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                {s.items}
              </p>
            </div>
          ))}
        </div>

        {/* Pied de carte : collé en bas (mt-auto) pour que la Formule du midi et
            la pastille s'alignent d'une carte à l'autre, quelle que soit la
            longueur de la liste au-dessus. */}
        {(item.highlight || item.badge) && (
          <div className="mt-auto flex flex-col items-start gap-3 pt-2">
            {item.highlight && (
              <div
                className="w-full rounded-2xl px-4 py-3 border-2"
                style={{ background: "#FFF4E0", borderColor: "#F5A62360" }}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className="font-extrabold text-sm text-amber-900"
                    style={{ fontFamily: "var(--font-baloo)" }}
                  >
                    {item.highlight.badge}
                  </span>
                  <span
                    className="flex-shrink-0 font-extrabold text-base"
                    style={{ color: "#E8400C", fontFamily: "var(--font-baloo)" }}
                  >
                    {item.highlight.price}
                  </span>
                </div>
                <p
                  className="text-xs text-amber-800/70 leading-snug mt-0.5"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  {item.highlight.text}
                </p>
              </div>
            )}

            {item.badge && (
              <span
                className="inline-block px-4 py-1.5 rounded-full text-white text-sm font-extrabold shadow-sm"
                style={{ background: "#C0392B", fontFamily: "var(--font-nunito)" }}
              >
                {item.badge}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Restauration({
  cards,
  t,
}: {
  cards: SummaryCard[];
  t: Dictionary["home"]["restauration"];
}) {
  const regles = ui(useLocale()).regles;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="restauration" className="relative pt-24 pb-16 sm:py-24 overflow-hidden">
      {/* Food pattern background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/resto/patron-restauration.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "550px auto",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Section header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-bold mb-4"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t.badge}
          </motion.span>
          <h2
            className="text-4xl md:text-5xl font-extrabold leading-tight mb-3"
            style={{ fontFamily: "var(--font-baloo)", color: "#1C1008", textShadow: "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, 0 2px 8px rgba(255,255,255,0.8)" }}
          >
            {t.titleStart}{" "}
            <span style={{ color: "#A0621A", WebkitTextStroke: "1.5px rgba(0,0,0,0.75)", paintOrder: "stroke fill" }}>{t.titleAccent}</span>{" "}
            {t.titleEnd}
          </h2>
          <p
            className="text-base max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-nunito)", color: "#1C1008", textShadow: "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, 0 2px 6px rgba(255,255,255,0.8)" }}
          >
            {t.text}
          </p>

          {/* Règle « nourriture extérieure » — carte blanche pour rester lisible
              sur la photo de fond, dans le même langage que les cartes du bas. */}
          <div
            className="inline-flex items-start gap-3 text-left mt-6 px-5 py-3.5 rounded-2xl bg-white shadow-lg"
            style={{ border: "2px solid rgba(192,57,43,0.35)" }}
          >
            <span className="text-xl leading-none mt-0.5" aria-hidden="true">🚫</span>
            <div>
              <p className="font-extrabold text-sm sm:text-base leading-snug" style={{ fontFamily: "var(--font-baloo)", color: "#C0392B" }}>
                {regles.nourritureTitle}
              </p>
              <p className="text-xs sm:text-sm text-amber-900/60 leading-snug" style={{ fontFamily: "var(--font-nunito)" }}>
                {regles.nourritureShort}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Option Pizza banner — full width, short ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative rounded-2xl overflow-visible shadow-xl mb-6"
        >
          {/* Sticker — floating 3D animation, top-left outside the card */}
          <motion.div
            className="absolute pointer-events-none select-none z-20"
            style={{ left: "-1.6rem", top: "-2.5rem" }}
          >
            <motion.div
              animate={{ y: [0, -8, -2, -6, 0], rotateZ: [0, -3, 0, 3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ perspective: 900, transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{ rotateY: [0, -6, 0, 6, 0], rotateX: [0, 3, 5, 2, 0], scale: [1, 1.04, 1.01, 1.03, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/resto/pastille-pizza-2-50.png"
                  alt={t.pizzaTitle}
                  style={{
                    height: "clamp(70px, 9vw, 110px)",
                    width: "auto",
                    display: "block",
                    filter: "drop-shadow(-2px 6px 12px rgba(0,0,0,0.28))",
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <div
            className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row sm:items-stretch"
            style={{ background: "#E8400C" }}
          >
            {/* Text — top on mobile, left on desktop */}
            <div className="flex flex-col justify-center py-6 sm:py-8 sm:flex-shrink-0" style={{ paddingLeft: "clamp(3rem, 8vw, 6rem)", paddingRight: "1.5rem" }}>
              <h3
                className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-tight"
                style={{ fontFamily: "var(--font-baloo)" }}
              >
                {t.pizzaTitle}
              </h3>
              {/* max-w : force le texte sur deux lignes au lieu d'une seule très
                  longue, ce qui rend la largeur gagnée aux trois photos. */}
              <p
                className="text-white/85 text-sm leading-snug sm:max-w-[25rem]"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                {t.pizzaText}
              </p>
            </div>

            {/* 3 photos side by side */}
            <div className="flex gap-2 p-3 sm:flex-1">
              {pizzaSlides.map((src, i) => (
                <div key={i} className="relative flex-1 rounded-xl overflow-hidden min-h-[110px] sm:min-h-[180px]">
                  <Image
                    src={src}
                    alt={`Option Pizza ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── 3 food cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cards.map((item, i) => (
            <MenuCard key={i} item={item} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  );
}
