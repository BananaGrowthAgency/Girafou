import "server-only";
import type { Locale } from "./config";

// Dictionnaires de *contenu*, chargés uniquement sur le serveur : le JSON ne
// part donc jamais dans le bundle client — les pages passent aux composants la
// seule tranche dont ils ont besoin. Les libellés de navigation et les règles
// du parc, partagés par toutes les pages, vivent dans `ui.ts`.
//
// Le type est explicite : l'étendre oblige à compléter fr.json *et* en.json,
// sous peine d'erreur de compilation.

type Labelled = { label: string; sub: string };

// En-tête d'une section « avis Google » (Elfsight). Même forme sur la home et
// sur la page Anniversaires — seul l'id du widget change.
type ReviewsSection = {
  label: string;
  accent: string;
  rest: string;
  subtitle: string;
};

export type Dictionary = {
  site: {
    title: string;
    description: string;
    keywords: string[];
  };
  home: {
    announcement: string;
    hero: {
      titleStart: string;
      titleAccent: string;
      titleEnd: string;
      descStrong1: string;
      descMid: string;
      descStrong2: string;
      descEnd: string;
      ctaActivities: string;
      ctaBirthday: string;
      stats: string[];
    };
    toddler: {
      badge: string;
      title: string;
      text: string;
      points: Labelled[];
      cta: string;
    };
    activities: {
      badge: string;
      titleStart: string;
      titleAccent: string;
      subtitle: string;
      more: string;
      cta: string;
    };
    why: {
      ticker: string[];
      badge: string;
      titleStart: string;
      titleAccent: string;
      reasons: { title: string; desc: string }[];
      ctaVisit: string;
      ctaBirthday: string;
    };
    restauration: {
      badge: string;
      titleStart: string;
      titleAccent: string;
      titleEnd: string;
      text: string;
      pizzaTitle: string;
      pizzaText: string;
    };
    birthday: {
      badge: string;
      titleStart: string;
      titleAccent: string;
      subtitle: string;
      popular: string;
      book: string;
      more: string;
      formulas: Record<string, { sub: string; horaire: string }>;
      perChild: string;
      info: string[];
      infoStrong: string;
    };
    reviews: ReviewsSection;
    fidelite: {
      badge: string;
      title: string;
      spend: string;
      point: string;
      rewardValue: string;
      rewardText: string;
      extra: string;
    };
    practical: {
      badge: string;
      titleStart: string;
      titleAccent: string;
      tips: Labelled[];
      hoursTitle: string;
      new: string;
      hours: { day: string; time: string; note?: string }[];
      pricesTitle: string;
      prices: { label: string; price: string }[];
      pricesNote: string;
      allPrices: string;
      findUs: string;
      parkName: string;
      parkAddress: string;
      beachName: string;
      beachAddress: string;
    };
  };
  // Carte : seuls les *titres de rubrique* sont traduits — les plats restent en
  // français, comme décidé avec le parc (le modèle de données du CMS n'est pas touché).
  carte: {
    from: string;
    eventsLabel: string;
    // Résumé de la home (3 cartes) — cf. lib/menu/summary.ts.
    pizzas: { label: string; badge: string };
    gourmandises: { label: string; crepes: string; gaufres: string };
    boissons: { label: string; cold: string; hot: string };
    // Surcouche des titres de rubrique de la carte complète, par id CMS.
    categories: Record<
      string,
      {
        label?: string;
        heading?: string;
        subtitle?: string;
        highlightBadge?: string;
        highlightText?: string;
      }
    >;
    columns: Record<string, string>;
  };
  // Surcouche traduite des 9 activités : `lib/activites.ts` garde tout ce qui
  // n'est pas du texte (slug, photo, couleurs, dégradé).
  // Le *nom* n'est pas ici mais dans `ui.ts` : le Navbar, composant client, en
  // a besoin pour son sous-menu (voir le commentaire de `Names`).
  activites: Record<
    string,
    {
      cardDesc: string;
      tag: string;
      tagline: string;
      description: string[];
      age?: string;
      ageDetail?: string;
      rules: string[];
      // Bloc spécial « Grande Fête » — pour l'instant seulement NeoXperience.
      grandeFete?: {
        title: string;
        intro: string;
        body: string;
        sessionsLabel: string;
        sessions: string;
        outro: string;
      };
    }
  >;
  pages: {
    activites: {
      hub: {
        badge: string;
        titleStart: string;
        titleAccent: string;
        subtitle: string;
        more: string;
      };
      detail: {
        breadcrumb: string;
        paid: string;
        included: string;
        book: string;
        factAge: string;
        factAccess: string;
        factInfo: string;
        factSafety: string;
        allAges: string;
        socksRequired: string;
        attraction: string;
        rulesTitle: string;
        hoursTitle: string;
        hours: { period: string; days: string; time: string }[];
        continueAdventure: string;
        backToAll: string;
      };
    };
    restauration: {
      titleStart: string;
      titleAccent: string;
      subtitle: string;
      sanitary: string;
      birthdayTitle: string;
      birthdayText: string;
      birthdayCta: string;
      privatisationTitle: string;
      privatisationText: string;
      privatisationCta: string;
    };
    contact: {
      badge: string;
      titleStart: string;
      titleAccent: string;
      subtitle: string;
      infoTitle: string;
      infoSub: string;
      successTitle: string;
      successText: string;
      successAgain: string;
      fieldCivilite: string;
      fieldNom: string;
      fieldPrenom: string;
      fieldEmail: string;
      fieldTelephone: string;
      fieldSujet: string;
      fieldMessage: string;
      placeholderEmail: string;
      placeholderTelephone: string;
      placeholderMessage: string;
      submit: string;
      submitting: string;
      errorGeneric: string;
      errorNetwork: string;
      missingKey: string;
      // Libellés visibles seulement : la valeur postée reste en français, pour
      // que la boîte mail du parc reçoive toujours les mêmes intitulés.
      civilites: string[];
      sujets: string[];
    };
    planAcces: {
      badge: string;
      titleStart: string;
      titleAccent: string;
      subtitle: string;
      mapTitle: string;
      addressTitle: string;
      gps: string;
      route: string;
      call: string;
      howToTitle: string;
      itineraires: { from: string; short: string; steps: string[] }[];
      pmrTitle: string;
      pmrText: string;
    };
    prix: {
      badge: string;
      titleStart: string;
      titleAccent: string;
      subtitle: string;
      pricesTitle: string;
      prices: { label: string; price: string }[];
      tokensTitle: string;
      tokens: { n: string; price: string }[];
      payment: string;
      hoursTitle: string;
      allYear: string;
      colDays: string;
      colHours: string;
      hours: { day: string; note?: string; time: string }[];
      holidayZones: string[];
      everyDay: string;
      holidayHours: string;
      // Girafou Plage (Ouistreham) : horaires confirmés en F.A.Q ; les tarifs
      // ne sont pas publiés par le parc, d'où le renvoi au téléphone.
      beach: {
        title: string;
        season: string;
        hoursLabel: string;
        hours: string;
        weather: string;
        activitiesLabel: string;
        activities: string;
        addressLabel: string;
        address: string;
        priceLabel: string;
        priceNote: string;
        call: string;
      };
    };
    nosOffres: {
      badge: string;
      titleStart: string;
      titleAccent: string;
      subtitle: string;
      book: string;
      // Même ordre que `offres` dans NosOffres.tsx (photo, lien, couleur en code).
      offres: { title: string; desc: string; cta: string }[];
    };
    faq: {
      title: string;
      subtitle: string;
      importantBadge: string;
      // Une ligne = suite de segments ; `null` = ligne vide (espacement).
      items: { q: string; important?: boolean; a: ({ t: string; u?: boolean; href?: string }[] | null)[] }[];
    };
    anniversaires: {
      hub: {
        badge: string;
        titleStart: string;
        titleAccent: string;
        subtitleSuffix: string;
        popular: string;
        book: string;
        more: string;
        perChild: string;
      };
      detail: {
        breadcrumb: string;
        titleStart: string;
        titleAccent: string;
        titleEnd: string;
        subtitleSuffix: string;
        entryBefore: string;
        entryUnderlined: string;
        entryAfter: string;
        book: string;
        includesTitle: string;
        bookThis: string;
        backToAll: string;
        perChild: string;
      };
      reviews: ReviewsSection;
    };
  };
  // Anniversaires : `lib/anniversaires.ts` garde couleurs, images et liens
  // Qweekle ; tout le texte (y compris les inclusions) vient d'ici.
  anniversaires: {
    creneaux: string;
    baseInclusions: { b: string; t?: string }[];
    optionPizza: { price: string; title: string; text: string };
    conditionsTitle: string;
    conditions: string[];
    formules: Record<
      string,
      { tagline: string; price: string; extra?: string; fondExtra?: string }
    >;
  };
  // Titres et descriptions des pages. Les gabarits `{name}` sont remplis par `fill()`.
  meta: {
    activites: { title: string; description: string };
    activiteDetail: { title: string; description: string; fallback: string };
    anniversaires: { title: string; description: string };
    formuleDetail: { title: string; description: string; fallback: string };
    faq: { title: string; description: string };
    nosOffres: { title: string; description: string };
    prix: { title: string; description: string };
    planAcces: { title: string; description: string };
    contact: { title: string; description: string };
    restauration: { title: string; description: string };
  };
};

/** Texte d'une formule anniversaire. */
export type FormuleTexte = Dictionary["anniversaires"]["formules"][string];

/** Texte d'une activité, avec repli sur le français de `lib/activites.ts`. */
export type ActiviteTexte = Dictionary["activites"][string];

/**
 * Remplace les {placeholders} d'un gabarit de métadonnée.
 * `fill("{name} — Girafou", { name: "Karting" })` → « Karting — Girafou ».
 */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
