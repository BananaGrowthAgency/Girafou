"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";


const links = [
  { label: "Accueil", href: "#" },
  { label: "Activités", href: "#activites" },
  { label: "Restauration", href: "#restauration" },
  { label: "Nos offres", href: "#anniversaires" },
  { label: "Anniversaires", href: "#anniversaires" },
  { label: "Infos pratiques", href: "#infos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
      className="sticky top-0 left-0 right-0 z-50"
      style={{ background: "transparent" }}
    >
      {/* Padding exterior que aparece solo en scroll para flotar la cápsula */}
      <div
        style={{
          paddingTop: scrolled ? 8 : 0,
          paddingLeft: scrolled ? 20 : 0,
          paddingRight: scrolled ? 20 : 0,
          transition: "padding 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Barra / cápsula */}
        <div
          style={{
            background: "#1C1008",
            borderRadius: scrolled ? 999 : 0,
            border: scrolled ? "1px solid rgba(180,110,30,0.45)" : "none",
            boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.6)" : "none",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            maxWidth: scrolled ? 1100 : "100%",
            marginLeft: "auto",
            marginRight: "auto",
            transition: "border-radius 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s, max-width 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <nav
            className="flex items-center justify-between gap-4 px-6 lg:px-8"
            style={{ height: 72 }}
          >
            {/* Logo */}
            <a href="#" className="flex-shrink-0 group">
              <Image
                src="/images/logo-girafou.png"
                alt="Girafou"
                width={160}
                height={67}
                className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </a>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-4 lg:gap-6">
              {links.map((l) => (
                <li key={l.label} className="flex-shrink-0">
                  <a
                    href={l.href}
                    className="relative text-[13px] lg:text-[14px] font-bold text-white/80 hover:text-amber-400 transition-colors duration-200 group whitespace-nowrap"
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[2.5px] bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-full transition-all duration-300 rounded-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              <a
                href="tel:0231537268"
                className="text-xs font-bold text-white/50 hover:text-amber-400 transition-colors whitespace-nowrap"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                02 31 53 72 68
              </a>
              <a
                href="#anniversaires"
                className="btn-shine px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-extrabold shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                Réserver
              </a>
            </div>

            {/* Mobile burger */}
            <button
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span className={`w-6 h-[2.5px] bg-white/80 rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7.5px]" : ""}`} />
              <span className={`w-6 h-[2.5px] bg-white/80 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`w-6 h-[2.5px] bg-white/80 rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""}`} />
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-amber-900/30"
            style={{ background: "#1C1008" }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-extrabold text-white/80 hover:text-amber-400 transition-colors"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#anniversaires"
                onClick={() => setMenuOpen(false)}
                className="btn-shine mt-1 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-center font-extrabold shadow-lg"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                Réserver maintenant
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}
