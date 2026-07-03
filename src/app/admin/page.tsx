import { redirect } from "next/navigation";

// Editing now happens in place on the carte. Reaching /admin (once past the
// login gate in proxy.ts) just bounces the manager to the editable menu.
export default function AdminEntry() {
  redirect("/restauration");
}
