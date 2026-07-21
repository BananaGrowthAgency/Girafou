import "server-only";
import { put, del, list } from "@vercel/blob";
import { unstable_cache, revalidateTag, revalidatePath } from "next/cache";
import type { Category, Menu, MenuColumn } from "./types";
import { girafouSeed } from "./seed";

// One park per deploy. Data is isolated under parks/<slug>/ so the same code can
// be dropped into any park's repo with its own Blob store (see plan).
export const PARK_SLUG = process.env.PARK_SLUG ?? "girafou";

const MENU_PATH = `parks/${PARK_SLUG}/menu.json`;
const PHOTO_PREFIX = `parks/${PARK_SLUG}/photos/`;
const MENU_TAG = `menu:${PARK_SLUG}`;

// Seed used when the blob does not exist yet. Add more parks here as we expand.
const SEEDS: Record<string, Menu> = { girafou: girafouSeed };
function seedFor(slug: string): Menu {
  return SEEDS[slug] ?? { park: slug, updatedAt: new Date(0).toISOString(), categories: [] };
}

// A menu saved before a given field existed (e.g. Category.highlight) won't have
// it. Backfill those from the seed, by category id, without touching anything an
// admin already edited — self-healing, no migration script needed.
function backfillFromSeed(menu: Menu): Menu {
  const seed = seedFor(PARK_SLUG);
  for (const seedCat of seed.categories) {
    const cat = menu.categories.find((c) => c.id === seedCat.id);
    if (!cat) continue;
    if (cat.highlight === undefined && seedCat.highlight) cat.highlight = seedCat.highlight;
  }
  // Legacy migration: the "cartes secondaires" (extraColumns) mechanism was
  // merged into the standard sous-catégories (columns). Move any leftover
  // extraColumns saved in an older blob into columns and drop the old field.
  for (const cat of menu.categories) {
    const legacy = (cat as Category & { extraColumns?: MenuColumn[] }).extraColumns;
    if (legacy?.length) cat.columns = [...(cat.columns ?? []), ...legacy];
    delete (cat as { extraColumns?: unknown }).extraColumns;
  }
  return menu;
}

// Uncached read straight from Blob. Used by admin Server Actions so mutations
// always start from the current menu, never a stale cache entry.
export async function getMenuFresh(): Promise<Menu> {
  try {
    const { blobs } = await list({ prefix: MENU_PATH, limit: 1 });
    const blob = blobs.find((b) => b.pathname === MENU_PATH);
    if (!blob) return seedFor(PARK_SLUG);

    // uploadedAt busts the Blob CDN cache so we never read a stale overwrite.
    const res = await fetch(`${blob.url}?v=${blob.uploadedAt.getTime()}`, {
      cache: "no-store",
    });
    if (!res.ok) return seedFor(PARK_SLUG);
    return backfillFromSeed((await res.json()) as Menu);
  } catch {
    // No Blob token yet (e.g. build time / unconfigured local) → fall back to seed.
    return seedFor(PARK_SLUG);
  }
}

// Cached read of the park's menu.json for the public page. Cache is invalidated
// on every save via revalidateTag(MENU_TAG), so it stays fast yet fresh.
export const getMenu = unstable_cache(getMenuFresh, ["menu", PARK_SLUG], {
  tags: [MENU_TAG],
});

export async function saveMenu(menu: Menu): Promise<void> {
  const payload: Menu = { ...menu, park: PARK_SLUG, updatedAt: new Date().toISOString() };
  await put(MENU_PATH, JSON.stringify(payload, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
  revalidateTag(MENU_TAG, "max");
  revalidatePath("/restauration");
  // La home affiche un résumé de la carte (pizzas + prix) tiré du même menu :
  // sans ça, elle resterait figée sur l'ancienne version après une édition.
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

// Uploads a dish/column photo and returns its public Blob URL.
export async function uploadPhoto(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const key = `${PHOTO_PREFIX}${crypto.randomUUID()}.${ext}`;
  const { url } = await put(key, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type || undefined,
  });
  return url;
}

// Best-effort delete of a previously uploaded photo. Only touches our own store;
// ignores public seed paths (e.g. "/images/...") and remote failures.
export async function deletePhoto(url?: string): Promise<void> {
  if (!url || !url.includes(PHOTO_PREFIX)) return;
  try {
    await del(url);
  } catch {
    // A missing blob is fine — the goal (no dangling file) is already met.
  }
}
