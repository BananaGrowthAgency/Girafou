"use client";

import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";

// Carte « Girafou Plage — Ouistreham ». Données du flyer officiel : deux périodes
// d'horaires, structures gonflables (1–12 ans), restauration sur place et tarif
// réel (6 € / heure). Réutilisée sur /prix-des-entrees et dans les infos
// pratiques de la home — source unique : pages.prix.beach.
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

      {/* Deux colonnes réparties pour combler le vide à droite : à gauche les
          horaires (détaillés) + le tarif ; à droite les jeux, la restauration et
          l'adresse. */}
      <div className="p-6 sm:p-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="flex flex-col gap-6">
          {/* Horaires — deux périodes distinctes (avant/après le 4 juillet). */}
          <Row icon="🕚" label={t.hoursLabel} note={t.weather}>
            <div className="space-y-1.5">
              {t.hours.map((h, i) => (
                <div key={i}>
                  <p className="text-[13px] font-extrabold text-amber-900/85 leading-snug" style={{ fontFamily: NUNITO }}>{h.when}</p>
                  <p className="text-sm sm:text-[15px] font-bold text-amber-900/70 leading-snug" style={{ fontFamily: NUNITO }}>{h.time}</p>
                </div>
              ))}
            </div>
          </Row>
          <Row icon="🎟️" label={t.priceLabel} value={t.price} />
        </div>
        <div className="flex flex-col gap-6">
          <Row icon="🎪" label={t.activitiesLabel} value={t.activities} />
          <Row icon="🍦" label={t.foodLabel} value={t.food} />
          <Row icon="📍" label={t.addressLabel} value={t.address} />
        </div>
      </div>
    </div>
  );
}

/* Ligne : icône + libellé + valeur (ou contenu libre) + note optionnelle. */
function Row({
  icon,
  label,
  value,
  note,
  children,
}: {
  icon: string;
  label: string;
  value?: string;
  note?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex-shrink-0 text-2xl" aria-hidden="true">{icon}</span>
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: "#1B7A94", fontFamily: NUNITO }}>{label}</p>
        {value && <p className="text-sm sm:text-[15px] font-bold text-amber-900/85 leading-snug" style={{ fontFamily: NUNITO }}>{value}</p>}
        {children}
        {note && <p className="text-xs text-amber-800/60 leading-snug mt-0.5" style={{ fontFamily: NUNITO }}>{note}</p>}
      </div>
    </div>
  );
}
