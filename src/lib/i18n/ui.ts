import type { Locale } from "./config";
import {
  CHAUSSETTES,
  CHAUSSETTES_SHORT,
  CHAUSSETTES_TITLE,
  NOURRITURE,
  NOURRITURE_EXCEPTIONS,
  NOURRITURE_SHORT,
  NOURRITURE_TITLE,
} from "@/lib/regles";

// Libellés du « chrome » du site : navigation et pied de page.
//
// Pourquoi ici et pas dans les dictionnaires JSON de `dictionaries.ts` ?
// Navbar et Footer sont des composants clients rendus par chacune des 14 pages.
// Les alimenter depuis le serveur imposerait de faire descendre un dictionnaire
// en props à travers toutes les pages ; pour quelques dizaines de mots, le coût
// de bundle est négligeable et ce module reste importable des deux côtés.
// Le contenu des pages, lui, passe bien par les dictionnaires serveur.

type Nav = {
  home: string;
  activities: string;
  restaurant: string;
  offers: string;
  birthdays: string;
  practical: string;
  faq: string;
  access: string;
  contact: string;
  book: string;
  bookLong: string;
  menu: string;
  call: (phone: string) => string;
  show: string;
  hide: string;
  language: string;
};

type Footer = {
  tagline: string;
  parkTitle: string;
  parkSub: string;
  beachTitle: string;
  beachSub: string;
  partners: string;
  sitemap: string;
  rights: string;
  madeBy: string;
  legalNotice: string;
  privacy: string;
  terms: string;
  salesTerms: string;
};

// Règles du parc — affichées sur presque toutes les pages (Activités, Prix,
// Nos offres, Anniversaires, Restauration, F.A.Q et le footer). Chrome partagé,
// donc ici plutôt qu'en prop descendue depuis sept pages différentes.
// La version française reste la source : cf. lib/regles.ts pour le pourquoi.
type Regles = {
  chaussettesTitle: string;
  chaussettes: string;
  chaussettesShort: string;
  nourritureTitle: string;
  nourriture: string;
  nourritureShort: string;
  nourritureExceptions: string;
};

// Noms des 9 activités et des 3 formules. Ils vivent ici, et non dans les
// dictionnaires serveur, parce que le Navbar (composant client, rendu par les
// 14 pages) en a besoin pour ses sous-menus. Source unique : les pages serveur
// importent `ui()` elles aussi plutôt que de dupliquer ces libellés.
type Names = {
  activites: Record<string, string>;
  formules: Record<string, string>;
};

export type UIStrings = { nav: Nav; footer: Footer; regles: Regles; names: Names };

const fr: UIStrings = {
  nav: {
    home: "Accueil",
    activities: "Activités",
    restaurant: "Restauration",
    offers: "Nos offres",
    birthdays: "Anniversaires",
    practical: "Infos pratiques",
    faq: "F.A.Q",
    access: "Plan d'accès",
    contact: "Contactez-nous",
    book: "Réserver",
    bookLong: "Réserver maintenant",
    menu: "Menu",
    call: (phone) => `Appeler le ${phone}`,
    show: "Afficher",
    hide: "Masquer",
    language: "Choisir la langue",
  },
  footer: {
    tagline:
      "La plaine de jeux couverte préférée des enfants près de Caen. 1 300 m² d’aventures !",
    parkTitle: "Girafou le parc",
    parkSub: "• Toute l’année !",
    beachTitle: "Girafou Plage Club",
    beachSub: "• De juin à septembre !",
    partners: "Partenaires",
    sitemap: "Plan du site",
    rights: "Tous droits réservés.",
    madeBy: "Réalisé par",
    legalNotice: "Mentions légales",
    privacy: "Politique de confidentialité",
    terms: "Conditions générales utilisateur",
    salesTerms: "Conditions générales de ventes",
  },
  regles: {
    chaussettesTitle: CHAUSSETTES_TITLE,
    chaussettes: CHAUSSETTES,
    chaussettesShort: CHAUSSETTES_SHORT,
    nourritureTitle: NOURRITURE_TITLE,
    nourriture: NOURRITURE,
    nourritureShort: NOURRITURE_SHORT,
    nourritureExceptions: NOURRITURE_EXCEPTIONS,
  },
  names: {
    activites: {
      helicoptere: "Hélicoptère",
      neoxperience: "NeoXperience",
      karting: "Karting & Motos",
      trampolines: "Trampolines",
      gonflables: "Structures gonflables",
      "piscine-balles": "Piscine à balles",
      "zones-saut": "Zones de saut",
      labyrinthes: "Labyrinthe",
      toboggan: "Luge & Toboggans",
    },
    formules: {
      "formule-du-lion": "Formule du Lion",
      "ptits-gourmands": "Formule P'tits Gourmands",
      "gira-fun-karaoke": "Gira Fun Karaoké",
    },
  },
};

const en: UIStrings = {
  nav: {
    home: "Home",
    activities: "Activities",
    restaurant: "Food & drinks",
    offers: "Our offers",
    birthdays: "Birthdays",
    practical: "Visitor info",
    faq: "FAQ",
    access: "Getting here",
    contact: "Contact us",
    book: "Book",
    bookLong: "Book now",
    menu: "Menu",
    call: (phone) => `Call ${phone}`,
    show: "Show",
    hide: "Hide",
    language: "Choose language",
  },
  footer: {
    tagline:
      "Children’s favourite indoor playground near Caen. 1,300 m² of adventures!",
    parkTitle: "Girafou le parc",
    parkSub: "• Open all year round!",
    beachTitle: "Girafou Plage Club",
    beachSub: "• June to September!",
    partners: "Partners",
    sitemap: "Sitemap",
    rights: "All rights reserved.",
    madeBy: "Made by",
    // Les pages légales restent en français (décision client) ; seuls les
    // libellés des liens sont traduits pour que la navigation reste lisible.
    legalNotice: "Legal notice",
    privacy: "Privacy policy",
    terms: "Terms of use",
    salesTerms: "Terms of sale",
  },
  regles: {
    chaussettesTitle: "Socks compulsory",
    chaussettes:
      "To use the play equipment, children must wear socks at all times. Bare feet will be refused for reasons of hygiene and everyone's comfort. Thank you for your understanding.",
    chaussettesShort:
      "Children and adults alike. Forgotten yours? Girafou non-slip socks on sale at €2.50 a pair.",
    nourritureTitle: "No food from outside",
    nourriture:
      "For food safety reasons, you may not bring in food or drink from outside. Our café is here for you on site: homemade pizzas, crêpes, waffles, ice creams and drinks.",
    nourritureShort:
      "No food or drink from outside. Our café is here for you on site.",
    nourritureExceptions:
      "Permitted: baby food and specific dietary needs (food allergies).",
  },
  names: {
    activites: {
      helicoptere: "Helicopter",
      neoxperience: "NeoXperience",
      karting: "Karting & Bikes",
      trampolines: "Trampolines",
      gonflables: "Bouncy castles",
      "piscine-balles": "Ball pit",
      "zones-saut": "Jump zones",
      labyrinthes: "Maze",
      toboggan: "Slides & Toboggans",
    },
    formules: {
      "formule-du-lion": "The Lion Package",
      "ptits-gourmands": "The P'tits Gourmands Package",
      "gira-fun-karaoke": "Gira Fun Karaoke",
    },
  },
};

const UI: Record<Locale, UIStrings> = { fr, en };

export function ui(locale: Locale): UIStrings {
  return UI[locale];
}
