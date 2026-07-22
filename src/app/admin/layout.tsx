import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Gestion de la carte — Girafou",
  robots: { index: false, follow: false },
};

// Second root layout : /admin vit hors de [lang] (jamais traduit), il porte donc
// ses propres balises <html>/<body>. Voir « multiple root layouts » dans la doc.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${fontVariables} min-h-full antialiased`}>
        <div className="min-h-screen" style={{ background: "#FFFDF5", fontFamily: "var(--font-nunito)" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
