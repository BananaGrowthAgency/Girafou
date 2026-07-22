import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Menu } from "./types";

// Traduction des *titres de rubrique* de la carte : la donnée reste celle du
// CMS (Blob), on ne fait que la recouvrir à l'affichage, par id de catégorie
// et de sous-colonne. Les plats eux-mêmes ne sont pas traduits — c'est la
// décision du parc, et leur modèle de données n'est pas touché.
//
// À n'appliquer QUE pour l'affichage public : en mode édition, le gérant doit
// voir et modifier les valeurs françaises réelles, sinon un enregistrement
// écraserait le français par l'anglais.
export function localizeMenu(menu: Menu, t: Dictionary["carte"]): Menu {
  return {
    ...menu,
    categories: menu.categories.map((cat) => {
      const tc = t.categories[cat.id];
      if (!tc) return cat; // catégorie créée depuis /admin : pas de traduction
      return {
        ...cat,
        label: tc.label ?? cat.label,
        heading: tc.heading ?? cat.heading,
        ...(cat.subtitle && tc.subtitle ? { subtitle: tc.subtitle } : {}),
        ...(cat.highlight
          ? {
              highlight: {
                ...cat.highlight,
                badge: tc.highlightBadge ?? cat.highlight.badge,
                text: tc.highlightText ?? cat.highlight.text,
              },
            }
          : {}),
        ...(cat.columns
          ? {
              columns: cat.columns.map((col) => ({
                ...col,
                title: t.columns[col.id] ?? col.title,
              })),
            }
          : {}),
      };
    }),
  };
}
