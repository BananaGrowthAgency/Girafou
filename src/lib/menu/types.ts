// Data model for the editable digital menu (QR → /restauration).
// Only *content* lives here; the bespoke visual "chrome" of each category
// (gradients, waves, stickers) stays in code — see src/lib/menu/chrome.ts.

export type MenuItem = {
  id: string;
  name: string;
  price: string;
  desc?: string;
  note?: string;
  image?: string; // Vercel Blob URL
};

export type MenuColumn = {
  id: string;
  title: string;
  emoji?: string;
  image?: string; // Vercel Blob URL
  footnote?: string;
  items: MenuItem[];
};

export type CategoryLayout = "grid" | "columns" | "list";

export type Category = {
  id: string; // used as the section anchor (#id) and the chrome key
  label: string; // short label for the sticky nav
  emoji: string;
  layout: CategoryLayout;
  heading: string;
  subtitle?: string;
  items?: MenuItem[]; // layout "grid" | "list"
  columns?: MenuColumn[]; // layout "columns"
};

export type Menu = {
  park: string;
  updatedAt: string;
  categories: Category[];
};
