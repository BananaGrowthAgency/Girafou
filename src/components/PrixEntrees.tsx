"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";
const BROWN = "#6B4423";
const VALUE = "#E05A2F";
const RED = "#C0392B";
// Crème exacte de la carte sur le site d'origine (#FEF1D6). Les découpes (girafe,
// enfants, confettis) sont détourées sur transparence, donc ce ton s'affiche
// uniformément derrière elles, sans aucune bordure visible.
const CREAM = "#FEF1D6";

// Billetterie en ligne (Qweekle) — ouverture dans un nouvel onglet.
const TICKETING_URL =
  "https://girafou.qweekle.com/shop/girafou/ticketing?type=ticket&lang=fr&_gl=1*427gqt*_gcl_au*NDAwNzYxOTg1LjE3ODIzNDQwMDQ.*_ga*MTQ5MTU5NjY1MC4xNzgyMzQ0MDA0*_ga_W96LVS4H2M*czE3ODQwMjYyMDMkbzEzJGcxJHQxNzg0MDI2ODA5JGo1OSRsMCRoNTMwMzE3NDg.";

type Tarif = { label: string; price: string };
const tarifs: Tarif[] = [
  { label: "Moins de 12 mois", price: "Gratuit" },
  { label: "Moins de 18 mois (accompagné d'une entrée enfant -12 ans payante)", price: "Gratuit" },
  { label: "Moins de 18 mois", price: "6,00€" },
  { label: "Moins de 3 ans", price: "8,50€ + 1 jeton offert" },
  { label: "Moins de 12 ans", price: "11,50€ + 1 jeton offert" },
  { label: "Adulte", price: "2,00€ + 1 boisson chaude offerte" },
];

const jetons = [
  { n: "1 jeton", price: "2,00€" },
  { n: "3 jetons", price: "5,00€" },
  { n: "6 jetons", price: "10,00€" },
  { n: "14 jetons", price: "20,00€" },
];

type Horaire = { day: string; note?: string; time: string };
const horaires: Horaire[] = [
  { day: "Mercredi", time: "10h00 à 19h00" },
  { day: "Jeudi des tout-petits", note: "5€ par enfant · gratuit pour les accompagnants", time: "10h00 à 12h30" },
  { day: "Samedi & Dimanche", time: "10h00 à 19h00" },
  { day: "Jours fériés", time: "10h00 à 19h00" },
];

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

