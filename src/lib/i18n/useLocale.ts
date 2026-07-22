"use client";

import { usePathname } from "next/navigation";
import { useCallback } from "react";
import type { Locale } from "./config";
import { localeOf, localizeHref } from "./routes";

/**
 * Locale courante côté client, déduite de l'URL affichée.
 * Le proxy réécrit `/activites` vers `/fr/activites`, mais `usePathname()` rend
 * le chemin *public* — l'absence de préfixe signifie donc bien « français ».
 */
export function useLocale(): Locale {
  return localeOf(usePathname());
}

/**
 * `href()` prêt à l'emploi pour les liens internes des composants clients :
 * conserve la langue ET traduit le slug (`/nos-offres` → `/en/our-offers`).
 */
export function useLocalePath(): (href: string) => string {
  const locale = useLocale();
  return useCallback((href: string) => localizeHref(locale, href), [locale]);
}
