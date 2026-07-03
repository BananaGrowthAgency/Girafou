"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../auth-actions";

const initial: LoginState = { error: null };

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(login, initial);

  return (
    <main
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: "#FFFDF5", fontFamily: "var(--font-nunito)" }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🦒</div>
          <h1
            className="text-3xl font-extrabold text-amber-900"
            style={{ fontFamily: "var(--font-baloo)" }}
          >
            Espace gérant
          </h1>
          <p className="text-sm text-amber-800/60 mt-1">Gérez la carte de votre parc</p>
        </div>

        <form
          action={action}
          className="bg-white rounded-3xl shadow-md border border-amber-100 p-6 flex flex-col gap-4"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-amber-900">Mot de passe</span>
            <input
              type="password"
              name="password"
              autoFocus
              required
              className="rounded-xl border border-amber-200 px-4 py-3 text-base outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              placeholder="••••••••"
            />
          </label>

          {state.error && (
            <p className="text-sm font-semibold text-red-600" role="alert">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-1 rounded-xl px-4 py-3 text-white font-extrabold text-base shadow-sm transition-transform active:scale-[0.98] disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #FF5722, #F5A623)", fontFamily: "var(--font-baloo)" }}
          >
            {pending ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </main>
  );
}
