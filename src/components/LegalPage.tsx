"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";
const BROWN = "#5A3520";
const RED = "#C0392B";

export type LegalSection = { heading?: string; paragraphs: string[] };
type Props = {
  title: string;
  highlight?: string;
  subtitle?: string;
  badge?: string;
  sections: LegalSection[];
};

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function LegalPage({ title, highlight, subtitle, badge = "Informations légales", sections }: Props) {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const bodyRef = useRef(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: "-60px" });

  const withHeadings = sections.filter((s) => s.heading);
  const showToc = withHeadings.length >= 4;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-16 pb-12 overflow-hidden spots-pattern" style={{ background: "linear-gradient(160deg, #FFF8E1 0%, #FFF3C4 55%, #FFFDF5 100%)" }}>
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full pointer-events-none animate-blob" style={{ background: "radial-gradient(circle, rgba(245,166,35,0.16) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none animate-blob-delay" style={{ background: "radial-gradient(circle, rgba(255,87,34,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div ref={heroRef} className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold mb-4"
            style={{ fontFamily: NUNITO }}
          >
            {badge}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-5xl font-extrabold text-amber-900 leading-tight" style={{ fontFamily: BALOO }}>
            {title} {highlight && <span className="text-giraffe">{highlight}</span>}
          </motion.h1>
          {subtitle && (
            <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="mt-4 text-base sm:text-lg text-amber-900/60 max-w-xl mx-auto" style={{ fontFamily: NUNITO }}>
              {subtitle}
            </motion.p>
          )}
        </div>
      </section>

      <div style={{ background: "#FFFDF5" }}>
        <motion.div
          ref={bodyRef}
          initial={{ opacity: 0, y: 24 }}
          animate={bodyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto px-6 py-14"
        >
          {/* Sommaire */}
          {showToc && (
            <nav className="mb-8 rounded-2xl bg-white shadow-sm border border-amber-100 p-5">
              <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: RED, fontFamily: NUNITO }}>Sommaire</p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                {withHeadings.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${slug(s.heading!)}`} className="text-sm text-amber-900/75 hover:text-orange-500 transition-colors font-semibold" style={{ fontFamily: NUNITO }}>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Contenu */}
          <article className="rounded-3xl bg-white shadow-lg border border-amber-100 p-6 sm:p-9 space-y-8">
            {sections.map((s, i) => (
              <section key={i} id={s.heading ? slug(s.heading) : undefined} className="scroll-mt-28">
                {s.heading && (
                  <h2 className="flex items-center gap-2.5 text-lg sm:text-xl font-extrabold mb-3" style={{ fontFamily: BALOO, color: BROWN }}>
                    <span className="inline-block w-1.5 h-5 rounded-full flex-shrink-0" style={{ background: RED }} />
                    {s.heading}
                  </h2>
                )}
                <div className="space-y-3 text-sm sm:text-[15px] text-amber-900/80 leading-relaxed" style={{ fontFamily: NUNITO }}>
                  {s.paragraphs.map((p, j) => (
                    <p key={j} className="whitespace-pre-line">{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>
        </motion.div>
      </div>
    </>
  );
}
