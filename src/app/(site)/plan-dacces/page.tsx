import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanAcces from "@/components/PlanAcces";

export const metadata: Metadata = {
  title: "Plan d'accès — comment venir | Girafou",
  description:
    "Comment rejoindre le parc de jeux couvert Girafou à Bénouville, près de Caen : itinéraires depuis Ouistreham, Caen et Cabourg, carte et adresse.",
};

export default function PlanAccesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PlanAcces />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
