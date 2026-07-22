"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLocalePath } from "@/lib/i18n/useLocale";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// Contenu (17 questions) repris à l'identique de https://girafou.com/f-a-q/
// puis traduit ; il vit dans les dictionnaires, ces types en dérivent.
type FaqStrings = Dictionary["pages"]["faq"];
// Un segment de texte : texte simple, souligné (u), ou lien (href).
type Seg = FaqStrings["items"][number]["a"][number] extends (infer S)[] | null ? S : never;
// `important` = règle du parc, remontée en tête de liste et badgée : ce sont
// les deux sujets qui génèrent des réclamations à l'accueil.
type QA = FaqStrings["items"][number];

function Segment({ s }: { s: Seg }) {
  const lp = useLocalePath();
  if (s.href) {
    return (
      <a href={lp(s.href)} className="underline text-[#C0392B] hover:text-[#FF5722] transition-colors">
        {s.t}
      </a>
    );
  }
  return <span className={s.u ? "underline" : undefined}>{s.t}</span>;
}

// Chaque item a son propre useInView → cascade réelle au scroll.
function FaqItem({ item, isOpen, onToggle, badge }: { item: QA; isOpen: boolean; onToggle: () => void; badge: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group rounded-2xl bg-white overflow-hidden border-2 transition-[border-color,box-shadow] duration-200 ${
        isOpen
          ? "border-[#F5A623]/60 shadow-lg"
          : "border-[#F5A623]/15 shadow-sm hover:border-[#F5A623]/50 hover:shadow-md"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 cursor-pointer transition-colors duration-200 ${
          isOpen ? "bg-[#FFF9EF]" : "group-hover:bg-[#FFF9EF]"
        }`}
      >
        <span className="min-w-0">
          {item.important && (
            <span
              className="inline-block mb-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide text-white"
              style={{ background: "#C0392B", fontFamily: "var(--font-nunito)" }}
            >
              {badge}
            </span>
          )}
          <span
            className={`block font-bold text-base sm:text-lg transition-colors duration-200 ${
              isOpen ? "text-[#E8940A]" : "text-[#1C1008] group-hover:text-[#E8940A]"
            }`}
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {item.q}
          </span>
        </span>
        {/* Wrapper (span simple) pour le scale au hover — le motion.span gère la rotation */}
        <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex w-8 h-8 rounded-full items-center justify-center text-white text-xl leading-none shadow-sm"
            style={{ background: isOpen ? "#E8940A" : "var(--giraffe-yellow)" }}
            aria-hidden
          >
            +
          </motion.span>
        </span>
      </button>
      {/* Toujours monté (indexable par les moteurs de recherche), collapsé via height. */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
        aria-hidden={!isOpen}
      >
        <div className="px-5 sm:px-6 pb-5 text-sm sm:text-base leading-relaxed space-y-1" style={{ fontFamily: "var(--font-nunito)", color: "var(--text-muted)" }}>
          {item.a.map((line, li) =>
            line === null ? (
              <div key={li} className="h-3" aria-hidden />
            ) : (
              <p key={li}>
                {line.map((s, si) => (
                  <Segment key={si} s={s} />
                ))}
              </p>
            )
          )}
        </div>
      </motion.div>
    </motion.li>
  );
}

export default function Faq({ t }: { t: FaqStrings }) {
  const [open, setOpen] = useState<number | null>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden spots-pattern" style={{ background: "linear-gradient(to bottom, #FFFDF5 0%, #FFF3D0 100%)" }}>
      <div className="relative max-w-3xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-block text-4xl mb-3" aria-hidden>🦒</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold" style={{ fontFamily: "var(--font-baloo)", color: "var(--giraffe-brown)" }}>
            {t.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg" style={{ fontFamily: "var(--font-nunito)", color: "var(--text-muted)" }}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Accordion */}
        <ul className="space-y-3">
          {t.items.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
              badge={t.importantBadge}
            />
          ))}
        </ul>

      </div>
    </section>
  );
}
