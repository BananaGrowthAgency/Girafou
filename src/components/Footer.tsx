"use client";

import Image from "next/image";
import Link from "next/link";

const parc = [
  { icon: "📍", text: "ZA Clos de la Hogue, 14970 Bénouville" },
  { icon: "✉️", text: "contact@girafou.com", href: "mailto:contact@girafou.com" },
  { icon: "📞", text: "02 31 53 72 68", href: "tel:0231537268" },
];

const plage = [
  { icon: "📍", text: "Plage de Ouistreham - Riva Bella, 14150 Ouistreham" },
  { icon: "✉️", text: "contact@girafou.com", href: "mailto:contact@girafou.com" },
  { icon: "📞", text: "02 31 53 72 68", href: "tel:0231537268" },
];


const infoLinks = [
  { label: "Conditions générales de ventes", href: "/conditions-generales-de-ventes" },
  { label: "Contactez-nous", href: "/contactez-nous" },
  { label: "Plan d'accès", href: "/plan-dacces" },
  { label: "Conditions générales utilisateur", href: "/conditions-generales-utilisateur" },
];

// Titulares del footer: amarillo con pequeño contorno negro para destacar sobre el rojo.
const TITLE_YELLOW = "#FFD23F";
const TITLE_OUTLINE =
  "-1px -1px 0 rgba(0,0,0,0.7), 1px -1px 0 rgba(0,0,0,0.7), -1px 1px 0 rgba(0,0,0,0.7), 1px 1px 0 rgba(0,0,0,0.7)";
const titleStyle = { color: TITLE_YELLOW, textShadow: TITLE_OUTLINE } as const;

export default function Footer({ waveColor = "#FFE8A0" }: { waveColor?: string }) {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#C0392B" }}>
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C400,60 800,0 1200,30 C1320,40 1400,20 1440,30 L1440,0 L0,0 Z" fill={waveColor} />
        </svg>
      </div>
      <div className="absolute top-10 left-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,87,34,0.07) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, #F5A623 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-8">

        {/* Grid: logo | parc | plage | nav | info | partenaires */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-8 mb-10">

          {/* 1 — Logo + socials */}
          <div className="col-span-2 md:col-span-1">
            <Image src="/images/logo-girafou.png" alt="Girafou" width={150} height={63} className="h-11 w-auto mb-3 drop-shadow-lg" />
            <p className="text-xs text-white/75 leading-relaxed mb-4" style={{ fontFamily: "var(--font-nunito)" }}>
              La plaine de jeux couverte préférée des enfants près de Caen. 1 300 m² d&rsquo;aventures !
            </p>
            <div className="flex gap-2">
              <a href="https://www.facebook.com/girafoubenouville" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-white/8 hover:bg-[#1877F2] flex items-center justify-center transition-colors duration-200">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/girafou_caen/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 2 — Girafou le parc */}
          <div className="min-w-0">
            <h4 className="font-extrabold text-sm mb-4 leading-snug" style={{ fontFamily: "var(--font-nunito)" }}>
              <span style={titleStyle}>Girafou le parc</span><br />
              <span className="text-white">• Toute l&rsquo;année !</span>
            </h4>
            <ul className="space-y-2">
              {parc.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/85 leading-snug min-w-0" style={{ fontFamily: "var(--font-nunito)" }}>
                  <span className="flex-shrink-0 text-[11px] mt-0.5">{item.icon}</span>
                  {item.href
                    ? <a href={item.href} className="hover:text-white transition-colors break-words min-w-0">{item.text}</a>
                    : <span>{item.text}</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* 3 — Girafou Plage Club */}
          <div className="min-w-0">
            <h4 className="font-extrabold text-sm mb-4 leading-snug" style={{ fontFamily: "var(--font-nunito)" }}>
              <span style={titleStyle}>Girafou Plage Club</span><br />
              <span className="text-white">• De juin à septembre !</span>
            </h4>
            <ul className="space-y-2">
              {plage.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/85 leading-snug min-w-0" style={{ fontFamily: "var(--font-nunito)" }}>
                  <span className="flex-shrink-0 text-[11px] mt-0.5">{item.icon}</span>
                  {item.href
                    ? <a href={item.href} className="hover:text-white transition-colors break-words min-w-0">{item.text}</a>
                    : <span>{item.text}</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* 4 — F.A.Q */}
          <div>
            {/* mt+mb compensés : F.A.Q descend un peu (plus proche de la liste) sans déplacer la liste. */}
            <h4 className="mt-3 mb-1">
              <Link href="/faq" className="text-white/85 hover:text-white text-sm leading-relaxed transition-colors" style={{ fontFamily: "var(--font-nunito)" }}>F.A.Q</Link>
            </h4>
            <ul className="space-y-2">
              {infoLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-white/85 hover:text-white text-sm leading-relaxed transition-colors" style={{ fontFamily: "var(--font-nunito)" }}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 6 — Partenaires */}
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-nunito)", ...titleStyle }}>Partenaires</h4>
            <div className="flex flex-col gap-4 items-start">
              <Image src="/images/partenaires/space.png" alt="Space" width={110} height={22} className="h-5 w-auto opacity-65 hover:opacity-100 transition-opacity" />
              <a href="https://www.normandie-qualite-tourisme.com/" target="_blank" rel="noopener noreferrer">
                <Image src="/images/partenaires/normandie-qualite-tourisme.png" alt="Normandie Qualité Tourisme" width={130} height={44} className="h-11 w-auto opacity-65 hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://www.caenlamer-tourisme.fr/" target="_blank" rel="noopener noreferrer">
                <Image src="/images/partenaires/caen-la-mer.png" alt="Caen La Mer" width={130} height={44} className="h-11 w-auto opacity-65 hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/60 text-xs" style={{ fontFamily: "var(--font-nunito)" }}>
            Girafou © {new Date().getFullYear()}. Tous droits réservés.
          </p>
          <div className="flex flex-col items-center gap-1">
            <p className="text-white/60 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-nunito)" }}>Réalisé par</p>
            <a href="https://www.banana-growth.agency/accompagnement-marketing-digital-parc-de-loisir" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Image src="/images/logo-banana-growth.png" alt="Banana Growth Agency" width={140} height={46} className="h-8 w-auto" />
            </a>
          </div>
          <div className="flex gap-4">
            {[
              { label: "Mentions légales", href: "/mentions-legales" },
              { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="text-white/70 hover:text-white text-xs transition-colors" style={{ fontFamily: "var(--font-nunito)" }}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
