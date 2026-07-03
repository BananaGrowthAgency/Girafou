"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const privatisationTags = ["Anniversaire", "Comité d’entreprise", "Arbre de Noël", "Événement sur mesure"];

export default function CarteEvents() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="evenements" className="relative scroll-mt-32 py-14 overflow-hidden">
      {/* Confetti — reused from the home Birthday section for visual continuity */}
      <motion.div
        className="hidden lg:block absolute pointer-events-none select-none"
        style={{ left: "-3rem", top: 0, zIndex: 0 }}
      >
        <motion.div
          animate={{ y: [0, -8, -2, -6, 0], rotateZ: [0, -1, 0, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/birthday/confettis-left.png" alt="" loading="lazy" style={{ height: "clamp(90px, 14vw, 180px)", width: "auto", display: "block" }} />
        </motion.div>
      </motion.div>
      <motion.div
        className="hidden lg:block absolute pointer-events-none select-none"
        style={{ right: "-3rem", top: 0, zIndex: 0 }}
      >
        <motion.div
          animate={{ y: [0, -10, -3, -7, 0], rotateZ: [0, 1, 0, -1, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/birthday/confettis-right.png" alt="" loading="lazy" style={{ height: "clamp(90px, 14vw, 180px)", width: "auto", display: "block" }} />
        </motion.div>
      </motion.div>

      <div ref={ref} className="relative max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Anniversaire */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-7 text-white shadow-xl overflow-hidden"
          style={{ background: "#C0392B" }}
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-extrabold mb-3"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            🎉 Fêtes inoubliables
          </span>
          <h3 className="text-2xl font-extrabold mb-2" style={{ fontFamily: "var(--font-baloo)" }}>
            Viens fêter ton anniversaire à Girafou !
          </h3>
          <p className="text-sm text-white/80 leading-relaxed mb-5" style={{ fontFamily: "var(--font-nunito)" }}>
            Nos formules tout inclus garantissent une fête mémorable, de l&rsquo;amusement aux friandises, prise en charge par notre équipe.
          </p>
          <Link
            href="/#anniversaires"
            className="btn-shine inline-block px-5 py-3 rounded-2xl bg-white font-extrabold text-sm hover:-translate-y-0.5 transition-all duration-200"
            style={{ color: "#C0392B", fontFamily: "var(--font-nunito)" }}
          >
            Voir les formules
          </Link>
        </motion.div>

        {/* Privatisation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl p-7 bg-white shadow-xl border border-amber-100"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-extrabold mb-3"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            ✨ Sur mesure
          </span>
          <h3 className="text-2xl font-extrabold text-amber-900 mb-2" style={{ fontFamily: "var(--font-baloo)" }}>
            Privatisation
          </h3>
          <p className="text-sm text-amber-800/60 leading-relaxed mb-4" style={{ fontFamily: "var(--font-nunito)" }}>
            Girafou propose aussi la privatisation pour vos événements professionnels ou personnels. Nous fournissons des solutions sur mesure pour chaque demande.
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {privatisationTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href="mailto:contact@girafou.com"
            className="inline-block px-5 py-3 rounded-2xl border-2 border-amber-200 text-amber-800 font-extrabold text-sm hover:bg-amber-50 transition-all duration-200"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Devis sur demande ✉️
          </a>
        </motion.div>
      </div>
    </section>
  );
}
