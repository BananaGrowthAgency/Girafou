// Contenu réel des 9 activités du parc, transcrit depuis girafou.com puis
// retravaillé dans notre ton de marque. Source unique : la home (section
// Activités), le hub /activites et les 9 pages de détail lisent tous ce fichier.

import { RESERVATION_URL, CHAUSSETTES } from "./anniversaires";

export { RESERVATION_URL, CHAUSSETTES };

// Consigne chaussettes, commune à toutes les activités (déjà dans anniversaires.ts).
// Réglementation propre à chaque attraction : liste de consignes courtes.

export type Activite = {
  slug: string; // route /activites/<slug> + basename de la photo
  name: string; // titre affiché
  tag: string; // pastille courte (Exclusif, Nouveau, Populaire…)
  tagBg: string; // fond de la pastille
  cardDesc: string; // description courte pour la carte (home + hub)
  tagline: string; // accroche du hero de la page de détail
  description: string[]; // paragraphe(s) principaux de la page de détail
  age?: string; // tranche d'âge principale (badge)
  ageDetail?: string; // nuance d'âge (texte)
  payant?: boolean; // « payant en supplément »
  rules: string[]; // consignes propres à l'attraction
  image: string; // photo /images/activites/<slug>.jpg
  accent: string; // couleur d'accent
  accentLight: string; // fond doux assorti
  gradient: string; // dégradé du hero
};

