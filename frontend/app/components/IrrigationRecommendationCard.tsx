"use client";

import { useTranslations } from "next-intl";
import type { IrrigationRecommendation } from "../lib/api";

const MM_PER_INCH = 25.4;

/** "So how much do I put on?" — the actionable follow-up to the traffic
 * light. Renders nothing when there is nothing actionable to say. */
export default function IrrigationRecommendationCard({
  rec,
  onLogIrrigation,
  onAddAcreage,
}: {
  rec: IrrigationRecommendation;
  onLogIrrigation: () => void;
  onAddAcreage: () => void;
}) {
  const t = useTranslations("recommendation");
  const inches =
    rec.depletion_mm != null ? rec.depletion_mm / MM_PER_INCH : null;

  if (!rec.irrigation_needed) {
    // Unknown severity: the traffic light already says "no assessment".
    if (rec.severity == null) return null;
    return (
      <section
        data-testid="irrigation-recommendation"
        className="rounded-2xl border border-gray-200 p-6"
      >
        <h2 className="text-sm font-medium text-gray-500">{t("title")}</h2>
        <p className="mt-1 text-lg font-semibold text-gray-900">
          {t("greenHeadline")}
        </p>
        {rec.days_to_stress != null && (
          <p className="mt-1 text-sm text-gray-600">
            {t("daysLine", { days: rec.days_to_stress })}
          </p>
        )}
      </section>
    );
  }

  if (rec.recommended_gallons == null) {
    // Needed, but no gallons: either no field area (fixable — prompt for
    // acreage) or no depletion depth (nothing useful to show).
    if (inches == null) return null;
    return (
      <section
        data-testid="irrigation-recommendation"
        className="rounded-2xl border border-amber-300 bg-amber-50 p-6"
      >
        <h2 className="text-sm font-medium text-gray-500">{t("title")}</h2>
        <p className="mt-1 text-lg font-semibold text-gray-900">
          {t("needAcresHeadline", { inches: inches.toFixed(1) })}
        </p>
        <p className="mt-1 text-sm text-gray-600">{t("needAcresBody")}</p>
        <button
          onClick={onAddAcreage}
          className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          {t("addAcresCta")}
        </button>
      </section>
    );
  }

  return (
    <section
      data-testid="irrigation-recommendation"
      className="rounded-2xl border border-amber-300 bg-amber-50 p-6"
    >
      <h2 className="text-sm font-medium text-gray-500">{t("title")}</h2>
      <p className="mt-1 text-2xl font-bold text-gray-900">
        {t("applyHeadline", {
          gallons: rec.recommended_gallons.toLocaleString(),
        })}
      </p>
      {inches != null && rec.acres_used != null && (
        <p className="mt-1 text-sm text-gray-600">
          {t("refillsLine", {
            inches: inches.toFixed(1),
            acres: rec.acres_used.toLocaleString(),
          })}
        </p>
      )}
      {rec.est_pump_hours != null && rec.pump_gpm != null && (
        <p className="mt-1 text-sm text-gray-600">
          {t("hoursLine", {
            hours: rec.est_pump_hours.toLocaleString(),
            gpm: rec.pump_gpm.toLocaleString(),
          })}
        </p>
      )}
      <p className="mt-2 text-xs text-gray-500">
        {t("netNote")}
        {rec.acres_source === "polygon" && <> {t("polygonNote")}</>}
      </p>
      <button
        onClick={onLogIrrigation}
        className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
      >
        {t("logCta")}
      </button>
    </section>
  );
}
