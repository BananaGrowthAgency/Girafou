"use client";

import { motion } from "framer-motion";
import { Section, ProductCard, ColumnCard, PriceRow } from "./CarteUI";
import Wave from "./Wave";
import type { Category, Menu } from "@/lib/menu/types";
import {
  chromeFor,
  DEFAULT_ITEMS_CLASS,
  DEFAULT_COLUMNS_CLASS,
} from "@/lib/menu/chrome";

/**
 * Data-driven renderer for the restauration menu. Reads the park's `menu.json`
 * (via getMenu on the server) and renders each category with the existing
 * CarteUI primitives + its code-side visual chrome. Replaces the old set of
 * hardcoded Carte* section components.
 */
export default function MenuSections({ menu }: { menu: Menu }) {
  return (
    <>
      {menu.categories.map((cat, i) => (
        <CategorySection key={cat.id} category={cat} first={i === 0} />
      ))}
    </>
  );
}

function CategorySection({ category, first }: { category: Category; first: boolean }) {
  const chrome = chromeFor(category.id);

  return (
    <>
      {/* Wave divider tinted with this section's top color (matches original transitions). */}
      <Wave fill={chrome.waveFill} above={first ? chrome.waveFill : undefined} />
      <CategoryBody category={category} />
    </>
  );
}

function CategoryBody({ category }: { category: Category }) {
  const chrome = chromeFor(category.id);

  return (
    <Section id={category.id} background={chrome.background} patterned={chrome.patterned}>
      {chrome.glow && (
        <div
          className={`absolute ${chrome.glow.position} w-64 h-64 rounded-full pointer-events-none`}
          style={{
            background: `radial-gradient(circle, ${chrome.glow.color} 0%, transparent 70%)`,
            filter: "blur(50px)",
          }}
        />
      )}

      {category.id === "pizzas" && <PizzaSticker />}

      <h2
        className="text-3xl md:text-4xl font-extrabold text-amber-900 mb-2"
        style={{ fontFamily: "var(--font-baloo)" }}
      >
        {category.heading}
      </h2>
      {category.subtitle && (
        <p
          className="text-sm text-amber-800/55 mb-6 max-w-xl"
          style={{ fontFamily: "var(--font-nunito)" }}
        >
          {category.subtitle}
        </p>
      )}
      {!category.subtitle && <div className="mb-4" />}

      {category.layout === "columns" ? (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className={chrome.columnsClass ?? DEFAULT_COLUMNS_CLASS}
        >
          {(category.columns ?? []).map((col) => (
            <motion.div
              key={col.id}
              variants={{ hidden: { opacity: 0, y: 25 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
            >
              <ColumnCard column={col} accent={chrome.accent} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className={chrome.itemsClass ?? DEFAULT_ITEMS_CLASS}
        >
          {(category.items ?? []).map((item) => (
            <motion.div
              key={item.id}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45 }}
            >
              <ProductCard item={item} emoji={category.emoji} accent={chrome.accent} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {category.id === "pizzas" && <PizzaExtras />}
      {category.id === "gouter" && <GouterFormule />}
    </Section>
  );
}

/* ── Bespoke code-side decorations (not editable in the pilot) ── */

function PizzaSticker() {
  return (
    <motion.div
      className="hidden md:block absolute pointer-events-none select-none z-10"
      style={{ right: "1rem", top: "-1.5rem" }}
    >
      <motion.div
        animate={{ y: [0, -8, -2, -6, 0], rotateZ: [0, -3, 0, 3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/resto/pastille-pizza-2-50.png"
          alt="2,50 € par enfant — option pizza anniversaire"
          loading="lazy"
          style={{
            height: "clamp(70px, 8vw, 100px)",
            width: "auto",
            display: "block",
            filter: "drop-shadow(-2px 6px 12px rgba(0,0,0,0.25))",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function PizzaExtras() {
  return (
    <>
      {/* Formule du midi — highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl p-6 md:p-7 text-white shadow-xl overflow-hidden mt-6 mb-5"
        style={{ background: "linear-gradient(135deg, #FF5722, #F5A623)" }}
      >
        <span
          className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold mb-2"
          style={{ fontFamily: "var(--font-nunito)" }}
        >
          ⭐ Formule du midi
        </span>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-lg font-extrabold leading-snug" style={{ fontFamily: "var(--font-baloo)" }}>
            Pizza au choix + un pichet de sirop au choix
          </p>
          <span className="text-3xl font-extrabold" style={{ fontFamily: "var(--font-baloo)" }}>
            14,90 €
          </span>
        </div>
      </motion.div>

      {/* Chips & Fruits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-white rounded-3xl p-6 shadow-md shadow-amber-50 border border-amber-100">
          <h3 className="text-lg font-extrabold text-amber-900 mb-2" style={{ fontFamily: "var(--font-baloo)" }}>
            Chips
          </h3>
          <PriceRow item={{ name: "Chips nature", price: "1,60 €" }} />
          <PriceRow item={{ name: "Petit Pringles", price: "1,90 €" }} />
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-md shadow-amber-50 border border-amber-100 flex flex-col justify-center">
          <h3 className="text-lg font-extrabold text-amber-900 mb-2" style={{ fontFamily: "var(--font-baloo)" }}>
            Fruits
          </h3>
          <p className="text-sm text-amber-800/55" style={{ fontFamily: "var(--font-nunito)" }}>
            Voir sur le bar en fonction de la saison 🍎
          </p>
        </div>
      </div>
    </>
  );
}

function GouterFormule() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="relative rounded-3xl p-6 md:p-7 text-white shadow-xl overflow-hidden mt-5"
      style={{ background: "linear-gradient(135deg, #7C3AED, #FF4081)" }}
    >
      <div
        className="hidden md:block absolute top-0 bottom-0 pointer-events-none"
        style={{ right: "34%", width: 0, borderLeft: "2px dashed rgba(255,255,255,0.35)" }}
      />
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <span
            className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold mb-2"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            ⭐ Formule goûter
          </span>
          <p className="text-lg font-extrabold leading-snug" style={{ fontFamily: "var(--font-baloo)" }}>
            1 crêpe au choix + 1 Capri-Sun
          </p>
        </div>
        <span className="text-3xl font-extrabold" style={{ fontFamily: "var(--font-baloo)" }}>
          4,30 €
        </span>
      </div>
    </motion.div>
  );
}
