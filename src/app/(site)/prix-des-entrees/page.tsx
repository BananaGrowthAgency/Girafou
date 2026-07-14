import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrixEntrees from "@/components/PrixEntrees";

export const metadata: Metadata = {
  title: "Prix des entrées & horaires | Girafou",
  description:
    "Tarifs des entrées, jetons pour les activités, moyens de paiement et horaires d'ouverture du parc de jeux couvert Girafou, à Bénouville près de Caen.",
};

export default function PrixDesEntreesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PrixEntrees />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
