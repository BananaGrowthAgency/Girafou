import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnniversairesHub from "@/components/AnniversairesHub";

export const metadata: Metadata = {
  title: "Anniversaires enfants près de Caen — Girafou",
  description:
    "Fêtez l'anniversaire de votre enfant chez Girafou, près de Caen : 3 formules tout inclus (gâteau, cadeau, jeux, super boum). À partir de 14,90 € par enfant.",
};

export default function AnniversairesPage() {
  return (
    <>
      <Navbar />
      <main>
        <AnniversairesHub />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
