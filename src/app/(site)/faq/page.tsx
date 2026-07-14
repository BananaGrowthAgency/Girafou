import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";

export const metadata: Metadata = {
  title: "F.A.Q — vos questions sur le parc | Girafou",
  description:
    "Horaires, tarifs, âges, chaussettes, parking, anniversaires, restauration : retrouvez les réponses à toutes vos questions sur le parc de jeux couvert Girafou, près de Caen.",
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main>
        <Faq />
      </main>
      <Footer waveColor="#FFF3D0" />
    </>
  );
}
