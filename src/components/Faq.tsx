"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Un segment de texte : texte simple, souligné (u), ou lien (href).
type Seg = { t: string; u?: boolean; href?: string };
// Une ligne = suite de segments. `null` = ligne vide (espacement).
type Line = Seg[] | null;
// `important` = règle du parc, remontée en tête de liste et badgée « À savoir
// avant de venir » : ce sont les deux sujets qui génèrent des réclamations à
// l'accueil quand le visiteur les découvre sur place.
type QA = { q: string; a: Line[]; important?: boolean };

// Contenu repris à l'identique de https://girafou.com/f-a-q/
const faqs: QA[] = [
  {
    q: "Les chaussettes sont-elles indispensables ?",
    important: true,
    a: [
      [{ t: "Les chaussettes pour vos enfants sont OBLIGATOIRES, pour des questions d’hygiène et de sécurité." }],
      [{ t: "Girafou propose ses chaussettes antidérapantes en VENTE à 2,50 € la paire. Elles sont également indispensables pour les adultes souhaitant accompagner les enfants dans les jeux." }],
    ],
  },
  {
    q: "Peut-on venir avec son goûter ou son pique nique ?",
    important: true,
    a: [
      [{ t: "Non, compte-tenu des normes sanitaires, il n’est pas possible de venir avec de la nourriture ou des boissons de l’extérieur." }],
      [{ t: "Notre restaurant vous accueille sur place : pizzas maison, crêpes, gaufres, glaces et boissons." }, { t: " → Voir la carte", href: "/restauration", u: true }],
      null,
      [{ t: "Sont tolérés les aliments pour bébés, ou régime pour enfants présentant des allergies alimentaires." }],
    ],
  },
  {
    q: "Quand Girafou est-il ouvert ?",
    a: [
      [{ t: "Périodes scolaires :", u: true }],
      [{ t: "Mercredi, Samedi, Dimanche et jours fériés de 10h00 à 19h00." }],
      null,
      [{ t: "Vacances scolaires :", u: true }],
      [{ t: "Tous les jours et jours fériés de 10h00 à 19h00." }],
      null,
      [{ t: "Vacances d’été (juillet/août) :", u: true }],
      [{ t: "Tous les jours et jours fériés de 10h00 à 19h00." }],
      null,
      [{ t: "Jours de fermeture exceptionnelle :", u: true }],
      [{ t: "Fermé les 25 Décembre et 1er Janvier." }],
    ],
  },
  {
    q: "Doit-on réserver pour venir chez Girafou ?",
    a: [
      [{ t: "Non, sauf pour les anniversaires (voir plus bas) et les groupes (Accueil de centres de Loisirs, Associations, etc…)." }],
      [{ t: "Compte-tenu des normes de sécurité, l’accès peut être reporté durant les périodes de forte affluence." }],
      [{ t: "Les périodes de forte affluence sont les après-midi de vacances scolaires de Toussaint, Février, Pâques et Juillet/Aout." }],
      [{ t: "De manière générale, une météo dégradée provoque une forte affluence dans le parc." }],
    ],
  },
  {
    q: "Qui paye quoi ? et pour quelle durée de jeu ?",
    a: [
      [{ t: "Girafou propose un seul tarif pour un temps « illimité »." }],
      [{ t: "L’entrée est payante pour les adultes accompagnateurs (2€ par adulte avec 1 boisson offerte)." }],
      [{ t: "→ Cliquez ici pour consulter nos tarifs", href: "/prix-des-entrees", u: true }],
    ],
  },
  {
    q: "Que font les Parents pendant que les enfants jouent ?",
    a: [
      [{ t: "Girafou est un parc de jeux FAMILIAL, les parents ont la possibilité (selon l’affluence) de savourer ce moment de jeux avec leurs enfants." }],
      [{ t: "Un accès WIFI ainsi que des magazines sont mis gratuitement à la disposition des parents." }],
      [{ t: "La cafétéria est bien entendu à la disposition des parents." }],
    ],
  },
  {
    q: "Peut-on venir le matin, partir le temps du déjeuner et revenir ensuite ?",
    a: [
      [{ t: "Non, toute sortie est définitive." }],
      [{ t: "Notre SNACK vous propose des formules pour déjeuner sur place." }],
    ],
  },
  {
    q: "Anniversaire : Comment réserver et combien de temps à l’avance ?",
    a: [
      [{ t: "Vous pouvez réserver votre anniversaire sur le site www.girafou.com." }],
      [{ t: "Vous pouvez également réserver votre anniversaire à l’accueil du Girafou." }],
      [{ t: "Il est conseillé de réserver au moins " }, { t: "2 semaines à l’avance.", u: true }],
    ],
  },
  {
    q: "Quand Girafou Plage est-il ouvert ?",
    a: [
      [{ t: "De mi-Juin à mi-Septembre de 11h00 à 19h00. Sauf en cas de vent violent ou de pluie, le parc de Ouistreham pourra être fermé." }],
    ],
  },
  {
    q: "Peut-on laisser les enfants chez Girafou et aller faire ses courses ?",
    a: [
      [{ t: "Chez Girafou, les enfants doivent TOUJOURS être accompagnés d’un adulte." }],
    ],
  },
  {
    q: "A quel âge les enfants peuvent-ils venir chez Girafou ?",
    a: [
      [{ t: "Les jeux chez Girafou sont accessibles aux enfants âgés de 1 à 12 ans. Un espace de jeux clos et sécurisé est aménagé spécifiquement pour les enfants de 1 à 5 ans." }],
      [{ t: "Les jeux gonflables sont accessibles aux enfants de 4 à 12 ans. Le Grand Labyrinthe est réservé aux enfants de 4 à 12 ans." }],
    ],
  },
  {
    q: "Peut-on accompagner les enfants dans les jeux ?",
    a: [
      [{ t: "Oui, cela est possible selon l’affluence, et sous réserve de porter des chaussettes, sauf dans les structures gonflables qui sont interdites aux adultes." }],
      [{ t: "L’accès aux jeux reste possible à tout moment en cas d’urgence." }],
    ],
  },
  {
    // Aucune information d'accessibilité n'est publiée par le parc : on ne
    // promet donc rien ici, on renvoie vers l'accueil qui pourra répondre
    // précisément selon le besoin de chaque visiteur.
    q: "Le parc est-il accessible aux personnes à mobilité réduite (PMR) ?",
    a: [
      [{ t: "Pour toute question sur les conditions d’accès et d’accueil des personnes à mobilité réduite, contactez-nous avant votre venue : nous vous renseignerons sur ce qu’il est possible de faire selon votre situation." }],
      [{ t: "→ 02 31 53 72 68", href: "tel:0231537268", u: true }],
      [{ t: "→ contact@girafou.com", href: "mailto:contact@girafou.com", u: true }],
    ],
  },
  {
    q: "Quels sont les moyens de paiement acceptés ?",
    a: [
      [{ t: "Vous " }, { t: "pouvez payer", u: true }, { t: " en espèces, carte bleue ou chèques vacances." }],
      [{ t: "Les chèques " }, { t: "ne sont plus acceptés", u: true }, { t: " chez Girafou." }],
    ],
  },
  {
    q: "Anniversaire : Que comprend la prestation ?",
    a: [
      [{ t: "→ Voir la page « Anniversaire »", href: "/anniversaires", u: true }],
    ],
  },
  {
    q: "Accueils de centres de Loisirs, CE, Associations, Entreprises : quelles sont nos formules sur mesure ?",
    a: [
      [{ t: "Pour les « Accueils de centres loisirs », des tarifs spécifiques sont proposés les mercredis ainsi que pendant toutes les vacances scolaires. Pour les « Comités d’Entreprise », Girafou propose de la billetterie ainsi que des formules à la carte pour des Arbres de Noël ou autre événement." }],
    ],
  },
  {
    q: "Une autre question ?",
    a: [
      [{ t: "Vous avez une demande ou une question sur un sujet en particulier ?" }],
      [{ t: "Posez-la nous, nous y répondrons dans les plus bref délais." }],
      null,
      [{ t: "Nous poser une question :" }],
      [{ t: "→ Contactez-nous ici", href: "mailto:contact@girafou.com", u: true }],
    ],
  },
];

