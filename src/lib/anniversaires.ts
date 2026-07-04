// Real birthday-party content, transcribed from girafou.com (the 3 "formules").
// Prices and inclusions are verbatim from the live site. Photos are added later
// under /images/anniversaires/ — until then the cards fall back to the existing
// formula illustrations, so nothing renders broken.

export const RESERVATION_URL = "https://girafou.qweekle.com/shop/girafou";

// Créneaux horaires communs aux 3 formules.
export const CRENEAUX = "De 10h à 13h ou de 14h à 18h";

// Inclusions communes à toutes les formules (dans l'ordre du site).
export const BASE_INCLUSIONS: string[] = [
  "L'entrée au parc Girafou",
  "Une table réservée rien que pour vous tout le temps de l'anniversaire",
  "Un gâteau au chocolat personnalisé avec le prénom de l'enfant",
  "Des sirops à l'eau à volonté",
  "Un cadeau pour votre enfant",
  "Une photo de groupe",
  "Une super boum",
  "Des cartons d'invitation",
  "Une entrée classique offerte pour l'enfant qui fête son anniversaire, valable un an",
  "Une portion de bonbons Haribo par enfant",
  "1 jeton par enfant à utiliser dans nos karts ou nos hélicos",
];

// Encart « option pizza » présent sur les pages formules.
export const OPTION_PIZZA = {
  price: "2,50 € / enfant",
  title: "Option Pizza",
  text: "Réservée aux anniversaires du matin. Les enfants réalisent eux-mêmes leur pizza et la mangent ensemble.",
};

// Bloc conditions (bas de page), verbatim.
export const CONDITIONS = [
  "Un minimum de 8 enfants est requis pour l'organisation d'un anniversaire.",
  "Nous vous conseillons de réserver au moins 15 jours avant la date. Un acompte de 30 € vous sera demandé à la réservation.",
  "Les cartons d'invitations sont à retirer sur place au moment de la réservation, ou sont envoyés par mail en cas de réservation internet.",
  "L'apport de bonbons, boissons ou gâteaux supplémentaires est interdit.",
];

export const CHAUSSETTES =
  "Pour accéder aux jeux, vos enfants doivent être obligatoirement en chaussettes. L'accès pieds-nus sera refusé pour des raisons d'hygiène et de bien-être de tous. Merci de votre compréhension.";

export type Formule = {
  slug: string;
  name: string;
  price: string; // par enfant
  tagline: string;
  // Ligne supplémentaire propre à la formule (au-delà de la base), si elle existe.
  extra?: string;
  // "Option pizza" proposée en plus (matin) ?
  optionPizza?: boolean;
  accent: string; // couleur d'accent
  gradient: string; // dégradé du hero
  soft: string; // fond doux de section
  emoji: string;
  // Illustration existante (réutilisée en attendant les photos réelles).
  illustration: string;
  highlight?: boolean; // "plus populaire"
};

export const FORMULES: Formule[] = [
  {
    slug: "ptits-gourmands",
    name: "Formule P'tits Gourmands",
    price: "14,90 €",
    tagline: "L'anniversaire tout compris",
    optionPizza: true,
    accent: "#FF5722",
    gradient: "linear-gradient(135deg, #FF5722, #F5A623)",
    soft: "#FFF3EE",
    emoji: "🎂",
    illustration: "/images/birthday/formula-pizza.png",
  },
  {
    slug: "formule-du-lion",
    name: "Formule du Lion",
    price: "16,50 €",
    tagline: "La plus complète",
    extra: "Une boisson au choix : Coca, IceTea ou Oasis tropical",
    optionPizza: true,
    accent: "#F5A623",
    gradient: "linear-gradient(135deg, #F5A623, #FF8A00)",
    soft: "#FFF7E6",
    emoji: "🦁",
    illustration: "/images/birthday/formula-lion.png",
    highlight: true,
  },
  {
    slug: "gira-fun-karaoke",
    name: "Gira Fun Karaoké",
    price: "16,90 €",
    tagline: "Musique & fête",
    extra: "Une session de 30 min dans notre BOX KARAFUN — viens chanter tes chansons préférées avec tes copains !",
    optionPizza: true,
    accent: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED, #EC4899)",
    soft: "#F5F0FF",
    emoji: "🎤",
    illustration: "/images/birthday/formula-karaoke.png",
  },
];

export const formuleBySlug = (slug: string): Formule | undefined =>
  FORMULES.find((f) => f.slug === slug);
