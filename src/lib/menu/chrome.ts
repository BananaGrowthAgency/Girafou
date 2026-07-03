// Per-category visual "chrome": the bespoke look that stays in code (not editable
// in the pilot). Keyed by Category.id. New categories created from /admin fall back
// to DEFAULT_CHROME so they still render nicely without a hand-tuned design.

export type CategoryChrome = {
  background: string;
  accent: string;
  patterned?: boolean;
  // Soft radial glow behind the section (matches the original decorative blurs).
  glow?: { color: string; position: string };
  // Tailwind grid classes (static strings so the JIT compiler keeps them).
  itemsClass?: string; // layout "grid"
  columnsClass?: string; // layout "columns"
  // Top color of the section — used to tint the Wave divider above it.
  waveFill: string;
};

// Default grids used for categories created from /admin without a hand-tuned design.
export const DEFAULT_ITEMS_CLASS = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4";
export const DEFAULT_COLUMNS_CLASS = "grid grid-cols-1 md:grid-cols-2 gap-5";

export const DEFAULT_CHROME: CategoryChrome = {
  background: "linear-gradient(to bottom, #FFF3EE 0%, #FFFDF5 100%)",
  accent: "#FF5722",
  waveFill: "#FFF3EE",
};

export const categoryChrome: Record<string, CategoryChrome> = {
  boissons: {
    background: "linear-gradient(to bottom, #E0F2F1 0%, #FFFDF5 100%)",
    accent: "#00897B",
    glow: { color: "rgba(0,137,123,0.10)", position: "-top-20 -left-20" },
    columnsClass: "grid grid-cols-1 md:grid-cols-3 gap-5",
    waveFill: "#E0F2F1",
  },
  pizzas: {
    background: "linear-gradient(to bottom, #FFDDC2 0%, #FFF3EE 60%, #FFFDF5 100%)",
    accent: "#EA580C",
    patterned: true,
    itemsClass: "grid grid-cols-2 md:grid-cols-3 gap-4",
    waveFill: "#FFDDC2",
  },
  sucre: {
    background: "linear-gradient(to bottom, #FCE7F3 0%, #FFFDF5 100%)",
    accent: "#DB2777",
    glow: { color: "rgba(236,72,153,0.10)", position: "-top-16 -right-16" },
    columnsClass: "grid grid-cols-1 md:grid-cols-2 gap-5",
    waveFill: "#FCE7F3",
  },
  glaces: {
    background: "linear-gradient(to bottom, #EDE9FE 0%, #FFFDF5 100%)",
    accent: "#7C3AED",
    glow: { color: "rgba(124,58,237,0.10)", position: "-top-20 -left-16" },
    itemsClass: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4",
    waveFill: "#EDE9FE",
  },
  gouter: {
    background: "linear-gradient(to bottom, #FFF3D0 0%, #FFFDF5 100%)",
    accent: "#B45309",
    columnsClass: "grid grid-cols-1 md:grid-cols-2 gap-5",
    waveFill: "#FFF3D0",
  },
};

export function chromeFor(id: string): CategoryChrome {
  return categoryChrome[id] ?? DEFAULT_CHROME;
}
