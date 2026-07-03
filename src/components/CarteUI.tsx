"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export type Item = { name: string; price: string; desc?: string; note?: string; image?: string };
export type Column = { title: string; items: Item[]; footnote?: string; image?: string; emoji?: string };

export function Section({
  id,
  background,
  patterned,
  children,
}: {
  id: string;
  background?: string;
  patterned?: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section
      id={id}
      className={`relative scroll-mt-32 py-16 overflow-hidden ${patterned ? "spots-pattern" : ""}`}
      style={{ background }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative max-w-5xl mx-auto px-6"
      >
        {children}
      </motion.div>
    </section>
  );
}

export function SectionBadge({ color = "#EA580C", bg = "#FFF7ED", border = "#FFEDD5", children }: { color?: string; bg?: string; border?: string; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-3"
      style={{ fontFamily: "var(--font-nunito)", color, background: bg, border: `1px solid ${border}` }}
    >
      {children}
    </span>
  );
}

export function PriceRow({ item }: { item: Item }) {
  return (
    <div className="group flex items-start justify-between gap-3 py-2.5 border-b border-dashed border-amber-900/10 last:border-0 hover:bg-amber-50/60 rounded-lg px-2 -mx-2 transition-colors duration-200">
      <div className="min-w-0">
        <p className="font-bold text-amber-900 text-[15px] leading-snug" style={{ fontFamily: "var(--font-nunito)" }}>
          {item.name}
          {item.note && <span className="ml-2 text-xs font-semibold text-orange-500">({item.note})</span>}
        </p>
        {item.desc && (
          <p className="text-xs text-amber-800/50 leading-snug mt-0.5" style={{ fontFamily: "var(--font-nunito)" }}>
            {item.desc}
          </p>
        )}
      </div>
      {item.price && (
        <span
          className="flex-shrink-0 font-extrabold text-orange-600 text-[15px] group-hover:scale-110 transition-transform duration-200"
          style={{ fontFamily: "var(--font-baloo)" }}
        >
          {item.price}
        </span>
      )}
    </div>
  );
}

export function ColumnCard({ column, accent = "#F5A623" }: { column: Column; accent?: string }) {
  const [err, setErr] = useState(!column.image);
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md shadow-amber-50 border border-amber-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative h-32 flex-shrink-0">
        {!err && column.image ? (
          <Image
            src={column.image}
            alt={column.title}
            fill
            className="object-cover"
            onError={() => setErr(true)}
            sizes="(max-width: 768px) 100vw, 340px"
          />
        ) : (
          <div className="absolute inset-0 img-placeholder rounded-none border-0 border-b-2" style={{ borderColor: accent + "40" }}>
            <span className="text-3xl opacity-50">{column.emoji ?? "📸"}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-extrabold mb-2" style={{ color: accent, fontFamily: "var(--font-baloo)" }}>
          {column.title}
        </h3>
        <div>
          {column.items.map((item, i) => (
            <PriceRow key={i} item={item} />
          ))}
        </div>
        {column.footnote && (
          <p className="text-xs text-amber-800/45 mt-3 italic" style={{ fontFamily: "var(--font-nunito)" }}>
            {column.footnote}
          </p>
        )}
      </div>
    </div>
  );
}

export function SectionImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [err, setErr] = useState(false);
  if (err) return null;
  return (
    <div className={`relative w-full h-40 md:h-52 rounded-3xl overflow-hidden mb-6 shadow-md ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" onError={() => setErr(true)} sizes="(max-width: 768px) 100vw, 900px" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,16,8,0.35), transparent 50%)" }} />
    </div>
  );
}

/** Illustrated product card with a photo slot — falls back to a placeholder until the real photo is dropped at `item.image`. */
export function ProductCard({ item, emoji, accent = "#FF5722" }: { item: Item; emoji: string; accent?: string }) {
  const [err, setErr] = useState(!item.image);
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-amber-100">
      <div className="relative h-36 flex-shrink-0">
        {!err && item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setErr(true)}
            sizes="(max-width: 640px) 50vw, 220px"
          />
        ) : (
          <div className="absolute inset-0 img-placeholder rounded-none border-0 border-b-2" style={{ borderColor: accent + "40" }}>
            <span className="text-3xl opacity-50">{emoji}</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <p className="font-extrabold text-amber-900 text-sm leading-snug" style={{ fontFamily: "var(--font-baloo)" }}>
          {item.name}
        </p>
        {item.desc && (
          <p className="text-xs text-amber-800/50 leading-snug" style={{ fontFamily: "var(--font-nunito)" }}>
            {item.desc}
          </p>
        )}
        <span
          className="mt-auto pt-1 font-extrabold text-sm"
          style={{ color: accent, fontFamily: "var(--font-baloo)" }}
        >
          {item.price}
        </span>
      </div>
    </div>
  );
}
