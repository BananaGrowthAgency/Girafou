import type { MetadataRoute } from "next";
import { ACTIVITES } from "@/lib/activites";
import { FORMULES } from "@/lib/anniversaires";
import { LOCALES } from "@/lib/i18n/config";
import { toPublic } from "@/lib/i18n/routes";

// Domaine du site en production. À définir dans Vercel : NEXT_PUBLIC_SITE_URL
// (ex. https://girafou.com). Valeur par défaut : le domaine final du parc.
const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://girafou.com").replace(/\/$/, "");

// Chemins *internes* (segments français) — `toPublic` en tire l'URL publique de
// chaque langue, slugs traduits compris.
const STATIC_PATHS: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/activites", priority: 0.9 },
  { path: "/karaoke", priority: 0.8 },
  { path: "/anniversaires", priority: 0.9 },
  { path: "/nos-offres", priority: 0.8 },
  { path: "/restauration", priority: 0.8 },
  { path: "/prix-des-entrees", priority: 0.7 },
  { path: "/plan-dacces", priority: 0.6 },
  { path: "/contactez-nous", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
  { path: "/mentions-legales", priority: 0.2 },
  { path: "/politique-de-confidentialite", priority: 0.2 },
  { path: "/conditions-generales-utilisateur", priority: 0.2 },
  { path: "/conditions-generales-de-ventes", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const paths = [
    ...STATIC_PATHS,
    ...ACTIVITES.map((a) => ({ path: `/activites/${a.slug}`, priority: 0.7 })),
    ...FORMULES.map((f) => ({ path: `/anniversaires/${f.slug}`, priority: 0.7 })),
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority } of paths) {
    // `languages` reprend les mêmes alternates que les balises hreflang des
    // pages : Google veut voir les deux déclarations concorder.
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      const localized = toPublic(locale, path);
      if (localized) languages[locale] = `${BASE}${localized}`;
    }

    for (const locale of LOCALES) {
      const localized = toPublic(locale, path);
      if (!localized) continue; // page sans version dans cette langue (légales)
      entries.push({
        url: `${BASE}${localized}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
