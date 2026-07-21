"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// Horaires — repris de la page Prix des entrées (source : girafou.com).
// `highlight` = le Jeudi des tout-petits, mis en avant : c'est une offre
// récente que le parc cherche à faire connaître.
const hours = [
  // Les jours de fermeture ouvrent la liste : c'est ce que les parents
  // vérifient en premier, autant l'annoncer avant les horaires d'ouverture.
  {
    day: "Lundi · Mardi · Vendredi",
    time: "Fermé",
    note: "Hors vacances scolaires",
    closed: true,
  },
  { day: "Mercredi · Samedi · Dimanche", time: "10h ~ 19h" },
  {
    day: "Jeudi des tout-petits",
    time: "10h ~ 12h30",
    note: "5 € par enfant · gratuit pour les accompagnants",
    highlight: true,
  },
  { day: "Jours fériés", time: "10h ~ 19h" },
  { day: "Vacances scolaires Zone B (Normandie)", time: "Tous les jours · 10h ~ 19h" },
  { day: "Vacances scolaires Zone C (Paris)", time: "Tous les jours · 10h ~ 19h" },
];

// Extrait des tarifs — le détail complet (dont les 12–18 mois) vit sur
// /prix-des-entrees. Tranches en intervalles fermés, comme sur cette page.
const tarifs = [
  { label: "Moins de 12 mois", price: "Gratuit" },
  { label: "De 18 mois à 3 ans", price: "8,50 €" },
  { label: "De 3 à 12 ans", price: "11,50 €" },
  { label: "Adulte accompagnateur", price: "2,00 €" },
];

// Les deux règles du parc arrivent en tête : ce sont les deux motifs de
// friction les plus fréquents à l'accueil.
const tips = [
  { icon: "🧦", label: "Chaussettes obligatoires", sub: "Enfants et adultes — 2,50 € la paire sur place", color: "#F5A623", strong: true },
  { icon: "🚫", label: "Pas de nourriture extérieure", sub: "Ni boissons — restaurant sur place", color: "#C0392B", strong: true },
  { icon: "🚗", label: "Parking gratuit", sub: "Grand parking devant le parc", color: "#00897B" },
  { icon: "👧", label: "1 à 12 ans", sub: "Zones adaptées à chaque âge", color: "#7C3AED" },
];

