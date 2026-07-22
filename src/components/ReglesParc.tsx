"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "@/lib/i18n/useLocale";
import { ui } from "@/lib/i18n/ui";
import type { Locale } from "@/lib/i18n/config";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";

// Panneau « À savoir avant de venir » — les deux règles du parc (chaussettes +
// nourriture extérieure) réunies dans un encart volontairement visible.
// Utilisé sur Prix des entrées, les 9 pages Activités et Restauration.
const DEFAULT_TITLE: Record<Locale, string> = {
  fr: "À savoir avant de venir",
  en: "Before you visit",
};

export default function ReglesParc({ title }: { title?: string }) {
  const locale = useLocale();
  const t = ui(locale);
  const heading = title ?? DEFAULT_TITLE[locale];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border-2 border-amber-200 p-5 sm:p-7"
      style={{ background: "linear-gradient(135deg, #FFF8E1 0%, #FFEFC4 100%)" }}
    >
      <h3
        className="flex items-center gap-2 text-lg sm:text-xl font-extrabold text-amber-900 mb-5"
        style={{ fontFamily: BALOO }}
      >
        <span aria-hidden="true">⚠️</span> {heading}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ── Règle 1 : chaussettes ── */}
        <div className="flex items-start gap-4 rounded-2xl bg-white border border-amber-100 shadow-md p-5">
          <motion.div
            className="flex-shrink-0"
            animate={{ y: [0, -8, 0], rotateZ: [0, 2, 0, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/chaussettes-obligatoires.png"
              alt=""
              style={{
                height: 64,
                width: "auto",
                display: "block",
                filter: "drop-shadow(-2px 6px 10px rgba(0,0,0,0.18))",
              }}
            />
          </motion.div>
          <div>
            <p className="font-extrabold text-amber-900 mb-0.5" style={{ fontFamily: BALOO }}>
              {t.regles.chaussettesTitle}
            </p>
            <p className="text-sm text-amber-800/70 leading-snug" style={{ fontFamily: NUNITO }}>
              {t.regles.chaussettes}
            </p>
          </div>
        </div>

        {/* ── Règle 2 : nourriture extérieure ── */}
        <div className="flex items-start gap-4 rounded-2xl bg-white border border-amber-100 shadow-md p-5">
          <motion.div
            className="flex-shrink-0"
            animate={{ y: [0, -8, 0], rotateZ: [0, -2, 0, 2, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <InterditSticker />
          </motion.div>
          <div>
            <p className="font-extrabold text-amber-900 mb-0.5" style={{ fontFamily: BALOO }}>
              {t.regles.nourritureTitle}
            </p>
            <p className="text-sm text-amber-800/70 leading-snug" style={{ fontFamily: NUNITO }}>
              {t.regles.nourriture}
            </p>
            <p className="text-xs text-amber-800/45 leading-snug mt-1.5" style={{ fontFamily: NUNITO }}>
              {t.regles.nourritureExceptions}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Pictogramme « interdit » (gobelet barré). Pas de PNG dédié dans
// /public, donc on le compose — même poids visuel que le sticker chaussettes.
export function InterditSticker({ size = 64 }: { size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #FFE3DE 0%, #FFC9BE 100%)",
        border: "3px solid #C0392B",
        filter: "drop-shadow(-2px 6px 10px rgba(0,0,0,0.18))",
      }}
      aria-hidden="true"
    >
      <span style={{ fontSize: size * 0.42, lineHeight: 1 }}>🥤</span>
      {/* Barre oblique du panneau d'interdiction */}
      <span
        className="absolute rounded-full"
        style={{
          width: size * 0.86,
          height: Math.max(3, size * 0.08),
          background: "#C0392B",
          transform: "rotate(-45deg)",
        }}
      />
    </div>
  );
}
