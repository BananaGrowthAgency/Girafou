import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion de la carte — Girafou",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "#FFFDF5", fontFamily: "var(--font-nunito)" }}>
      {children}
    </div>
  );
}
