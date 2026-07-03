"use server";

import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getMenuFresh, saveMenu, uploadPhoto, deletePhoto } from "@/lib/menu/store";
import type { Category, CategoryLayout, Menu, MenuColumn, MenuItem } from "@/lib/menu/types";

// Defense in depth: every mutation re-checks the session (middleware alone is not
// enough — Server Actions are reachable via direct POST).
async function requireSession(): Promise<void> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    throw new Error("Unauthorized");
  }
}

// Read fresh → apply → persist. saveMenu revalidates the public page + admin.
async function mutate(fn: (menu: Menu) => void | Promise<void>): Promise<void> {
  await requireSession();
  const menu = await getMenuFresh();
  await fn(menu);
  await saveMenu(menu);
}

/* ── helpers ── */

function s(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

function slugify(input: string, taken: string[]): string {
  const base =
    input
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "categorie";
  let slug = base;
  let n = 2;
  while (taken.includes(slug)) slug = `${base}-${n++}`;
  return slug;
}

function findCategory(menu: Menu, id: string): Category {
  const cat = menu.categories.find((c) => c.id === id);
  if (!cat) throw new Error(`Category not found: ${id}`);
  return cat;
}

// Returns the item list a form targets: a category's own items, or a column's items.
function targetItems(cat: Category, columnId: string): MenuItem[] {
  if (columnId) {
    const col = (cat.columns ?? []).find((c) => c.id === columnId);
    if (!col) throw new Error(`Column not found: ${columnId}`);
    return col.items;
  }
  if (!cat.items) cat.items = [];
  return cat.items;
}

function moveInArray<T>(arr: T[], index: number, dir: "up" | "down"): void {
  const j = dir === "up" ? index - 1 : index + 1;
  if (index < 0 || j < 0 || j >= arr.length) return;
  [arr[index], arr[j]] = [arr[j], arr[index]];
}

function itemFromForm(fd: FormData, id: string): MenuItem {
  const item: MenuItem = { id, name: s(fd, "name"), price: s(fd, "price") };
  const desc = s(fd, "desc");
  const note = s(fd, "note");
  if (desc) item.desc = desc;
  if (note) item.note = note;
  return item;
}

/* ── categories ── */

export async function addCategory(fd: FormData): Promise<void> {
  await mutate((menu) => {
    const label = s(fd, "label") || "Nouvelle catégorie";
    const layout = (s(fd, "layout") || "grid") as CategoryLayout;
    const id = slugify(label, menu.categories.map((c) => c.id));
    const cat: Category = {
      id,
      label,
      emoji: s(fd, "emoji") || "🍽️",
      layout,
      heading: s(fd, "heading") || label,
    };
    if (layout === "columns") cat.columns = [];
    else cat.items = [];
    menu.categories.push(cat);
  });
}

export async function updateCategoryMeta(fd: FormData): Promise<void> {
  await mutate((menu) => {
    const cat = findCategory(menu, s(fd, "categoryId"));
    cat.label = s(fd, "label") || cat.label;
    cat.emoji = s(fd, "emoji") || cat.emoji;
    cat.heading = s(fd, "heading") || cat.heading;
    const subtitle = s(fd, "subtitle");
    if (subtitle) cat.subtitle = subtitle;
    else delete cat.subtitle;
  });
}

export async function deleteCategory(fd: FormData): Promise<void> {
  await mutate(async (menu) => {
    const id = s(fd, "categoryId");
    const cat = menu.categories.find((c) => c.id === id);
    if (!cat) return;
    const images = [
      ...(cat.items ?? []).map((i) => i.image),
      ...(cat.columns ?? []).flatMap((col) => [col.image, ...col.items.map((i) => i.image)]),
    ];
    await Promise.all(images.map((url) => deletePhoto(url)));
    menu.categories = menu.categories.filter((c) => c.id !== id);
  });
}

export async function moveCategory(fd: FormData): Promise<void> {
  await mutate((menu) => {
    const i = menu.categories.findIndex((c) => c.id === s(fd, "categoryId"));
    moveInArray(menu.categories, i, s(fd, "dir") as "up" | "down");
  });
}

/* ── items (grid/list categories and column items) ── */

export async function addItem(fd: FormData): Promise<void> {
  await mutate((menu) => {
    const cat = findCategory(menu, s(fd, "categoryId"));
    targetItems(cat, s(fd, "columnId")).push(itemFromForm(fd, crypto.randomUUID()));
  });
}

export async function updateItem(fd: FormData): Promise<void> {
  await mutate((menu) => {
    const cat = findCategory(menu, s(fd, "categoryId"));
    const items = targetItems(cat, s(fd, "columnId"));
    const idx = items.findIndex((i) => i.id === s(fd, "itemId"));
    if (idx < 0) return;
    items[idx] = { ...itemFromForm(fd, items[idx].id), image: items[idx].image };
  });
}

export async function deleteItem(fd: FormData): Promise<void> {
  await mutate(async (menu) => {
    const cat = findCategory(menu, s(fd, "categoryId"));
    const items = targetItems(cat, s(fd, "columnId"));
    const idx = items.findIndex((i) => i.id === s(fd, "itemId"));
    if (idx < 0) return;
    await deletePhoto(items[idx].image);
    items.splice(idx, 1);
  });
}

export async function moveItem(fd: FormData): Promise<void> {
  await mutate((menu) => {
    const cat = findCategory(menu, s(fd, "categoryId"));
    const items = targetItems(cat, s(fd, "columnId"));
    const idx = items.findIndex((i) => i.id === s(fd, "itemId"));
    moveInArray(items, idx, s(fd, "dir") as "up" | "down");
  });
}

export async function uploadItemPhoto(fd: FormData): Promise<void> {
  await requireSession();
  const file = fd.get("photo");
  if (!(file instanceof File) || file.size === 0) return;
  const url = await uploadPhoto(file);
  await mutate(async (menu) => {
    const cat = findCategory(menu, s(fd, "categoryId"));
    const items = targetItems(cat, s(fd, "columnId"));
    const item = items.find((i) => i.id === s(fd, "itemId"));
    if (!item) {
      await deletePhoto(url);
      return;
    }
    await deletePhoto(item.image);
    item.image = url;
  });
}

export async function removeItemPhoto(fd: FormData): Promise<void> {
  await mutate(async (menu) => {
    const cat = findCategory(menu, s(fd, "categoryId"));
    const item = targetItems(cat, s(fd, "columnId")).find((i) => i.id === s(fd, "itemId"));
    if (!item) return;
    await deletePhoto(item.image);
    delete item.image;
  });
}

/* ── columns (columns-layout categories) ── */

export async function addColumn(fd: FormData): Promise<void> {
  await mutate((menu) => {
    const cat = findCategory(menu, s(fd, "categoryId"));
    if (!cat.columns) cat.columns = [];
    const col: MenuColumn = {
      id: crypto.randomUUID(),
      title: s(fd, "title") || "Nouvelle colonne",
      items: [],
    };
    const emoji = s(fd, "emoji");
    if (emoji) col.emoji = emoji;
    cat.columns.push(col);
  });
}

export async function updateColumn(fd: FormData): Promise<void> {
  await mutate((menu) => {
    const cat = findCategory(menu, s(fd, "categoryId"));
    const col = (cat.columns ?? []).find((c) => c.id === s(fd, "columnId"));
    if (!col) return;
    col.title = s(fd, "title") || col.title;
    const emoji = s(fd, "emoji");
    const footnote = s(fd, "footnote");
    if (emoji) col.emoji = emoji;
    else delete col.emoji;
    if (footnote) col.footnote = footnote;
    else delete col.footnote;
  });
}

export async function deleteColumn(fd: FormData): Promise<void> {
  await mutate(async (menu) => {
    const cat = findCategory(menu, s(fd, "categoryId"));
    const id = s(fd, "columnId");
    const col = (cat.columns ?? []).find((c) => c.id === id);
    if (!col) return;
    await Promise.all([col.image, ...col.items.map((i) => i.image)].map((u) => deletePhoto(u)));
    cat.columns = (cat.columns ?? []).filter((c) => c.id !== id);
  });
}

export async function moveColumn(fd: FormData): Promise<void> {
  await mutate((menu) => {
    const cat = findCategory(menu, s(fd, "categoryId"));
    const cols = cat.columns ?? [];
    const idx = cols.findIndex((c) => c.id === s(fd, "columnId"));
    moveInArray(cols, idx, s(fd, "dir") as "up" | "down");
  });
}
