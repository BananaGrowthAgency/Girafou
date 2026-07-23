"use client";

import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";
const RED = "#C0392B";

// Carte « Girafou Plage — Ouistreham ». Données confirmées sur girafou.com
// (F.A.Q) : saison, horaires, fermeture météo. Le parc ne publie pas de tarifs
// pour la plage, d'où le renvoi au téléphone. Réutilisée sur /prix-des-entrees
// et dans les infos pratiques de la home — source unique : pages.prix.beach.
export default function BeachClub({ t }: { t: Dictionary["pages"]["prix"]["beach"] }) {
  return (
    <div
      className="rounded-3xl overflow-hidden shadow-xl border-2"
      style={{ borderColor: "#4FC3E8", background: "linear-gradient(135deg, #E3F5FB 0%, #FFF8E1 100%)" }}
    >
      <div className="px-6 sm:px-8 py-6 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #29B6D8, #4FC3E8)" }}>
        <span className="text-3xl" aria-hidden="true">🏖️</span>
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight" style={{ fontFamily: BALOO }}>
            {t.title}
          </h3>
          <p className="text-white/90 text-sm font-bold" style={{ fontFamily: NUNITO }}>{t.season}</p>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid gap-5 sm:grid-cols-2">
        <Row icon="🕚" label={t.hoursLabel} value={t.hours} note={t.weather} />
        <Row icon="🎪" label={t.activitiesLabel} value={t.activities} />
        <Row icon="📍" label={t.addressLabel} value={t.address} />
        <Row icon="🎟️" label={t.priceLabel} value={t.priceNote}>
          <a
            href="tel:0231537268"
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-extrabold shadow-md hover:-translate-y-0.5 transition-all"
            style={{ background: RED, fontFamily: NUNITO }}
          >
            📞 {t.call}
          </a>
        </Row>
      </div>
    </div>
  );
}

/* Ligne : icône + libellé + valeur (+ note ou action optionnelle). */
function Row({
  icon,
  label,
  value,
  note,
  children,
}: {
  icon: string;
  label: string;
  value: string;
  note?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex-shrink-0 text-2xl" aria-hidden="true">{icon}</span>
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: "#1B7A94", fontFamily: NUNITO }}>{label}</p>
        <p className="text-sm sm:text-[15px] font-bold text-amber-900/85 leading-snug" style={{ fontFamily: NUNITO }}>{value}</p>
        {note && <p className="text-xs text-amber-800/60 leading-snug mt-0.5" style={{ fontFamily: NUNITO }}>{note}</p>}
        {children}
      </div>
    </div>
  );
}
