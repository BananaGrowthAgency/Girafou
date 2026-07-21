// Résumé « restauration » affiché sur la home. Construit à partir du menu réel
// (même source que /restauration) pour que plats et prix ne divergent jamais.
// Ce module n'est pas "use client" : il tourne côté serveur et n'envoie au
// navigateur que ce qui est réellement affiché, pas tout le menu.

import type { Category, Menu, MenuItem } from "./types";

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
function fromPrice(items: MenuItem[]): string | undefined {
  const values = items.map((i) => parsePrice(i.price)).filter((n): n is number => n !== null);
  return values.length ? `dès ${format(Math.min(...values))}` : undefined;
}

// Tous les plats d'une catégorie, y compris ceux rangés en sous-colonnes.
function allItems(cat?: Category): MenuItem[] {
  if (!cat) return [];
  return [...(cat.items ?? []), ...(cat.columns ?? []).flatMap((c) => c.items)];
}

export function buildRestaurationSummary(menu: Menu): SummaryCard[] {
  const by = (id: string) => menu.categories.find((c) => c.id === id);
  const pizzas = by("pizzas");

  return [
    {
      label: "Pizzas maison",
      badge: "Sur place ou à emporter",
      image: "/images/resto/pizza.jpg",
      // Seulement `items` : les sous-colonnes de cette catégorie sont des
      // accompagnements (chips, fruits), leur prix ne représente pas une pizza.
      price: fromPrice(pizzas?.items ?? []),
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
      label: "Gourmandises",
      badge: null,
      image: "/images/resto/glaces-douceurs.jpg",
      price: fromPrice(allItems(by("sucre"))),
      sections: [
        { title: "Crêpes", items: "Sucre, Nutella, Confiture de fraise, Caramel beurre salé" },
        { title: "Gaufres", items: "Sucre, Nutella, Caramel beurre salé" },
      ],
    },
    {
      label: "Boissons",
      badge: null,
      image: "/images/resto/boissons.jpg",
      price: fromPrice(allItems(by("boissons"))),
      sections: [
        { title: "Boissons fraîches", items: "Sodas, sirops à l’eau, Bouteilles d’eau, Caprisun…" },
        {
          title: "Boissons chaudes",
          items:
            "Petit Café, Café Allongé, Grand Café, Décaféiné, Petit Crème, Grand Crème, Café Viennois, Cappuccino, Chocolat, Choco Viennois, Thé",
        },
      ],
    },
  ];
}
