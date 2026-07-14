import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NosOffres from "@/components/NosOffres";

export const metadata: Metadata = {
  title: "Nos offres — tarifs, groupes, CSE & privatisation | Girafou",
  description:
    "Tarifs des entrées, offres groupes et centres de loisirs, formules CSE et privatisation du parc : découvrez toutes les offres de Girafou, parc de jeux couvert près de Caen.",
};

export default function NosOffresPage() {
  return (
    <>
      <Navbar />
      <main>
        <NosOffres />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