export default function PrixEntrees() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-16 pb-12 overflow-hidden spots-pattern" style={{ background: "linear-gradient(160deg, #FFF8E1 0%, #FFF3C4 55%, #FFFDF5 100%)" }}>
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full pointer-events-none animate-blob" style={{ background: "radial-gradient(circle, rgba(245,166,35,0.16) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none animate-blob-delay" style={{ background: "radial-gradient(circle, rgba(255,87,34,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />

        <div ref={heroRef} className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1, y: [0, -8, 0] } : { opacity: 0 }}
            transition={{ opacity: { duration: 0.5 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold mb-4"
            style={{ fontFamily: NUNITO }}
          >
            Tarifs &amp; horaires
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-6xl font-extrabold text-amber-900 mb-4 leading-tight" style={{ fontFamily: BALOO }}>
            Prix des <span className="text-giraffe">entrées</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-amber-900/60 max-w-xl mx-auto" style={{ fontFamily: NUNITO }}>
            Un seul tarif pour un temps de jeu illimité. Retrouvez nos tarifs, les jetons pour les activités et nos horaires d&rsquo;ouverture.
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
              <Image src="/images/prix-entrees/giraffe.png" alt="" width={404} height={437} className="hidden sm:block absolute bottom-24 md:bottom-28 left-2 md:left-6 w-32 md:w-40 lg:w-48 h-auto pointer-events-none select-none" />

              <div className="relative px-6 sm:px-12 pt-12 sm:pt-14 pb-10 sm:pb-12">
                {/* Prix des entrées */}
                <Title>Prix des entrées individuelles</Title>
                <ul className="mt-7 space-y-3 text-center">
                  {tarifs.map((t, i) => (
                    <li key={i} className="text-base sm:text-lg leading-snug" style={{ fontFamily: NUNITO }}>
                      <span className="font-extrabold" style={{ color: BROWN }}>{t.label} : </span>
                      <span className="font-extrabold" style={{ color: VALUE }}>{t.price}</span>
                    </li>
                  ))}
                </ul>

                {/* Jetons */}
                <div className="mt-12">
                  <Title>Les jetons pour nos activités</Title>
                  <ul className="mt-6 space-y-2 text-center">
                    {jetons.map((j) => (
                      <li key={j.n} className="text-base sm:text-lg" style={{ fontFamily: NUNITO }}>
                        <span className="font-extrabold" style={{ color: BROWN }}>{j.n} : </span>
                        <span className="font-extrabold" style={{ color: VALUE }}>{j.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-9 text-center text-sm sm:text-base font-semibold" style={{ fontFamily: NUNITO, color: BROWN }}>
                  Moyens de paiement acceptés : Espèces, Carte Bleue, Chèque vacances ANCV et ANCV Connect
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href={TICKETING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-3.5 rounded-2xl text-white text-lg font-extrabold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
                style={{ background: RED, fontFamily: BALOO }}
              >
                Réserver mes billets
              </a>
            </div>
          </Reveal>

          {/* ── Horaires ── */}
          <Reveal>
            {/* Bandeau enfants */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-md mb-6 min-h-[140px] sm:min-h-[170px] flex items-center justify-center" style={{ background: CREAM }}>
              <Image src="/images/prix-entrees/spots-h.png" alt="" width={300} height={165} className="absolute top-0 left-0 w-24 sm:w-32 h-auto pointer-events-none select-none" />
              <Image src="/images/prix-entrees/kids.png" alt="" width={283} height={284} className="absolute bottom-0 right-3 sm:right-8 w-20 sm:w-28 h-auto pointer-events-none select-none" />
              <h2 className="relative text-2xl sm:text-4xl font-extrabold px-24 sm:px-32 text-center" style={{ fontFamily: BALOO, color: BROWN }}>
                Horaires aire de jeux Girafou
              </h2>
            </div>

            {/* Tableau */}
            <div className="rounded-[1.5rem] overflow-hidden shadow-lg border border-amber-900/10">
              <div className="py-3.5 text-center text-white text-lg font-extrabold tracking-wide" style={{ background: RED, fontFamily: BALOO }}>
                TOUTE L&rsquo;ANNÉE
              </div>

              {/* En-têtes de colonnes */}
              <div className="flex items-stretch bg-white" style={{ borderBottom: "1px solid rgba(120,80,40,0.12)" }}>
                <div className="flex-1 px-5 py-3 text-center text-lg font-extrabold" style={{ fontFamily: BALOO, color: BROWN }}>Jours d&rsquo;ouverture</div>
                <div className="w-32 sm:w-52 px-4 py-3 text-center text-lg font-extrabold" style={{ fontFamily: BALOO, color: BROWN, borderLeft: "1px solid rgba(120,80,40,0.12)" }}>Horaires</div>
              </div>

              {horaires.map((h, i) => (
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
              {[
                "PENDANT LES VACANCES SCOLAIRES — Normandie (Zone B)",
                "PENDANT LES VACANCES SCOLAIRES — Paris (Zone C)",
              ].map((zone) => (
                <div key={zone}>
                  <div className="px-5 py-3 text-center text-white text-sm sm:text-base font-bold" style={{ background: RED, fontFamily: NUNITO }}>
                    {zone}
                  </div>
                  <div className="flex items-stretch bg-white">
                    <div className="flex-1 px-5 py-4 font-bold text-sm sm:text-base text-amber-900/85" style={{ fontFamily: NUNITO }}>Tous les jours</div>
                    <div className="w-32 sm:w-52 px-4 py-4 flex items-center justify-center text-center font-bold text-sm sm:text-base text-amber-900/85" style={{ fontFamily: NUNITO, borderLeft: "1px solid rgba(120,80,40,0.08)" }}>
                      10h00 à 19h00
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ── Note chaussettes ── */}
          <Reveal>
            <div className="flex items-center gap-5 rounded-2xl p-5 sm:p-6 border-2 border-dashed" style={{ borderColor: "#F5A623", background: "#FFF8E7" }}>
              <Image
                src="/images/chaussettes-obligatoires.png"
                alt="Chaussettes obligatoires"
                width={90}
                height={90}
                className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 object-contain"
              />
              <p className="text-sm sm:text-base text-amber-900/75 leading-relaxed" style={{ fontFamily: NUNITO }}>
                Pour accéder aux jeux, vos enfants doivent être obligatoirement en chaussette. L&rsquo;accès pied-nus sera refusé pour des raisons d&rsquo;hygiène et de bien-être de tous. Merci de votre compréhension.
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </>
  );
}
