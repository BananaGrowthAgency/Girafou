import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contactez-nous | Girafou",
  description:
    "Une question, un anniversaire ou une demande de groupe ? Contactez le parc de jeux couvert Girafou à Bénouville, près de Caen.",
};

export default function ContactezNousPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactForm />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