function Segment({ s }: { s: Seg }) {
  if (s.href) {
    return (
      <a href={s.href} className="underline text-[#C0392B] hover:text-[#FF5722] transition-colors">
        {s.t}
      </a>
    );
  }
  return <span className={s.u ? "underline" : undefined}>{s.t}</span>;
}

// Chaque item a son propre useInView → cascade réelle au scroll.
function FaqItem({ item, isOpen, onToggle }: { item: QA; isOpen: boolean; onToggle: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group rounded-2xl bg-white overflow-hidden border-2 transition-[border-color,box-shadow] duration-200 ${
        isOpen
          ? "border-[#F5A623]/60 shadow-lg"
          : "border-[#F5A623]/15 shadow-sm hover:border-[#F5A623]/50 hover:shadow-md"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 cursor-pointer transition-colors duration-200 ${
          isOpen ? "bg-[#FFF9EF]" : "group-hover:bg-[#FFF9EF]"
        }`}
      >
        <span className="min-w-0">
          {item.important && (
            <span
              className="inline-block mb-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide text-white"
              style={{ background: "#C0392B", fontFamily: "var(--font-nunito)" }}
            >
              À savoir avant de venir
            </span>
          )}
          <span
            className={`block font-bold text-base sm:text-lg transition-colors duration-200 ${
              isOpen ? "text-[#E8940A]" : "text-[#1C1008] group-hover:text-[#E8940A]"
            }`}
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {item.q}
          </span>
        </span>
        {/* Wrapper (span simple) pour le scale au hover — le motion.span gère la rotation */}
        <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex w-8 h-8 rounded-full items-center justify-center text-white text-xl leading-none shadow-sm"
            style={{ background: isOpen ? "#E8940A" : "var(--giraffe-yellow)" }}
            aria-hidden
          >
            +
          </motion.span>
        </span>
      </button>
      {/* Toujours monté (indexable par les moteurs de recherche), collapsé via height. */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
        aria-hidden={!isOpen}
      >
        <div className="px-5 sm:px-6 pb-5 text-sm sm:text-base leading-relaxed space-y-1" style={{ fontFamily: "var(--font-nunito)", color: "var(--text-muted)" }}>
          {item.a.map((line, li) =>
            line === null ? (
              <div key={li} className="h-3" aria-hidden />
            ) : (
              <p key={li}>
                {line.map((s, si) => (
                  <Segment key={si} s={s} />
                ))}
              </p>
            )
          )}
        </div>
      </motion.div>
    </motion.li>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden spots-pattern" style={{ background: "linear-gradient(to bottom, #FFFDF5 0%, #FFF3D0 100%)" }}>
      <div className="relative max-w-3xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-block text-4xl mb-3" aria-hidden>🦒</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold" style={{ fontFamily: "var(--font-baloo)", color: "var(--giraffe-brown)" }}>
            Foire aux questions
          </h1>
          <p className="mt-4 text-base sm:text-lg" style={{ fontFamily: "var(--font-nunito)", color: "var(--text-muted)" }}>
            Tout ce qu&rsquo;il faut savoir avant votre visite au parc Girafou, près de Caen.
          </p>
        </motion.div>

        {/* Accordion */}
        <ul className="space-y-3">
          {faqs.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </ul>

      </div>
    </section>
  );
}
