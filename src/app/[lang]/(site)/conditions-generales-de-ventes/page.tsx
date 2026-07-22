import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { alternates } from "@/lib/i18n/seo";

export function generateMetadata(): Metadata {
  return {
  title: "Conditions générales de vente | Girafou",
  description: "Conditions générales de vente du parc Girafou : commande, paiement, exécution de la prestation, rétractation et litiges.",
    // Page française uniquement : pas d'alternate anglais (la version
    // n'existe pas), seulement le canonical français.
    alternates: alternates("fr", "/conditions-generales-de-ventes"),
  };
}

const sections: LegalSection[] = [
  {
    paragraphs: [
      "Nous proposons les présentes conditions générales de vente à nos clients, qui les acceptent avant de passer commande.",
      "Elles sont par ailleurs conformes à un certain nombre de règles imposées par la loi, notamment la loi Hamon entrée en vigueur le 14 juin 2014.",
    ],
  },
  {
    heading: "Article 1 — Identification",
    paragraphs: [
      "Le prestataire : GIRAFOU — SBS au capital de 7 500 euros.\nSiège social : Rue de la Plaine, 14970 Bénouville.\nTéléphone : 02 31 53 72 68\nCourriel : contact@girafou.com\nRCS de Caen n°483 227 179.",
    ],
  },
  {
    heading: "Article 2 — Objet",
    paragraphs: [
      "Les présentes conditions détaillent les droits et obligations de la société GIRAFOU SBS et de son client dans le cadre de la vente d'une prestation pour l'organisation d'anniversaires ou plus généralement d'évènements dans le parc GIRAFOU SBS.",
      "Ces conditions s'appliquent à l'exclusion de toutes autres conditions.",
    ],
  },
  {
    heading: "Article 3 — Prix",
    paragraphs: [
      "Les prix de nos prestations sont indiqués en euros toutes taxes comprises.",
      "Ils sont modifiables à tout moment sans préavis, sachant que les prestations seront facturées sur la base des tarifs en vigueur à l'enregistrement de la commande. Toutes les commandes, quelle que soit leur origine, sont payables en euros.",
    ],
  },
  {
    heading: "Article 4 — Commande",
    paragraphs: [
      "Vous pouvez passer commande :\n• Sur Internet : girafou.com\n• Par téléphone au 02 31 53 72 68 ou sur place (jours d'ouverture au public).",
      "Les informations contractuelles sont présentées en langue française et feront l'objet d'une confirmation au plus tard au moment de la validation de votre commande. La société GIRAFOU SBS se réserve le droit de ne pas enregistrer un paiement et de ne pas confirmer une commande pour quelque raison que ce soit.",
      "Toute commande figurant sur le site girafou.com suppose l'adhésion aux présentes Conditions Générales. Toute confirmation de commande entraîne votre adhésion pleine et entière aux présentes conditions générales de vente, sans exception ni réserve. L'ensemble des données fournies et la confirmation enregistrée vaudront preuve de la transaction.",
      "Un récapitulatif des informations de votre commande et des présentes Conditions Générales vous sera communiqué en format PDF via l'adresse e-mail de confirmation de votre commande.",
    ],
  },
  {
    heading: "Article 5 — Paiement",
    paragraphs: [
      "Le fait de valider votre commande vous engage à régler un acompte d'un montant de 30 €, pour bloquer votre réservation.",
      "Le règlement de vos achats s'effectue par carte bancaire grâce au système sécurisé CYBERPLUS de la Banque Populaire. D'éventuelles modifications peuvent être apportées avant le règlement du solde de la prestation.",
      "Celle-ci doit être soldée dans son intégralité au plus tard le jour de la date fixée de la prestation. Pour cela, le client peut soit venir au parc, soit effectuer son règlement par internet (uniquement par carte bancaire). Le débit des cartes bancaires s'effectue à la date d'enregistrement de la commande.",
    ],
  },
  {
    heading: "Article 6 — Exécution de la prestation",
    paragraphs: [
      "La prestation est réalisée à la date fixée, selon les conditions définies lors du règlement du solde. Le nombre d'enfants détermine le choix et la capacité du lieu de la prestation. En cas de modification du nombre d'enfants lors du solde, GIRAFOU SBS ne peut garantir que le lieu réservé initialement soit adéquat, mais s'engage à faire tout son possible pour gérer ces éventuelles modifications.",
      "La nourriture et les boissons personnelles sont interdites au sein du parc.",
    ],
  },
  {
    heading: "Article 7 — Droit de rétractation",
    paragraphs: [
      "Article L221-18 du code de la consommation. Le consommateur dispose d'un délai de 14 (quatorze) jours francs pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités, à l'exception, le cas échéant, des frais de retour.",
      "Pour exercer votre droit de rétractation, vous devez nous notifier votre décision au moyen d'une déclaration écrite dénuée d'ambiguïté par courrier ou courriel, à l'attention de : GIRAFOU SBS — Rue de la Plaine, 14970 Bénouville.",
      "Modèle de rétractation :\n— Numéro de commande :\n— Commandé le … / Reçu le …\n— Nom du consommateur :\n— Adresse du consommateur :\n— Numéro de téléphone :\n— Date :\n— Signature du consommateur",
      "Lorsque le droit de rétractation est exercé, le professionnel est tenu de rembourser sans délai le consommateur et au plus tard dans les trente jours suivant la date à laquelle ce droit a été exercé.",
    ],
  },
  {
    heading: "Article 8 — Droit applicable en cas de litiges",
    paragraphs: [
      "La langue du présent contrat est la langue française. Les présentes conditions de vente sont soumises à la loi française. En cas de litige, les tribunaux français seront les seuls compétents.",
    ],
  },
  {
    heading: "Article 9 — Propriété intellectuelle",
    paragraphs: [
      "Tous les éléments du site girafou.com sont et restent la propriété intellectuelle et exclusive de la société GIRAFOU SBS. Nul n'est autorisé à reproduire, exploiter, rediffuser, ou utiliser à quelque titre que ce soit, même partiellement, des éléments du site qu'ils soient logiciels, visuels ou sonores. Tout lien simple ou par hypertexte est strictement interdit sans un accord écrit exprès de la société GIRAFOU SBS.",
    ],
  },
  {
    heading: "Article 10 — Données personnelles",
    paragraphs: [
      "La société GIRAFOU SBS se réserve le droit de collecter les informations nominatives et les données personnelles vous concernant. Elles sont nécessaires à la gestion de votre commande, ainsi qu'à l'amélioration des services et des informations que nous vous adressons.",
      "Elles peuvent aussi être transmises aux sociétés qui contribuent à ces relations, telles que celles chargées de l'exécution des services et commandes. Ces informations sont également conservées à des fins de sécurité, afin de respecter les obligations légales et réglementaires.",
      "Conformément à la loi du 6 janvier 1978, vous disposez d'un droit d'accès, de rectification et d'opposition aux informations nominatives et aux données personnelles vous concernant, directement sur le site Internet.",
    ],
  },
  {
    heading: "Article 11 — Archivage & preuve",
    paragraphs: [
      "La société GIRAFOU SBS archivera les bons de commande et les factures sur un support fiable et durable constituant une copie fidèle conformément aux dispositions de l'article 1348 du Code civil. Les registres informatisés de la société GIRAFOU SBS seront considérés par toutes les parties concernées comme preuve des communications, commandes, paiements et transactions intervenus entre les parties.",
    ],
  },
  {
    heading: "Article 12 — Médiateur Tourisme Voyage",
    paragraphs: [
      "Médiateur Tourisme Voyage : Monsieur Jean-Pierre Teyssier\nMTV Médiation Tourisme Voyage\nBP 80 303 — 75823 Paris Cedex 17",
    ],
  },
];

export default function CgvPage() {
  return (
    <>
      <Navbar />
      <main>
        <LegalPage
          title="Conditions générales"
          highlight="de vente"
          subtitle="Commande, paiement, exécution de la prestation, rétractation et litiges."
          badge="CGV"
          sections={sections}
        />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
