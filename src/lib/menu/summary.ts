// Résumé « restauration » affiché sur la home. Construit à partir du menu réel
// (même source que /restauration) pour que plats et prix ne divergent jamais.
// Ce module n'est pas "use client" : il tourne côté serveur et n'envoie au
// navigateur que ce qui est réellement affiché, pas tout le menu.

import type { Category, Menu, MenuItem } from "./types";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// Seuls les titres de rubrique sont traduits : les plats et leurs descriptions
// viennent du CMS et restent en français (décision du parc).
type CarteStrings = Dictionary["carte"];

export type SummarySection = { title: string; items: string };

export type SummaryCard = {
  label: string;
  badge: string | null;
  image: string;
  price?: string;
  sections: SummarySection[];
  highlight?: { badge: string; text: string; price: string };
};

// "11,90 €" -> 11.9 ; renvoie null si le prix n'est pas un montant lisible
// (certains items affichent du texte libre).
function parsePrice(price: string): number | null {
  const m = price.match(/(\d+)[,.](\d{1,2})|(\d+)/);
  if (!m) return null;
  const n = m[1] ? Number(`${m[1]}.${m[2]}`) : Number(m[3]);
  return Number.isFinite(n) ? n : null;
}

function format(n: number): string {
  return `${n.toFixed(2).replace(".", ",")} €`;
}

// « dès X € » à partir du plat le moins cher de la sélection.
function fromPrice(items: MenuItem[], from: string): string | undefined {
  const values = items.map((i) => parsePrice(i.price)).filter((n): n is number => n !== null);
  return values.length ? `${from} ${format(Math.min(...values))}` : undefined;
}

// Tous les plats d'une catégorie, y compris ceux rangés en sous-colonnes.
function allItems(cat?: Category): MenuItem[] {
  if (!cat) return [];
  return [...(cat.items ?? []), ...(cat.columns ?? []).flatMap((c) => c.items)];
}

export function buildRestaurationSummary(menu: Menu, t: CarteStrings): SummaryCard[] {
  const by = (id: string) => menu.categories.find((c) => c.id === id);
  const pizzas = by("pizzas");

  return [
    {
      label: t.pizzas.label,
      badge: t.pizzas.badge,
      image: "/images/resto/pizza.jpg",
      // Seulement `items` : les sous-colonnes de cette catégorie sont des
      // accompagnements (chips, fruits), leur prix ne représente pas une pizza.
      price: fromPrice(pizzas?.items ?? [], t.from),
      sections: (pizzas?.items ?? []).map((i) => ({ title: i.name, items: i.desc ?? "" })),
      highlight: pizzas?.highlight
        ? {
            badge: pizzas.highlight.badge,
            text: pizzas.highlight.text,
            price: pizzas.highlight.price,
          }
        : undefined,
    },
    {
      label: t.gourmandises.label,
      badge: null,
      image: "/images/resto/glaces-douceurs.jpg",
      price: fromPrice(allItems(by("sucre")), t.from),
      sections: [
        { title: t.gourmandises.crepes, items: "Sucre, Nutella, Confiture de fraise, Caramel beurre salé" },
        { title: t.gourmandises.gaufres, items: "Sucre, Nutella, Caramel beurre salé" },
      ],
    },
    {
      label: t.boissons.label,
      badge: null,
      image: "/images/resto/boissons.jpg",
      price: fromPrice(allItems(by("boissons")), t.from),
      sections: [
        { title: t.boissons.cold, items: "Sodas, sirops à l’eau, Bouteilles d’eau, Caprisun…" },
        {
          title: t.boissons.hot,
          items:
            "Petit Café, Café Allongé, Grand Café, Décaféiné, Petit Crème, Grand Crème, Café Viennois, Cappuccino, Chocolat, Choco Viennois, Thé",
        },
      ],
    },
  ];
}
