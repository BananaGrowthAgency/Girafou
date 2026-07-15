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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://girafou.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Girafou — La plaine de jeux préférée des enfants près de Caen",
  description:
    "1 300 m² de jeux couverts près de Caen : toboggans, trampolines, hélicoptères, karting, NeoXperience et bien plus ! Ouvert toute l'année à Bénouville.",
  keywords: ["parc de jeux", "enfants", "Caen", "Normandie", "indoor", "anniversaire", "activités"],
  // Pas de title/description ici : chaque page fournit les siens (og:title / og:description
  // héritent alors du titre/description de la page). Image OG : app/opengraph-image.jpg.
  openGraph: {
    siteName: "Girafou",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
