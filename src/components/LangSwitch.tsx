"use client";

import { useId } from "react";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_COOKIE, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { toInternal, toPublic } from "@/lib/i18n/routes";
import { useLocale } from "@/lib/i18n/useLocale";
import { ui } from "@/lib/i18n/ui";

// Drapeaux en SVG et non en emoji : sous Windows, 🇫🇷 s'affiche « FR » en lettres.
function FlagFR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden focusable="false">
      <rect width="60" height="40" fill="#fff" />
      <rect width="20" height="40" fill="#002395" />
      <rect x="40" width="20" height="40" fill="#ed2939" />
    </svg>
  );
}

function FlagGB({ className }: { className?: string }) {
  // Union Jack : diagonales blanches puis rouges (décalées via clip), croix par-dessus.
  const clip = useId();
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden focusable="false">
      <clipPath id={clip}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${clip})`} stroke="#c8102e" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  );
}

const FLAGS: Record<Locale, (p: { className?: string }) => React.ReactElement> = {
  fr: FlagFR,
  en: FlagGB,
};

const CODES: Record<Locale, string> = { fr: "FR", en: "EN" };

// Le cookie fige le choix explicite : sans lui, le proxy renverrait un
// navigateur anglophone vers /en au prochain chargement d'une URL française.
// Défini hors du composant : écrire dans `document` depuis le corps d'un
// composant est refusé par le React Compiler, même dans un gestionnaire.
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * Sélecteur de langue du header : deux drapeaux, l'actif surligné.
 *
 * Le changement passe par une vraie navigation (`<a>`, rechargement complet) et
 * non par `<Link>` : c'est le seul moyen sûr de rafraîchir l'attribut `lang` du
 * `<html>` et de laisser le proxy relire le cookie fraîchement posé.
 */
export default function LangSwitch({ compact = false }: { compact?: boolean }) {
  const current = useLocale();
  const pathname = usePathname();
  // On repasse par le chemin interne pour retrouver la page équivalente :
  // les slugs diffèrent d'une langue à l'autre (/nos-offres ↔ /en/our-offers).
  const internal = toInternal(current, pathname) ?? "/";
  const label = ui(current).nav.language;

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-0.5 rounded-full p-0.5"
      style={{ background: "rgba(90,53,32,0.07)" }}
    >
      {LOCALES.map((locale) => {
        const Flag = FLAGS[locale];
        const active = locale === current;
        const shared = `flex items-center gap-1.5 rounded-full transition-all duration-200 ${
          compact ? "px-1.5 py-1" : "px-2 py-1"
        }`;
        const flagClass = `w-[18px] h-[13px] rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.12)] ${
          active ? "" : "opacity-55 grayscale-[35%]"
        }`;
        const code = (
          <span
            className="text-[11px] font-extrabold leading-none"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {CODES[locale]}
          </span>
        );

        if (active) {
          return (
            <span
              key={locale}
              aria-current="true"
              className={`${shared} bg-white text-amber-900 shadow-sm cursor-default`}
            >
              <Flag className={flagClass} />
              {!compact && code}
            </span>
          );
        }

        return (
          <a
            key={locale}
            href={toPublic(locale, internal) ?? toPublic(DEFAULT_LOCALE, internal) ?? "/"}
            hrefLang={locale}
            onClick={() => rememberLocale(locale)}
            className={`${shared} text-amber-900/55 hover:text-amber-900 hover:bg-white/60`}
          >
            <Flag className={flagClass} />
            {!compact && code}
          </a>
        );
      })}
    </div>
  );
}