export default function PracticalInfo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const starsOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={sectionRef} id="infos" className="relative py-16 sm:py-24 overflow-hidden spots-pattern" style={{ background: "linear-gradient(to bottom, #FFF8E1 0%, #FFE8A0 100%)" }}>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative text-center mb-14"
        >
          {/* Star left */}
          <motion.div
            className="absolute pointer-events-none select-none z-10"
            style={{ left: "-1rem", top: "-8%", opacity: starsOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ y: [0, -14, -3, -10, 0], rotateZ: [0, -3, 0, 3, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ perspective: 900, transformStyle: "preserve-3d" }}
              >
                <motion.div
                  animate={{ rotateY: [0, -8, 0, 8, 0], rotateX: [0, 4, 6, 2, 0], scale: [1, 1.05, 1.01, 1.04, 1] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/etoile-1.png" alt="" loading="lazy" style={{ height: "clamp(24px, 4vw, 56px)", width: "auto", display: "block", filter: "drop-shadow(-3px 8px 14px rgba(245,166,35,0.35))" }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Star right */}
          <motion.div
            className="absolute pointer-events-none select-none z-10 top-2 right-2 lg:top-[30%] lg:right-8"
            style={{ opacity: starsOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ y: [0, -12, -5, -16, 0], rotateZ: [0, 3, 0, -3, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ perspective: 900, transformStyle: "preserve-3d" }}
              >
                <motion.div
                  animate={{ rotateY: [0, 8, 0, -8, 0], rotateX: [0, 3, 7, 2, 0], scale: [1, 1.04, 1.02, 1.05, 1] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/etoile-2.png" alt="" loading="lazy" style={{ height: "clamp(22px, 4vw, 56px)", width: "auto", display: "block", filter: "drop-shadow(3px 8px 14px rgba(245,166,35,0.35))" }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold mb-4"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Comment nous rejoindre
          </motion.span>
          <h2
            className="text-5xl md:text-6xl font-extrabold text-amber-900"
            style={{ fontFamily: "var(--font-baloo)" }}
          >
            Infos{" "}
            <span className="text-giraffe">pratiques</span>
          </h2>
        </motion.div>


        {/* Mise en page en 3 bandes : repères rapides, puis horaires/tarifs,
            puis adresse/carte. Chaque bande a deux colonnes de hauteur égale —
            la carte ne s'étire donc plus pour compenser une colonne trop haute. */}
        <div className="space-y-6">

          {/* ── Bande 1 — repères rapides ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className="bg-white rounded-2xl p-5 border-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                style={{ borderColor: t.color + (t.strong ? "80" : "30") }}
              >
                <div className="text-3xl mb-2">{t.icon}</div>
                <h4
                  className="font-extrabold text-sm mb-0.5"
                  style={{ fontFamily: "var(--font-baloo)", color: t.color }}
                >
                  {t.label}
                </h4>
                <p className="text-xs text-amber-800/50" style={{ fontFamily: "var(--font-nunito)" }}>{t.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Bande 2 — horaires + tarifs ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Hours card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-amber-50 border border-amber-100"
            >
              <h3
                className="text-2xl font-extrabold text-amber-900 mb-6"
                style={{ fontFamily: "var(--font-baloo)" }}
              >
                Horaires d&rsquo;ouverture
              </h3>
              <div className="space-y-0 divide-y divide-amber-50">
                {hours.map((h, i) =>
                  h.highlight ? (
                    // Jeudi des tout-petits — sorti du flux en carte colorée.
                    <div key={i} className="py-3">
                      <div
                        className="rounded-2xl px-4 py-3 border-2"
                        style={{ background: "#FFF4E0", borderColor: "#F5A62360" }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                          <span className="flex items-center gap-2 font-extrabold text-amber-900" style={{ fontFamily: "var(--font-nunito)" }}>
                            <span aria-hidden="true">🍼</span>
                            {h.day}
                            <span
                              className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide text-white"
                              style={{ background: "#C0392B" }}
                            >
                              Nouveau
                            </span>
                          </span>
                          <span className="font-extrabold text-sm sm:text-base" style={{ fontFamily: "var(--font-baloo)", color: "#E05A2F" }}>
                            {h.time}
                          </span>
                        </div>
                        <p className="text-xs text-amber-800/70 mt-1" style={{ fontFamily: "var(--font-nunito)" }}>
                          {h.note}
                        </p>
                      </div>
                    </div>
                  ) : h.closed ? (
                    // Fermeture : même ligne que les autres (pas d'encart, qui
                    // entrerait en concurrence avec celui du Jeudi), mais en
                    // rouge pour qu'on ne la lise pas comme une ouverture.
                    <div key={i} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-2 py-3.5">
                      <div>
                        <span className="font-bold" style={{ fontFamily: "var(--font-nunito)", color: "#C0392B" }}>{h.day}</span>
                        <p className="text-xs text-amber-800/55" style={{ fontFamily: "var(--font-nunito)" }}>{h.note}</p>
                      </div>
                      <span className="font-extrabold text-sm sm:text-base uppercase tracking-wide" style={{ fontFamily: "var(--font-baloo)", color: "#C0392B" }}>
                        {h.time}
                      </span>
                    </div>
                  ) : (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 py-3.5">
                      <span className="font-bold text-amber-800" style={{ fontFamily: "var(--font-nunito)" }}>{h.day}</span>
                      <span className="font-extrabold text-amber-500 text-sm sm:text-base" style={{ fontFamily: "var(--font-baloo)" }}>{h.time}</span>
                    </div>
                  )
                )}
              </div>
            </motion.div>

            {/* Tarifs card — extrait, le détail est sur /prix-des-entrees */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="flex flex-col bg-white rounded-3xl p-8 shadow-xl shadow-amber-50 border border-amber-100"
            >
              <h3
                className="text-2xl font-extrabold text-amber-900 mb-5"
                style={{ fontFamily: "var(--font-baloo)" }}
              >
                Tarifs d&rsquo;entrée
              </h3>
              <div className="space-y-0 divide-y divide-amber-50 mb-5">
                {tarifs.map((t, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 py-3">
                    <span className="font-bold text-amber-800" style={{ fontFamily: "var(--font-nunito)" }}>{t.label}</span>
                    <span className="font-extrabold text-amber-500 text-sm sm:text-base whitespace-nowrap" style={{ fontFamily: "var(--font-baloo)" }}>{t.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-amber-800/55 mb-4" style={{ fontFamily: "var(--font-nunito)" }}>
Entrées enfant avec 1 jeton offert, adulte avec 1 boisson chaude offerte. Temps de jeu illimité. Tarif spécifique pour les 12&ndash;18 mois.
              </p>
              {/* mt-auto : le lien reste collé en bas même si la carte s'étire
                  pour s'aligner sur celle des horaires. */}
              <Link
                href="/prix-des-entrees"
                className="mt-auto self-start inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 font-bold text-sm hover:bg-white hover:border-amber-300 transition-all"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                Voir tous les tarifs &amp; jetons →
              </Link>
            </motion.div>
          </div>

          {/* ── Bande 3 — adresse + carte ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Address card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col bg-white rounded-3xl p-8 shadow-xl shadow-amber-50 border border-amber-100"
            >
              <h3
                className="text-2xl font-extrabold text-amber-900 mb-5"
                style={{ fontFamily: "var(--font-baloo)" }}
              >
                Nous trouver
              </h3>
              {/* Deux sites distincts : le parc couvert (toute l'année) et le
                  club de plage estival. Adresses identiques au footer. */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <p className="font-bold text-amber-900" style={{ fontFamily: "var(--font-nunito)" }}>Girafou le parc — Toute l&rsquo;année&nbsp;!</p>
                    <p className="text-sm text-amber-800/70" style={{ fontFamily: "var(--font-nunito)" }}>ZA Clos de la Hogue, 14970 Bénouville</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🏖️</span>
                  <div>
                    <p className="font-bold text-amber-900" style={{ fontFamily: "var(--font-nunito)" }}>Girafou Plage Club — De juin à septembre&nbsp;!</p>
                    <p className="text-sm text-amber-800/70" style={{ fontFamily: "var(--font-nunito)" }}>Plage de Ouistreham - Riva Bella, 14150 Ouistreham</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-auto">
                <a
                  href="tel:0231537268"
                  className="btn-shine flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-bold text-sm shadow-lg hover:-translate-y-0.5 transition-all"
                  style={{ background: "linear-gradient(135deg, #F5A623, #FF5722)", fontFamily: "var(--font-nunito)" }}
                >
                  📞 02 31 53 72 68
                </a>
                <a
                  href="mailto:contact@girafou.com"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 font-bold text-sm hover:bg-white hover:border-amber-300 transition-all"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  ✉️ contact@girafou.com
                </a>
              </div>
            </motion.div>

            {/* Map — l'iframe est en absolute pour remplir la tuile sans imposer
                sa propre hauteur : la carte s'aligne sur la fiche adresse. */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="relative rounded-3xl overflow-hidden shadow-xl border border-amber-100 min-h-[300px]"
            >
              <iframe
                src="https://maps.google.com/maps?q=Girafou,+ZA+Clos+de+la+Hogue,+14970+B%C3%A9nouville,+France&output=embed&z=15"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Girafou Bénouville"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
