"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FORMULES } from "@/lib/anniversaires";
import { ACTIVITES } from "@/lib/activites";

type NavLink = { label: string; href: string; children?: { label: string; href: string }[] };

const links: NavLink[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Activités",
    href: "/#activites",
    children: ACTIVITES.map((a) => ({ label: a.name, href: `/activites/${a.slug}` })),
  },
  { label: "Restauration", href: "/restauration" },
  { label: "Nos offres", href: "/nos-offres" },
  {
    label: "Anniversaires",
    href: "/anniversaires",
    children: FORMULES.map((f) => ({ label: f.name, href: `/anniversaires/${f.slug}` })),
  },
  { label: "Infos pratiques", href: "/#infos" },
];

// Boutique / réservation en ligne (Qweekle) — ouverture dans un nouvel onglet.
const SHOP_URL =
  "https://girafou.qweekle.com/shop/girafou?_gl=1*1xl4d5m*_gcl_au*NDAwNzYxOTg1LjE3ODIzNDQwMDQ.*_ga*MTQ5MTU5NjY1MC4xNzgyMzQ0MDA0*_ga_W96LVS4H2M*czE3ODQwMjYyMDMkbzEzJGcxJHQxNzg0MDI2ODA5JGo1OSRsMCRoNTMwMzE3NDg.";

// Bouton téléphone : icône dans une pastille ronde + numéro optionnel (desktop).
// Au survol, l'icône « sonne » (vibration) — l'effet est propagé depuis le lien via variants.
function PhoneButton({ showNumber = false }: { showNumber?: boolean }) {
  return (
    <motion.a
      href="tel:0231537268"
      aria-label="Appeler le 02 31 53 72 68"
      title="02 31 53 72 68"
      initial="rest"
      animate="rest"
      whileHover="ring"
      className="group flex items-center gap-2 text-amber-900/70 hover:text-orange-500 transition-colors"
    >
      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
        <motion.svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          variants={{ rest: { rotate: 0 }, ring: { rotate: [0, -18, 15, -13, 11, -8, 6, -3, 0] } }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.25, ease: "easeInOut" }}
        >
          <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </motion.svg>
      </span>
      {showNumber && (
        <span className="text-sm font-bold whitespace-nowrap" style={{ fontFamily: "var(--font-nunito)" }}>
          02 31 53 72 68
        </span>
      )}
    </motion.a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
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
            background: "#FFFFFF",
            borderRadius: scrolled ? (menuOpen ? "28px 28px 0 0" : 999) : 0,
            border: scrolled ? "1px solid rgba(90,53,32,0.12)" : "none",
            borderBottom: scrolled && menuOpen ? "1px solid rgba(90,53,32,0.06)" : (scrolled ? undefined : "1px solid rgba(90,53,32,0.10)"),
            boxShadow: scrolled ? "0 8px 40px rgba(90,53,32,0.16)" : "0 1px 2px rgba(90,53,32,0.05)",
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
                      className={`relative inline-flex items-center gap-1 text-[13px] lg:text-[14px] font-bold transition-colors duration-200 group whitespace-nowrap ${active ? "text-orange-500" : "text-amber-900/75 hover:text-orange-500"}`}
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
                          style={{ background: "#FFFFFF", border: "1px solid rgba(90,53,32,0.12)", boxShadow: "0 12px 40px rgba(90,53,32,0.18)" }}
                        >
                          {l.children.map((c) => {
                            const cActive = pathname === c.href;
                            return (
                              <Link
                                key={c.href}
                                href={c.href}
                                className={`block px-5 py-2.5 text-[13px] font-bold transition-colors hover:bg-black/[0.03] ${cActive ? "text-orange-500" : "text-amber-900/70 hover:text-orange-500"}`}
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
              <PhoneButton showNumber />
              <a
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-extrabold shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                Réserver
              </a>
            </div>

            {/* Mobile: téléphone (icône seule) + burger */}
            <div className="md:hidden flex items-center gap-1">
              <PhoneButton />
              <button
                className="w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
                onClick={() => { setMenuOpen(!menuOpen); setOpenSub(null); }}
                aria-label="Menu"
              >
              <span className={`w-6 h-[2.5px] bg-amber-900/80 rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7.5px]" : ""}`} />
              <span className={`w-6 h-[2.5px] bg-amber-900/80 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`w-6 h-[2.5px] bg-amber-900/80 rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""}`} />
              </button>
            </div>
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
                background: "#FFFFFF",
                maxWidth: scrolled ? 1100 : "100%",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: scrolled ? "0 0 28px 28px" : 0,
                border: scrolled ? "1px solid rgba(90,53,32,0.12)" : "none",
                borderTop: "none",
                boxShadow: scrolled ? "0 8px 40px rgba(90,53,32,0.16)" : "none",
                backdropFilter: scrolled ? "blur(20px)" : "none",
              }}
            >
              <div className="px-6 py-6 flex flex-col gap-5 border-t border-amber-900/10">
                {links.map((l) => {
                  const active = !l.href.includes("#") && (l.href === "/" ? pathname === "/" : pathname === l.href || pathname.startsWith(l.href + "/"));
                  const open = openSub === l.label;
                  return (
                    <div key={l.label} className="flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          href={l.href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center gap-2 text-lg font-extrabold transition-colors ${active ? "text-orange-500" : "text-amber-900/80 hover:text-orange-500"}`}
                          style={{ fontFamily: "var(--font-nunito)" }}
                        >
                          {l.label}
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                        </Link>
                        {l.children && (
                          <button
                            type="button"
                            onClick={() => setOpenSub(open ? null : l.label)}
                            aria-label={`${open ? "Masquer" : "Afficher"} ${l.label}`}
                            aria-expanded={open}
                            className="flex-shrink-0 p-2 -mr-2 text-amber-900/55 hover:text-orange-500 transition-colors"
                          >
                            <svg className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 4.5 6 7.5 9 4.5" />
                            </svg>
                          </button>
                        )}
                      </div>
                      {l.children && (
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-2.5 pl-4 border-l border-amber-900/15 pt-0.5">
                                {l.children.map((c) => {
                                  const cActive = pathname === c.href;
                                  return (
                                    <Link
                                      key={c.href}
                                      href={c.href}
                                      onClick={() => setMenuOpen(false)}
                                      className={`text-sm font-bold transition-colors ${cActive ? "text-orange-500" : "text-amber-900/55 hover:text-orange-500"}`}
                                      style={{ fontFamily: "var(--font-nunito)" }}
                                    >
                                      {c.label}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  );
                })}
                <a
                  href={SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
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
      </div>
    </header>
    </>
  );
}
