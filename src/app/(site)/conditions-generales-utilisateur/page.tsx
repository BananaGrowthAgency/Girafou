import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation | Girafou",
  description: "Conditions générales d'utilisation du site Girafou : contenu, responsabilité, propriété intellectuelle et liens.",
};

const sections: LegalSection[] = [
  {
    paragraphs: [
      "La navigation sur ce site est soumise aux présentes conditions d'utilisation. En accédant aux informations mises à disposition par Girafou sur son site Internet, vous reconnaissez avoir pris connaissance des présentes conditions d'utilisation et les accepter.",
    ],
  },
  {
    heading: "Contenu du site",
    paragraphs: [
      "Girafou ne peut garantir l'exactitude, la précision, l'actualisation ou l'exhaustivité des informations mises à disposition sur ce site.",
      "En conséquence, nous vous invitons à signaler auprès du service client Girafou les imprécisions, inexactitudes ou omissions portant sur des informations disponibles sur ce site.",
    ],
  },
  {
    heading: "Limitation de responsabilité",
    paragraphs: [
      "Les informations contenues sur le site girafou.com sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes. Les produits ou services tels qu'ils sont décrits sur le site Girafou essaient de traduire le plus fidèlement possible la qualité réelle des prestations de GIRAFOU. Toutefois si vous pensez que cela n'est pas le cas ou que certaines informations peuvent porter à interprétation, nous vous invitons à prendre contact avec le service client GIRAFOU.",
      "La société Girafou ne pourra en aucun cas être tenue pour responsable de tout préjudice, direct ou indirect, que l'utilisation des informations, produits ou services causerait à tout utilisateur du site.",
      "Les présentes conditions sont régies par les lois françaises et toutes contestations ou litiges qui pourraient naître de l'interprétation ou de l'exécution de celles-ci seront de la compétence exclusive du tribunal de commerce dont dépend le siège social de la société Girafou.",
    ],
  },
  {
    heading: "Propriété intellectuelle",
    paragraphs: [
      "Ce site, ainsi que tous les éléments le composant (notamment textes, photographies, vidéos, marques…), constituent une œuvre de l'esprit au sens des articles 112-2 et suivants du code de la Propriété Intellectuelle, relevant en tant que telle de la législation française et internationale sur la Propriété Littéraire et Artistique.",
      "La copie de pages du site sur quelque support que ce soit (y compris disque dur) est autorisée à des fins privées uniquement.",
      "En conséquence, toute représentation ou reproduction, même partielle, qui pourrait être faite du site ou des éléments le composant, à des fins commerciales, sans le consentement préalable et écrit de la société Girafou, est illicite et susceptible de constituer un acte de contrefaçon engageant les responsabilités civile et pénale du contrefacteur.",
    ],
  },
  {
    heading: "Liens hypertextes",
    paragraphs: [
      "Les liens hypertextes mis en place dans le cadre du présent site Internet en direction d'autres sites présents sur le réseau Internet ne sauraient engager la responsabilité de Girafou en ce qui concerne leur contenu ou les liens qu'ils contiennent, ainsi que leurs conditions d'exploitation.",
      "La possibilité d'établir des liens hypertextes simples vers le site www.girafou.com est soumise à l'accord préalable de la société Girafou. Tout lien hypertexte profond, ou utilisant la technique du « framing », est interdit.",
    ],
  },
  {
    heading: "Exonération de la responsabilité technique",
    paragraphs: [
      "Girafou s'engage à faire ses meilleurs efforts pour que le site Internet www.girafou.com soit accessible à tout moment. Néanmoins, Girafou décline toute responsabilité en cas de difficulté d'accès à son site ou d'interruptions dans la connexion, quelles qu'en soient les causes.",
      "Girafou se réserve le droit de procéder à toute modification du site qu'il jugera utile, sans avertissement préalable et même si l'accès au site en est conséquemment interrompu.",
      "Girafou ne saurait être tenu responsable des éventuels dommages directs ou indirects, y compris l'inaccessibilité au site, les pertes de données, détériorations, destructions ou virus qui pourraient affecter votre équipement informatique. Vous reconnaissez avoir vérifié que la configuration informatique utilisée ne contient aucun virus et est en parfait état de fonctionnement.",
    ],
  },
];

export default function CguPage() {
  return (
    <>
      <Navbar />
      <main>
        <LegalPage
          title="Conditions générales"
          highlight="d'utilisation"
          subtitle="Les règles d'utilisation du site girafou.com."
          badge="CGU"
          sections={sections}
        />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
