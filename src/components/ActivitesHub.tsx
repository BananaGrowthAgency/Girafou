"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ACTIVITES, type Activite } from "@/lib/activites";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";

function ActiviteCard({ a, i, inView }: { a: Activite; i: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 55, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
    >
      <div className="relative h-48 overflow-hidden" style={{ background: a.accentLight }}>
        <Image
          src={a.image}
          alt={a.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-[11px] font-extrabold shadow-md"
          style={{ background: a.tagBg, fontFamily: NUNITO }}
        >
          {a.tag}
        </span>
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: `linear-gradient(to top, ${a.accentLight}, transparent)` }} />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-xl font-extrabold" style={{ fontFamily: BALOO, color: a.accent }}>
          {a.name}
        </h3>
        <p className="text-sm text-amber-900/60 leading-relaxed flex-1" style={{ fontFamily: NUNITO }}>
          {a.cardDesc}
        </p>
        <Link
          href={`/activites/${a.slug}`}
          className="self-start mt-1 px-4 py-2 rounded-xl text-white text-xs font-extrabold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          style={{ background: a.accent, fontFamily: NUNITO }}
        >
          En savoir +
        </Link>
      </div>
    </motion.div>
  );
}

export default function ActivitesHub() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-16 pb-12 overflow-hidden spots-pattern" style={{ background: "linear-gradient(160deg, #FFF8E1 0%, #FFF3C4 55%, #FFFDF5 100%)" }}>
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full pointer-events-none animate-blob" style={{ background: "radial-gradient(circle, rgba(245,166,35,0.16) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none animate-blob-delay" style={{ background: "radial-gradient(circle, rgba(255,87,34,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />

        <div ref={heroRef} className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold mb-4"
            style={{ fontFamily: NUNITO }}
          >
            9 activités sous un même toit
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-6xl font-extrabold text-amber-900 mb-4 leading-tight" style={{ fontFamily: BALOO }}>
            Des aventures pour <span className="text-giraffe">tous les âges</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-amber-900/60 max-w-xl mx-auto" style={{ fontFamily: NUNITO }}>
            1 300 m² de jeux couverts à Bénouville, près de Caen. Survole, saute, glisse, pilote… il y en a pour toute la famille !
          </motion.p>
        </div>
      </section>

      {/* ── Grille ── */}
      <section ref={gridRef} className="relative py-16 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITES.map((a, i) => (
            <ActiviteCard key={a.slug} a={a} i={i} inView={gridInView} />
          ))}
        </div>
      </section>
    </>
  );
}
