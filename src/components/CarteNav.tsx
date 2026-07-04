"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export type NavCategory = { id: string; label: string; emoji: string };

export default function CarteNav({ categories }: { categories: NavCategory[] }) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [categories]);

  // Keep the active pill in view as the user scrolls the page — slides the
  // horizontal pill strip left/right so you can always see which section you're in.
  useEffect(() => {
    const pill = scrollerRef.current?.querySelector<HTMLElement>(`[data-cat-id="${active}"]`);
    pill?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  return (
    <div className="sticky top-[88px] z-40 h-0 overflow-visible px-4 pointer-events-none">
      <div
        className="max-w-fit mx-auto rounded-full px-2 py-2 pointer-events-auto"
        style={{
          background: "rgba(255,253,245,0.92)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 30px rgba(92,51,23,0.14)",
          border: "1px solid rgba(139,94,60,0.12)",
        }}
      >
        <div ref={scrollerRef} className="flex gap-1.5 overflow-x-auto no-scrollbar max-w-[88vw]">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              data-cat-id={c.id}
              className="relative flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap"
              style={{ fontFamily: "var(--font-nunito)", color: active === c.id ? "#fff" : "#8B5E3C" }}
            >
              {active === c.id && (
                <motion.span
                  layoutId="carte-nav-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(135deg, #F5A623, #FF5722)", boxShadow: "0 4px 14px rgba(255,87,34,0.35)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{c.emoji}</span>
              <span className="relative z-10">{c.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
