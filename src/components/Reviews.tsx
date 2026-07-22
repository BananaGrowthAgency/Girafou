"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Script from "next/script";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";

// Widgets Elfsight « Google Reviews » du compte Girafou : les avis du parc et
// ceux filtrés sur les anniversaires.
export const REVIEWS_PARC = "fc0026c3-430b-48ad-bf69-1ef9c9a4ddc4";
export const REVIEWS_ANNIVERSAIRES = "519ebacd-1797-460e-9bef-8d84a96f0bf1";

// Lien « écrire un avis » de la fiche Google du parc.
//
// ⚠️ Ce lien vient d'une recherche Google : le jeton `si` identifie la fiche,
// mais ce format n'est pas garanti dans le temps. Le lien stable est celui de
// la fiche d'établissement (Google Business Profile → « Demander des avis »),
// de la forme https://search.google.com/local/writereview?placeid=… — le
// remplacer ici le jour où on l'a sous la main.
const GOOGLE_REVIEW_URL =
  "https://www.google.com/search?si=APenkKn5T4YN59srr511wD6k6Pufj9DEzRUvB1XJSwUeeT5afhIG04xBMi7Xxb1VgRoFnt2iCSXfYXEHVOoagzZYKQT1mcTM0z9LqlKeMDnmZDpJhnR1X9njx6cJpUeMiOGEpe40iERe&q=Girafou";

// Le « G » de Google, pour que le bouton soit reconnaissable au premier coup d'œil.
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable="false">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.2-.4-4.7H24v8.9h11.8c-.5 2.7-2 5-4.4 6.6v5.5h7.1c4.1-3.8 6.6-9.4 6.6-16.3z" />
      <path fill="#34A853" d="M24 46c6 0 11-2 14.5-5.2l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8 41.3 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.8 28.4c-.4-1.3-.7-2.7-.7-4.4s.3-3 .7-4.4v-5.7H4.5C2.9 17.1 2 20.4 2 24s.9 6.9 2.5 10.1l7.3-5.7z" />
      <path fill="#EA4335" d="M24 10.6c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4 30 2 24 2 15.4 2 8 6.7 4.5 13.9l7.3 5.7c1.7-5.2 6.5-9 12.2-9z" />
    </svg>
  );
}

// Brun intermédiaire entre --dark (#1C1008) et --giraffe-brown (#8B5E3C) :
// assez clair pour rester chaleureux, assez sombre pour que les cartes
// blanches des avis ressortent. Repris tel quel par les vagues de page.tsx.
export const SECTION_BG = "#3D2718";

/**
 * Section « avis Google », juste avant les infos pratiques.
 *
 * ⚠️ Le div Elfsight ne doit avoir AUCUN ancêtre animé : `platform.js` mesure
 * la position du conteneur, et un parent en `opacity: 0` / `transform` (même
 * résiduel) l'empêche de rendre les avis. L'en-tête est donc animé à part, en
 * *frère* du widget, et le conteneur du widget reste strictement statique.
 * Pour la même raison on n'utilise pas `data-elfsight-app-lazy` : le widget
 * monte dès que le script est là, sans dépendre de l'IntersectionObserver.
 */
export default function Reviews({
  t,
  appId,
}: {
  t: Dictionary["home"]["reviews"];
  /** UUID du widget Elfsight — `REVIEWS_PARC` ou `REVIEWS_ANNIVERSAIRES`. */
  appId: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden" style={{ background: SECTION_BG }}>
      {/* Comète — seul décor de la section, en frère du widget (jamais ancêtre).
          Même vocabulaire que WhyGirafou : flottement 3D lent. */}
      <motion.div
        className="absolute pointer-events-none select-none z-0"
        style={{ right: "clamp(0.5rem, 6vw, 6rem)", top: "clamp(0.5rem, 3vw, 2.5rem)" }}
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ y: [0, -14, -3, -10, 0], rotateZ: [0, -2, 0, 2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ perspective: 900, transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ rotateY: [0, -8, 0, 8, 0], rotateX: [0, 4, 6, 2, 0], scale: [1, 1.04, 1.01, 1.03, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/comete.png"
              alt=""
              loading="lazy"
              style={{
                height: "clamp(46px, 9vw, 120px)",
                width: "auto",
                display: "block",
                filter: "drop-shadow(-3px 8px 14px rgba(245,166,35,0.35))",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16 sm:py-20">
        {/* ── En-tête (animé) ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-12"
        >
          <p
            className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] mb-3"
            style={{ color: "#F472B6", fontFamily: NUNITO }}
          >
            {t.label}
          </p>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight"
            style={{ fontFamily: BALOO }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #F5A623 0%, #FF5722 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t.accent}
            </span>{" "}
            {t.rest}
          </h2>
          <p
            className="mt-4 text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: NUNITO }}
          >
            {t.subtitle}
          </p>
        </motion.div>

        {/* ── Widget Elfsight — conteneur volontairement sans animation ──
            `minHeight` réserve à peu près la hauteur d'une rangée de cartes,
            pour que la page ne saute pas quand le widget se rend. */}
        <div style={{ minHeight: 250 }}>
          <div className={`elfsight-app-${appId}`} />
        </div>

        {/* ── Appel à avis ── (frère du widget, jamais ancêtre) */}
        <div className="mt-10 text-center">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-white font-extrabold text-base shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            style={{ color: "#3D2718", fontFamily: NUNITO }}
          >
            <GoogleG className="w-5 h-5 flex-shrink-0" />
            {t.cta}
          </a>
        </div>
      </div>

      {/* `afterInteractive` : le widget est le contenu de la section, pas un
          extra — en `lazyOnload` le script partait en dernier et laissait un
          blanc visible le temps du chargement. */}
      <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
    </section>
  );
}
