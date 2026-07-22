// Configuration i18n du site — partagée par le proxy, le serveur et le client.
// Ne rien importer ici qui soit réservé au serveur : `proxy.ts` et les composants
// « use client » consomment ce module tel quel.
//
// Schéma d'URL retenu : le français vit à la racine (`/activites`) et seul
// l'anglais est préfixé, avec des slugs traduits (`/en/activities`).
// La traduction des chemins vit dans `routes.ts` ; ce module ne garde que ce
// dont `routes.ts` lui-même a besoin, pour éviter un import circulaire.

export const LOCALES = ["fr", "en"] as const;

export type Locale = (typeof LOCALES)[number];

/** Locale servie à la racine, sans préfixe dans l'URL publique. */
export const DEFAULT_LOCALE: Locale = "fr";

/** Choix explicite de l'utilisateur (sélecteur du header). Prioritaire sur `Accept-Language`. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
