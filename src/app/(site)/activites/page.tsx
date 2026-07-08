import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActivitesHub from "@/components/ActivitesHub";

export const metadata: Metadata = {
  title: "Activités — parc de jeux couvert près de Caen | Girafou",
  description:
    "Découvrez les 9 activités de Girafou, parc de jeux couvert de 1 300 m² à Bénouville, près de Caen : hélicoptère, karting, trampolines, piscine à balles, labyrinthe, toboggans et plus encore.",
};

export default function ActivitesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ActivitesHub />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
