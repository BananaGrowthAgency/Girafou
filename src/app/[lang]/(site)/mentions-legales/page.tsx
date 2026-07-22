import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { alternates } from "@/lib/i18n/seo";

export function generateMetadata(): Metadata {
  return {
  title: "Mentions légales | Girafou",
  description: "Mentions légales du site Girafou : éditeur, hébergeur et directeur de publication.",
    // Page française uniquement : pas d'alternate anglais (la version
    // n'existe pas), seulement le canonical français.
    alternates: alternates("fr", "/mentions-legales"),
  };
}

const sections: LegalSection[] = [
  {
    heading: "Éditeur",
    paragraphs: [
      "Conformément aux dispositions de l'article 6 III-1 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, nous vous informons que le site www.girafou.com est édité par l'enseigne Girafou.",
      "Pour joindre le directeur de la publication du site :\nTéléphone : 02 31 53 72 68\nCourriel : contact@girafou.com",
    ],
  },
  {
    heading: "Réalisation & hébergement",
    paragraphs: [
      "Ce site est réalisé et hébergé par la société :\nKORUM SOFTWARE — agence de création de site Internet\n22 Rue Louis Blériot\n16600 Magnac sur Touvre\nTéléphone : 05 17 20 60 61\nwww.korum-software.fr",
      "KORUM Software assurant le stockage direct et permanent de ce site Internet.",
    ],
  },
  {
    heading: "Loi applicable",
    paragraphs: ["Le contenu de ce site est régi par la loi française."],
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main>
        <LegalPage
          title="Mentions"
          highlight="légales"
          subtitle="Éditeur, hébergeur et informations sur le site girafou.com."
          sections={sections}
        />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