// Ordre curé (repris de la home) : les activités phares en premier.
export const ACTIVITES: Activite[] = [
  {
    slug: "helicoptere",
    name: "Hélicoptère",
    tag: "Exclusif",
    tagBg: "#1E88E5",
    cardDesc:
      "Exclusif en Normandie — monte à bord d'un vrai hélicoptère et survole le parc.",
    tagline: "Envole-toi au-dessus du parc",
    description: [
      "Viens voler au-dessus du parc ! Quelques coups de pédales et c'est parti pour un petit tour à 5 mètres de haut. Une attraction réservée aux plus courageux !",
      "Et si le cœur t'en dit, papa ou maman peut même monter à bord pour faire un tour avec toi.",
    ],
    ageDetail: "Enfant de moins de 5 ans accompagné d'un adulte.",
    payant: true,
    rules: [
      "2 personnes maximum par cabine.",
      "Enfant de moins de 5 ans accompagné d'un adulte obligatoirement.",
      "Ne pas sortir les bras de la cabine pendant le tour.",
      "Interdit aux femmes enceintes.",
    ],
    image: "/images/activites/helicoptere.jpg",
    accent: "#1E88E5",
    accentLight: "#E3F2FD",
    gradient: "linear-gradient(135deg, #1565C0, #42A5F5)",
  },
  {
    slug: "neoxperience",
    name: "NeoXperience",
    tag: "Nouveau",
    tagBg: "#7C3AED",
    cardDesc:
      "Le mur interactif révolutionnaire qui mêle jeux vidéo et sport pour des sensations inédites.",
    tagline: "La console de jeu grandeur nature",
    description: [
      "Une véritable console de jeu grandeur nature ! Un espace de jeu unique dans la région, avec son mur interactif.",
      "Viens affronter tes copains ou même tes parents… On verra bien qui est le plus fort. À très vite !",
    ],
    age: "De 1 à 99 ans",
    ageDetail: "De 1 à 8 joueurs.",
    rules: ["Ouvert toute la journée, sauf pendant la grande boum de Girafou."],
    image: "/images/activites/neoxperience.jpg",
    accent: "#7C3AED",
    accentLight: "#EDE9FE",
    gradient: "linear-gradient(135deg, #6D28D9, #A855F7)",
  },
  {
    slug: "karting",
    name: "Karting & Motos",
    tag: "Populaire",
    tagBg: "#FF5722",
    cardDesc:
      "Pilote ton kart ou ta moto sur la piste — pour les petits pilotes en herbe !",
    tagline: "En route pour l'aventure",
    description: [
      "Esprit de liberté et de sensations : viens rouler comme les motards américains sur nos motos et nos karts !",
      "Pas besoin d'être grand pour rêver et s'évader… En route pour l'aventure !",
    ],
    age: "Dès 3 ans en solo",
    ageDetail: "Les adultes peuvent accompagner les plus petits en moto ou en karting.",
    payant: true,
    rules: [
      "Suivre le sens des flèches du circuit.",
      "Interdit de pousser les véhicules.",
    ],
    image: "/images/activites/karting.jpg",
    accent: "#FF5722",
    accentLight: "#FBE9E7",
    gradient: "linear-gradient(135deg, #FF5722, #F5A623)",
  },
  {
    slug: "trampolines",
    name: "Trampolines",
    tag: "Fun",
    tagBg: "#00897B",
    cardDesc:
      "Des trampolines XXL pour des sauts spectaculaires et des heures de bonheur aérien.",
    tagline: "Saute plus haut que Girafou !",
    description: [
      "Des trampolines pour sauter toujours plus haut ! Viens relever le défi et essaie de bondir plus haut que la tête de Girafou.",
    ],
    age: "De 4 à 12 ans",
    rules: ["Pour éviter les accrochages : 1 enfant par trampoline."],
    image: "/images/activites/trampolines.jpg",
    accent: "#00897B",
    accentLight: "#E0F2F1",
    gradient: "linear-gradient(135deg, #00695C, #26A69A)",
  },
  {
    slug: "gonflables",
    name: "Structures gonflables",
    tag: "Classique",
    tagBg: "#F59E0B",
    cardDesc:
      "Labyrinthes géants, châteaux gonflables et toboggans — l'aventure en souplesse.",
    tagline: "Le Kilimandjaro & le Serengeti t'attendent",
    description: [
      "Plusieurs jeux gonflables pour s'amuser à tout âge : sauter, glisser, rebondir…",
      "Le Kilimandjaro et l'impressionnant Serengeti n'attendent que toi !",
    ],
    age: "De 4 à 12 ans",
    ageDetail: "Kilimandjaro dès 4 ans · Serengeti dès 6 ans.",
    rules: ["L'accès aux jeux gonflables est interdit aux adultes."],
    image: "/images/activites/gonflables.jpg",
    accent: "#F59E0B",
    accentLight: "#FFFBEB",
    gradient: "linear-gradient(135deg, #D97706, #FBBF24)",
  },
  {
    slug: "piscine-balles",
    name: "Piscine à balles",
    tag: "Incontournable",
    tagBg: "#0288D1",
    cardDesc:
      "Plonge dans un océan de balles colorées — le paradis des petits explorateurs (2–6 ans).",
    tagline: "L'attraction phare du parc",
    description: [
      "L'attraction phare, plébiscitée par tous les enfants ! Viens te rouler, sauter et jouer dans nos piscines à balles.",
      "Des heures de jeu ludiques et fun pour tous !",
    ],
    ageDetail: "Deux bassins : un pour les moins de 5 ans, un pour les plus de 4 ans.",
    rules: [],
    image: "/images/activites/piscine-balles.jpg",
    accent: "#0288D1",
    accentLight: "#E1F5FE",
    gradient: "linear-gradient(135deg, #0277BD, #4FC3F7)",
  },
  {
    slug: "zones-saut",
    name: "Zones de saut",
    tag: "Adrénaline",
    tagBg: "#E91E63",
    cardDesc:
      "Des espaces dédiés au saut avec modules mousse, obstacles et espaces de grimpe.",
    tagline: "Défie les lois de la gravité",
    description: [
      "Fais le grand saut ! Notre structure de jeux dispose d'espaces dédiés aux sensations, avec des zones sécurisées pour sauter en toute confiance.",
      "Pour les petits comme pour les plus grands : viens défier les lois de la gravité !",
    ],
    age: "À partir de 7 ans",
    rules: [],
    image: "/images/activites/zones-saut.jpg",
    accent: "#E91E63",
    accentLight: "#FCE4EC",
    gradient: "linear-gradient(135deg, #C2185B, #FF6090)",
  },
  {
    slug: "labyrinthes",
    name: "Labyrinthe",
    tag: "Aventure",
    tagBg: "#5E35B1",
    cardDesc:
      "Structures multi-niveaux avec tunnels secrets, passages mystérieux et espaces de grimpe.",
    tagline: "200 m² d'aventures sur 5 mètres de haut",
    description: [
      "200 m² d'obstacles, de grimpe, de glisse et de cachettes…",
      "Et plein d'autres jeux et activités pour les enfants, le tout sur 5 mètres de hauteur !",
    ],
    age: "De 4 à 12 ans",
    ageDetail: "Accès autorisé aux 2–4 ans accompagnés de papa ou maman, pour profiter en famille.",
    rules: [],
    image: "/images/activites/labyrinthes.jpg",
    accent: "#5E35B1",
    accentLight: "#EDE7F6",
    gradient: "linear-gradient(135deg, #4527A0, #7E57C2)",
  },
  {
    slug: "toboggan",
    name: "Luge & Toboggans",
    tag: "Sensations",
    tagBg: "#00ACC1",
    cardDesc:
      "Des toboggans géants et luges intérieures pour des descentes à toute vitesse !",
    tagline: "De belles glissades garanties",
    description: [
      "Pour de belles glissades ! Au choix : notre toboggan droit à vague ou le toboggan spirale…",
      "Et s'il te reste encore envie de sensations, il y a la luge à rouleaux !",
    ],
    rules: [
      "Bien attendre chacun son tour.",
      "Pour la luge : pense à prendre ta luge avant de te lancer sur les rouleaux.",
    ],
    image: "/images/activites/toboggan.jpg",
    accent: "#00ACC1",
    accentLight: "#E0F7FA",
    gradient: "linear-gradient(135deg, #0097A7, #26C6DA)",
  },
];

export const activiteBySlug = (slug: string): Activite | undefined =>
  ACTIVITES.find((a) => a.slug === slug);
