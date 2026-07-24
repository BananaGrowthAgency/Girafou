import { DEFAULT_LOCALE, LOCALES, hasLocale, type Locale } from "./config";

// Slugs traduits (SEO) — l'arborescence de `src/app/[lang]/(site)/` garde les
// segments FRANÇAIS : ce sont les chemins « internes ». Ce module traduit entre
// ce chemin interne et le chemin PUBLIC affiché dans la barre d'adresse :
//
//   interne  /nos-offres              →  public fr  /nos-offres
//                                     →  public en  /en/our-offers
//
// `proxy.ts` réécrit le public vers l'interne à l'entrée, et redirige l'interne
// vers le public pour qu'une même page n'ait jamais deux URL indexables.

/** Segments de premier niveau. Une entrée par page ; clé = segment interne. */
const PAGE_SLUGS: Record<string, Partial<Record<Locale, string>>> = {
  activites: { fr: "activites", en: "activities" },
  anniversaires: { fr: "anniversaires", en: "birthday-parties" },
  restauration: { fr: "restauration", en: "menu" },
  "nos-offres": { fr: "nos-offres", en: "our-offers" },
  "prix-des-entrees": { fr: "prix-des-entrees", en: "admission-prices" },
  "plan-dacces": { fr: "plan-dacces", en: "getting-here" },
  "contactez-nous": { fr: "contactez-nous", en: "contact-us" },
  karaoke: { fr: "karaoke", en: "karaoke" },
  faq: { fr: "faq", en: "faq" },
  // Pages légales : françaises uniquement (décision client). Sans entrée `en`,
  // elles n'ont pas d'URL anglaise ni d'alternate hreflang — les liens du site
  // anglais pointent directement vers la version française.
  "mentions-legales": { fr: "mentions-legales" },
  "politique-de-confidentialite": { fr: "politique-de-confidentialite" },
  "conditions-generales-utilisateur": { fr: "conditions-generales-utilisateur" },
  "conditions-generales-de-ventes": { fr: "conditions-generales-de-ventes" },
};

/** Slugs des 9 activités (2e segment de /activites/…). */
const ACTIVITE_SLUGS: Record<string, Partial<Record<Locale, string>>> = {
  helicoptere: { fr: "helicoptere", en: "helicopter-ride" },
  neoxperience: { fr: "neoxperience", en: "neoxperience" },
  karting: { fr: "karting", en: "karting-and-bikes" },
  trampolines: { fr: "trampolines", en: "trampolines" },
  gonflables: { fr: "gonflables", en: "bouncy-castles" },
  "piscine-balles": { fr: "piscine-balles", en: "ball-pit" },
  "zones-saut": { fr: "zones-saut", en: "jump-zones" },
  labyrinthes: { fr: "labyrinthes", en: "maze" },
  toboggan: { fr: "toboggan", en: "slides-and-toboggans" },
};

/** Slugs des 3 formules anniversaire. */
const FORMULE_SLUGS: Record<string, Partial<Record<Locale, string>>> = {
  "formule-du-lion": { fr: "formule-du-lion", en: "lion-package" },
  "ptits-gourmands": { fr: "ptits-gourmands", en: "ptits-gourmands-package" },
  "gira-fun-karaoke": { fr: "gira-fun-karaoke", en: "gira-fun-karaoke" },
};

/** Tables de second niveau, par segment interne parent. */
const CHILD_SLUGS: Record<string, Record<string, Partial<Record<Locale, string>>>> = {
  activites: ACTIVITE_SLUGS,
  anniversaires: FORMULE_SLUGS,
};

/** Index inverse (slug public → slug interne), construit une fois. */
function invert(table: Record<string, Partial<Record<Locale, string>>>) {
  const out: Record<Locale, Record<string, string>> = { fr: {}, en: {} };
  for (const [internal, byLocale] of Object.entries(table)) {
    for (const locale of LOCALES) {
      const slug = byLocale[locale];
      if (slug) out[locale][slug] = internal;
    }
  }
  return out;
}

const PAGE_LOOKUP = invert(PAGE_SLUGS);
const CHILD_LOOKUP: Record<string, Record<Locale, Record<string, string>>> = {
  activites: invert(ACTIVITE_SLUGS),
  anniversaires: invert(FORMULE_SLUGS),
};

/**
 * Chemin interne (segments français, sans préfixe) → chemin public de `locale`.
 * Renvoie `null` si la page n'existe pas dans cette langue (pages légales).
 */
export function toPublic(locale: Locale, internal: string): string | null {
  if (internal === "/") return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;

  const [, parent, child] = internal.split("/");
  const parentSlug = PAGE_SLUGS[parent]?.[locale];
  if (!parentSlug) return null;

  let path = `/${parentSlug}`;
  if (child) {
    const childSlug = CHILD_SLUGS[parent]?.[child]?.[locale];
    if (!childSlug) return null;
    path += `/${childSlug}`;
  }

  return locale === DEFAULT_LOCALE ? path : `/${locale}${path}`;
}

/**
 * Chemin public (tel qu'affiché) → chemin interne, sans préfixe de langue.
 * Renvoie `null` si aucun segment ne correspond (404).
 */
export function toInternal(locale: Locale, publicPath: string): string | null {
  const stripped =
    locale === DEFAULT_LOCALE ? publicPath : publicPath.slice(locale.length + 1) || "/";
  if (stripped === "/" || stripped === "") return "/";

  const [, parent, child] = stripped.split("/");
  const internalParent = PAGE_LOOKUP[locale][parent];
  if (!internalParent) return null;

  if (!child) return `/${internalParent}`;

  const internalChild = CHILD_LOOKUP[internalParent]?.[locale]?.[child];
  if (!internalChild) return null;
  return `/${internalParent}/${internalChild}`;
}

/**
 * Préfixe et traduit un lien interne pour la locale courante.
 * Laisse passer tel quel ce qui n'est pas un chemin interne (mailto:, tel:, URL
 * externes, ancres). Si la page n'existe pas dans la langue (pages légales),
 * renvoie la version française — c'est la seule qui existe.
 */
export function localizeHref(locale: Locale, href: string): string {
  if (!href.startsWith("/")) return href;

  // Ancre seule ou chemin + ancre : on traduit la partie chemin.
  const [path, hash] = href.split("#");
  const suffix = hash ? `#${hash}` : "";

  if (path === "" || path === "/") {
    const root = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
    return `${root || "/"}${suffix}`.replace(/^\/#/, "/#");
  }

  return (toPublic(locale, path) ?? toPublic(DEFAULT_LOCALE, path) ?? path) + suffix;
}

/** Locale déduite d'un chemin public (`/en/...` → "en", sinon le français). */
export function localeOf(pathname: string): Locale {
  const first = pathname.split("/")[1] ?? "";
  return hasLocale(first) ? first : DEFAULT_LOCALE;
}
