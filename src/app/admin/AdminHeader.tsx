import Link from "next/link";
import { logout } from "./auth-actions";

// Shared header for authenticated admin pages (not the login screen).
export default function AdminHeader({ back }: { back?: { href: string; label: string } }) {
  return (
    <header className="sticky top-0 z-30 border-b border-amber-100 bg-[#FFFDF5]/90 backdrop-blur">
      <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
        {back ? (
          <Link href={back.href} className="text-sm font-bold text-amber-800 hover:text-orange-600">
            ← {back.label}
          </Link>
        ) : (
          <span className="text-lg font-extrabold text-amber-900" style={{ fontFamily: "var(--font-baloo)" }}>
            🦒 Ma carte
          </span>
        )}
        <form action={logout}>
          <button
            type="submit"
            className="text-sm font-bold text-amber-700 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-amber-50"
          >
            Déconnexion
          </button>
        </form>
      </div>
    </header>
  );
}
