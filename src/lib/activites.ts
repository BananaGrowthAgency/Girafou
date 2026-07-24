// Présentation des 9 activités du parc : slug, photo et couleurs.
//
// Tout le TEXTE (nom, pastille, descriptions, âges, consignes) vit dans
// src/lib/i18n/ — `ui.ts` pour les noms (le Navbar en a besoin côté client) et
// les dictionnaires pour le reste. Ce fichier est passé en props à des
// composants clients : y laisser du français l'aurait envoyé dans le bundle
// des pages anglaises.

import { RESERVATION_URL, CHAUSSETTES } from "./anniversaires";

export { RESERVATION_URL, CHAUSSETTES };

export type Activite = {
  slug: string; // route /activites/<slug>, clé de traduction et basename de la photo
  tagBg: string; // fond de la pastille
  payant?: boolean; // « payant en supplément »
  image: string; // photo /images/activites/<slug>.jpg (cartes + par défaut le hero)
  heroImage?: string; // photo dédiée au hero, si différente/meilleure que `image`
  heroFocus?: string; // object-position du hero (défaut "center")
  accent: string; // couleur d'accent
  accentLight: string; // fond doux assorti
  gradient: string; // dégradé du hero
};

// Ordre curé (repris de la home) : les activités phares en premier.
export const ACTIVITES: Activite[] = [
  {
    slug: "helicoptere",
    tagBg: "#1E88E5",
    payant: true,
    image: "/images/activites/helicoptere.jpg",
    heroImage: "/images/activites/helicoptere-hero.jpg",
    accent: "#1E88E5",
    accentLight: "#E3F2FD",
    gradient: "linear-gradient(135deg, #1565C0, #42A5F5)",
  },
  {
    slug: "neoxperience",
    tagBg: "#7C3AED",
    image: "/images/activites/neoxperience.jpg",
    // Version 1024px (girafou.com) — la carte utilise la 760px, trop floue en hero.
    heroImage: "/images/activites/neoxperience-hero.jpg",
    accent: "#7C3AED",
    accentLight: "#EDE9FE",
    gradient: "linear-gradient(135deg, #6D28D9, #A855F7)",
  },
  {
    slug: "karting",
    tagBg: "#FF5722",
    payant: true,
    image: "/images/activites/karting.jpg",
    heroImage: "/images/activites/karting-hero.jpg",
    accent: "#FF5722",
    accentLight: "#FBE9E7",
    gradient: "linear-gradient(135deg, #FF5722, #F5A623)",
  },
  {
    slug: "trampolines",
    tagBg: "#00897B",
    image: "/images/activites/trampolines.jpg",
    heroImage: "/images/activites/trampolines-hero.jpg",
    heroFocus: "center 12%",
    accent: "#00897B",
    accentLight: "#E0F2F1",
    gradient: "linear-gradient(135deg, #00695C, #26A69A)",
  },
  {
    slug: "gonflables",
    tagBg: "#F59E0B",
    image: "/images/activites/gonflables.jpg",
    // Même scène (Serengeti) que la carte, mais en bonne qualité — hero uniquement.
    heroImage: "/images/activites/gonflables-hero.jpg",
    accent: "#F59E0B",
    accentLight: "#FFFBEB",
    gradient: "linear-gradient(135deg, #D97706, #FBBF24)",
  },
  {
    slug: "piscine-balles",
    tagBg: "#0288D1",
    image: "/images/activites/piscine-balles.jpg",
    heroImage: "/images/activites/piscine-balles-hero.jpg",
    accent: "#0288D1",
    accentLight: "#E1F5FE",
    gradient: "linear-gradient(135deg, #0277BD, #4FC3F7)",
  },
  {
    slug: "zones-saut",
    tagBg: "#E91E63",
    image: "/images/activites/zones-saut.jpg",
    heroImage: "/images/activites/zones-saut-hero.jpg",
    accent: "#E91E63",
    accentLight: "#FCE4EC",
    gradient: "linear-gradient(135deg, #C2185B, #FF6090)",
  },
  {
    slug: "labyrinthes",
    tagBg: "#5E35B1",
    image: "/images/activites/labyrinthes.jpg",
    heroImage: "/images/activites/labyrinthes-hero.jpg",
    accent: "#5E35B1",
    accentLight: "#EDE7F6",
    gradient: "linear-gradient(135deg, #4527A0, #7E57C2)",
  },
  {
    slug: "toboggan",
    tagBg: "#00ACC1",
    image: "/images/activites/toboggan.jpg",
    heroImage: "/images/activites/toboggan-hero.jpg",
    heroFocus: "center 34%",
    accent: "#00ACC1",
    accentLight: "#E0F7FA",
    gradient: "linear-gradient(135deg, #0097A7, #26C6DA)",
  },
];

export const activiteBySlug = (slug: string): Activite | undefined =>
  ACTIVITES.find((a) => a.slug === slug);
