// Présentation des 3 formules anniversaire : couleurs, illustrations et liens
// de réservation Qweekle.
//
// Tout le TEXTE (nom, accroche, prix, inclusions, conditions) vit dans
// src/lib/i18n/ — `ui.ts` pour les noms (le Navbar en a besoin côté client) et
// les dictionnaires pour le reste. Ce fichier part en props vers des composants
// clients : y laisser du français l'aurait envoyé dans le bundle anglais.

export const RESERVATION_URL = "https://girafou.qweekle.com/shop/girafou";

// La règle vit dans lib/regles.ts (partagée avec tout le site) ; on la
// ré-exporte ici pour ne rien casser côté pages Anniversaires.
export { CHAUSSETTES } from "./regles";

export type Formule = {
  slug: string; // route /anniversaires/<slug> et clé de traduction
  // Lien de réservation Qweekle propre à la formule (sinon boutique générale).
  reserveUrl: string;
  // "Option pizza" proposée en plus (matin) ?
  optionPizza?: boolean;
  accent: string; // couleur d'accent
  gradient: string; // dégradé du hero
  soft: string; // fond doux de section
  emoji: string;
  illustration: string;
  highlight?: boolean; // "plus populaire"
  // Photo réelle du parc utilisée en fond du hero (optionnelle, par formule).
  heroImage?: string;
  // object-position de la photo du hero (par défaut "center").
  heroFocus?: string;
  // Fond illustré de marque pour la section « Ce que comprend la formule ».
  fondImage?: string;
  // Pastille de prix découpée (fond transparent) affichée sur la carte mobile.
  fondBadge?: string;
};

// Ordre volontaire : P'tits Gourmands au centre, car c'est la formule la plus
// vendue — elle porte la pastille « Plus populaire ».
export const FORMULES: Formule[] = [
  {
    slug: "formule-du-lion",
    reserveUrl: "https://girafou.qweekle.com/shop/girafou/anniversaires/anniversaire-lion?lang=fr",
    optionPizza: true,
    accent: "#F5A623",
    gradient: "linear-gradient(135deg, #F5A623, #FF8A00)",
    soft: "#FFF7E6",
    emoji: "🦁",
    illustration: "/images/birthday/formula-lion.png",
    heroImage: "/images/anniversaires/parc-hero.jpg",
    heroFocus: "center 42%",
    fondImage: "/images/anniversaires/lion-fond-2025.png",
    fondBadge: "/images/anniversaires/lion-badge.png",
  },
  {
    slug: "ptits-gourmands",
    reserveUrl:
      "https://girafou.qweekle.com/shop/girafou/anniversaires/anniversaire-ptits-gourmands?lang=fr",
    optionPizza: true,
    accent: "#FF5722",
    gradient: "linear-gradient(135deg, #FF5722, #F5A623)",
    soft: "#FFF3EE",
    emoji: "🎂",
    illustration: "/images/birthday/formula-pizza.png",
    highlight: true,
    heroImage: "/images/anniversaires/parc-hero.jpg",
    heroFocus: "center 42%",
    fondImage: "/images/anniversaires/ptits-gourmands-fond-v2.png",
    fondBadge: "/images/anniversaires/ptits-badge.png",
  },
  {
    slug: "gira-fun-karaoke",
    // Pack Qweekle de l'après-midi (« amidi ») — fourni par le parc.
    reserveUrl:
      "https://girafou.qweekle.com/shop/girafou/anniversaires/pack/anniversaire-karaoke-amidi?lang=fr",
    optionPizza: true,
    // Thème violet/bleu (demande du parc) : différencie le karaoké des deux
    // autres formules, chaudes. Utilisé par la home, le hub et la page de détail.
    accent: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED, #A855F7)",
    soft: "#F5F0FF",
    emoji: "🎤",
    illustration: "/images/birthday/formula-karaoke.png",
    heroImage: "/images/anniversaires/parc-hero.jpg",
    heroFocus: "center 42%",
    fondImage: "/images/anniversaires/karaoke-fond.png",
    fondBadge: "/images/anniversaires/karaoke-badge.png",
  },
];

export const formuleBySlug = (slug: string): Formule | undefined =>
  FORMULES.find((f) => f.slug === slug);
