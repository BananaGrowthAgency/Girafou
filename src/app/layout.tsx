import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Girafou — La plaine de jeux préférée des enfants près de Caen",
  description:
    "1 300 m² de jeux couverts près de Caen : toboggans, trampolines, hélicoptères, karting, NeoXperience et bien plus ! Ouvert toute l'année à Bénouville.",
  keywords: ["parc de jeux", "enfants", "Caen", "Normandie", "indoor", "anniversaire", "activités"],
  openGraph: {
    title: "Girafou — Parc de jeux indoor près de Caen",
    description: "1 300 m² de jeux couverts pour les enfants de 2 à 12 ans.",
    url: "https://girafou.com",
    siteName: "Girafou",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${baloo.variable} ${nunito.variable} min-h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
