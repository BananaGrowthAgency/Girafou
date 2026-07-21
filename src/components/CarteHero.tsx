"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { NOURRITURE_EXCEPTIONS, NOURRITURE_TITLE } from "@/lib/regles";
import { GRADIENT_TEXT_NO_OUTLINE, TEXT_OUTLINE, TEXT_OUTLINE_SOFT, TITLE_YELLOW } from "@/lib/text";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";

export default function CarteHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "56vh" }}>
      {/* Background photo */}
      <Image
        src="/images/nos-offres/hero.jpg"
        alt="Le parc de jeux Girafou"
        fill
        priority
        className="object-cover object-bottom"
        sizes="100vw"
      />

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(28,16,8,0.55) 0%, rgba(28,16,8,0.45) 100%)" }} />
      {/* Vague en bas vers la section carte (comme cette image l'avait sur Nos offres) */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none leading-[0]">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[60px]">
          <path d="M0,50 C360,90 720,10 1080,40 C1260,55 1380,45 1440,40 L1440,80 L0,80 Z" fill="#E0F2F1" />
        </svg>
      </div>

      <div ref={ref} className="relative max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-bold"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            🍕 Manger sur place
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight"
          style={{ fontFamily: "var(--font-baloo)", textShadow: TEXT_OUTLINE }}
        >
          La{" "}
          <span
            className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
            style={GRADIENT_TEXT_NO_OUTLINE}
          >
            carte
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-white/80 max-w-xl mx-auto"
          style={{ fontFamily: "var(--font-nunito)", textShadow: TEXT_OUTLINE_SOFT }}
        >
          Pizzas maison, crêpes, gaufres, glaces et boissons — tout ce qu&rsquo;il faut pour recharger les batteries entre deux parties.
        </motion.p>

        {/* Règle « nourriture extérieure » — dans le hero plutôt qu'en bandeau
            séparé : le message arrive avant la carte sans couper la vague qui
            relie le hero à la section boissons. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-7 flex items-start gap-4 text-left px-6 py-4 rounded-2xl backdrop-blur-md"
          style={{
            background: "rgba(192,57,43,0.82)",
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow: "0 10px 34px rgba(28,16,8,0.35)",
          }}
        >
          <span className="text-3xl leading-none mt-0.5 flex-shrink-0" aria-hidden="true">🚫</span>
          <div>
            <p className="font-extrabold text-lg sm:text-xl leading-snug" style={{ fontFamily: BALOO, color: TITLE_YELLOW, textShadow: TEXT_OUTLINE }}>
              {NOURRITURE_TITLE}
            </p>
            <p className="text-white font-bold text-sm sm:text-base leading-snug" style={{ fontFamily: NUNITO, textShadow: TEXT_OUTLINE }}>
              Normes sanitaires — tout est disponible sur place.
            </p>
            <p className="text-white/85 font-semibold text-xs sm:text-sm leading-snug mt-1" style={{ fontFamily: NUNITO, textShadow: TEXT_OUTLINE_SOFT }}>
              {NOURRITURE_EXCEPTIONS}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
