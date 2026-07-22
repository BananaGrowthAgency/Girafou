"use server";

import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { saveMenu, uploadPhoto, deletePhoto } from "@/lib/menu/store";
import type { Menu } from "@/lib/menu/types";

// In-place editing on the carte. Every action re-checks the session (Server
// Actions are reachable via direct POST, so middleware/proxy alone isn't enough).
async function requireSession(): Promise<void> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) throw new Error("Unauthorized");
}

// Persist the whole menu (the editor holds it in client state and auto-saves).
export async function saveMenuAction(menu: Menu): Promise<void> {
  await requireSession();
  if (!menu || !Array.isArray(menu.categories)) throw new Error("Invalid menu");
  await saveMenu(menu);
}

// Upload a photo, delete the one it replaces (if any), and return the new URL.
export async function uploadPhotoAction(formData: FormData): Promise<string> {
  await requireSession();
  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) throw new Error("No file");
  const url = await uploadPhoto(file);
  const oldUrl = formData.get("oldUrl");
  if (typeof oldUrl === "string") await deletePhoto(oldUrl);
  return url;
}

// Clean up photos of deleted items/categories (best effort).
export async function deletePhotosAction(urls: string[]): Promise<void> {
  await requireSession();
  await Promise.all((urls ?? []).map((u) => deletePhoto(u)));
}
