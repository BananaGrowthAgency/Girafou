import type { MetadataRoute } from "next";
import { ACTIVITES } from "@/lib/activites";
import { FORMULES } from "@/lib/anniversaires";

// Domaine du site en production. À définir dans Vercel : NEXT_PUBLIC_SITE_URL
// (ex. https://girafou.com). Valeur par défaut : le domaine final du parc.
const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://girafou.com").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/activites", priority: 0.9 },
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

  const entries: MetadataRoute.Sitemap = staticPaths.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));

  for (const a of ACTIVITES) {
    entries.push({ url: `${BASE}/activites/${a.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }
  for (const f of FORMULES) {
    entries.push({ url: `${BASE}/anniversaires/${f.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }

  return entries;
}
