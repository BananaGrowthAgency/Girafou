"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FORMULES } from "@/lib/anniversaires";

type NavLink = { label: string; href: string; children?: { label: string; href: string }[] };

const links: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Activités", href: "/#activites" },
  { label: "Restauration", href: "/restauration" },
  { label: "Nos offres", href: "/#anniversaires" },
  {
    label: "Anniversaires",
    href: "/anniversaires",
    children: FORMULES.map((f) => ({ label: f.name, href: `/anniversaires/${f.slug}` })),
  },
  { label: "Infos pratiques", href: "/#infos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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
            borderRadius: scrolled ? (menuOpen ? "28px 28px 0 0" : 999) : 0,
            border: scrolled ? "1px solid rgba(180,110,30,0.45)" : "none",
            borderBottom: scrolled && menuOpen ? "1px solid rgba(180,110,30,0.2)" : undefined,
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
            <Link href="/" className="flex-shrink-0 group">
              <Image
                src="/images/logo-girafou.png"
                alt="Girafou"
                width={160}
                height={67}
                className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-4 lg:gap-6">
              {links.map((l) => {
                const active = !l.href.includes("#") && (l.href === "/" ? pathname === "/" : pathname === l.href || pathname.startsWith(l.href + "/"));
                return (
                  <li key={l.label} className="relative flex-shrink-0 group/nav">
                    <Link
                      href={l.href}
                      className={`relative inline-flex items-center gap-1 text-[13px] lg:text-[14px] font-bold transition-colors duration-200 group whitespace-nowrap ${active ? "text-amber-400" : "text-white/80 hover:text-amber-400"}`}
                      style={{ fontFamily: "var(--font-nunito)" }}
                    >
                      {l.label}
                      {l.children && (
                        <svg className="w-3 h-3 opacity-70 transition-transform duration-200 group-hover/nav:rotate-180" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 4.5 6 7.5 9 4.5" />
                        </svg>
                      )}
                      <span className={`absolute -bottom-0.5 left-0 h-[2.5px] bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300 rounded-full ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                    </Link>

                    {l.children && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-1 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-200 z-50">
                        <div
                          className="rounded-2xl py-2 min-w-[230px] shadow-2xl"
                          style={{ background: "#1C1008", border: "1px solid rgba(180,110,30,0.4)", backdropFilter: "blur(20px)" }}
                        >
                          {l.children.map((c) => {
                            const cActive = pathname === c.href;
                            return (
                              <Link
                                key={c.href}
                                href={c.href}
                                className={`block px-5 py-2.5 text-[13px] font-bold transition-colors hover:bg-white/5 ${cActive ? "text-amber-400" : "text-white/75 hover:text-amber-400"}`}
                                style={{ fontFamily: "var(--font-nunito)" }}
                              >
                                {c.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
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
              <Link
                href="/#anniversaires"
                className="btn-shine px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-extrabold shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                Réserver
              </Link>
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

        {/* Mobile menu — same floating card as the capsule above, closing its shape */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
              style={{
                background: "#1C1008",
                maxWidth: scrolled ? 1100 : "100%",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: scrolled ? "0 0 28px 28px" : 0,
                border: scrolled ? "1px solid rgba(180,110,30,0.45)" : "none",
                borderTop: "none",
                boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.6)" : "none",
                backdropFilter: scrolled ? "blur(20px)" : "none",
              }}
            >
              <div className="px-6 py-6 flex flex-col gap-5 border-t border-amber-900/30">
                {links.map((l) => {
                  const active = !l.href.includes("#") && (l.href === "/" ? pathname === "/" : pathname === l.href || pathname.startsWith(l.href + "/"));
                  return (
                    <div key={l.label} className="flex flex-col gap-3">
                      <Link
                        href={l.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-2 text-lg font-extrabold transition-colors ${active ? "text-amber-400" : "text-white/80 hover:text-amber-400"}`}
                        style={{ fontFamily: "var(--font-nunito)" }}
                      >
                        {l.label}
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                      </Link>
                      {l.children && (
                        <div className="flex flex-col gap-2.5 pl-4 border-l border-amber-900/40">
                          {l.children.map((c) => {
                            const cActive = pathname === c.href;
                            return (
                              <Link
                                key={c.href}
                                href={c.href}
                                onClick={() => setMenuOpen(false)}
                                className={`text-sm font-bold transition-colors ${cActive ? "text-amber-400" : "text-white/55 hover:text-amber-400"}`}
                                style={{ fontFamily: "var(--font-nunito)" }}
                              >
                                {c.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
                <Link
                  href="/#anniversaires"
                  onClick={() => setMenuOpen(false)}
                  className="btn-shine mt-1 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-center font-extrabold shadow-lg"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  Réserver maintenant
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
    </>
  );
}
