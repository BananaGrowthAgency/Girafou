import type { Metadata } from "next";
import { LOCALES, type Locale } from "./config";
import { toPublic } from "./routes";

// URL absolue du site — à définir dans Vercel : NEXT_PUBLIC_SITE_URL.
const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://girafou.com").replace(/\/$/, "");

/**
 * `canonical` + `hreflang` d'une page, à partir de son chemin *interne*
 * (segments français, sans préfixe de langue) : `/nos-offres`, `/activites/karting`…
 *
 * Produit, sur chaque version :
 *   <link rel="canonical" href="…/en/our-offers">
 *   <link rel="alternate" hreflang="fr" href="…/nos-offres">
 *   <link rel="alternate" hreflang="en" href="…/en/our-offers">
 *   <link rel="alternate" hreflang="x-default" href="…/nos-offres">
 *
 * Les pages sans version anglaise (mentions légales, C.G.V…) n'obtiennent que
 * l'alternate français : annoncer une page qui n'existe pas serait une erreur
 * pour Google.
 */
export function alternates(locale: Locale, internalPath: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    const path = toPublic(l, internalPath);
    if (path) languages[l] = `${SITE}${path}`;
  }

  // x-default = version servie par défaut quand aucune langue ne correspond.
  const frenchUrl = languages.fr;
  if (frenchUrl) languages["x-default"] = frenchUrl;

  const canonical = toPublic(locale, internalPath) ?? toPublic("fr", internalPath);

  return { canonical: canonical ? `${SITE}${canonical}` : undefined, languages };
}
