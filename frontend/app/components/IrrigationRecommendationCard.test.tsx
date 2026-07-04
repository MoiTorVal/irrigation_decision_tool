import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import IrrigationRecommendationCard from "./IrrigationRecommendationCard";
import { renderWithIntl } from "../test-utils";
import type { IrrigationRecommendation } from "../lib/api";

const BASE: IrrigationRecommendation = {
  farm_id: 1,
  as_of_date: "2026-06-08",
  severity: "yellow",
  days_to_stress: 2,
  depletion_mm: 30,
  irrigation_needed: true,
  recommended_gallons: 320717,
  acres_used: 10,
  acres_source: "profile",
  pump_gpm: 250,
  est_pump_hours: 21.4,
};

function renderCard(
  rec: IrrigationRecommendation,
  handlers: Partial<{ onLogIrrigation: () => void; onAddAcreage: () => void }> = {},
) {
  return renderWithIntl(
    <IrrigationRecommendationCard
      rec={rec}
      onLogIrrigation={handlers.onLogIrrigation ?? (() => {})}
      onAddAcreage={handlers.onAddAcreage ?? (() => {})}
    />,
  );
}

describe("IrrigationRecommendationCard", () => {
  it("shows gallons, refill depth, and pump hours when everything is known", () => {
    renderCard(BASE);
    expect(screen.getByText("Apply about 320,717 gal")).toBeInTheDocument();
    expect(
      screen.getByText("Refills 1.2 in of root-zone depletion across 10 ac"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("≈ 21.4 h at 250 GPM, from your last runtime log"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/estimated from your drawn boundary/),
    ).not.toBeInTheDocument();
  });

  it("notes when the area came from the drawn boundary", () => {
    renderCard({ ...BASE, acres_source: "polygon" });
    expect(
      screen.getByText(/estimated from your drawn boundary/),
    ).toBeInTheDocument();
  });

  it("omits the pump line without a logged GPM", () => {
    renderCard({ ...BASE, pump_gpm: null, est_pump_hours: null });
    expect(screen.getByText("Apply about 320,717 gal")).toBeInTheDocument();
    expect(screen.queryByText(/GPM/)).not.toBeInTheDocument();
  });

  it("log-irrigation button fires the handler", async () => {
    const user = userEvent.setup();
    const onLogIrrigation = vi.fn();
    renderCard(BASE, { onLogIrrigation });
    await user.click(screen.getByRole("button", { name: "Log irrigation" }));
    expect(onLogIrrigation).toHaveBeenCalled();
  });

  it("asks for acreage when gallons cannot be computed", async () => {
    const user = userEvent.setup();
    const onAddAcreage = vi.fn();
    renderCard(
      {
        ...BASE,
        recommended_gallons: null,
        acres_used: null,
        acres_source: null,
      },
      { onAddAcreage },
    );
    expect(
      screen.getByText("Refill about 1.2 in of soil water"),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Add acreage" }));
    expect(onAddAcreage).toHaveBeenCalled();
  });

  it("green farms get a calm no-irrigation message with days left", () => {
    renderCard({
      ...BASE,
      severity: "green",
      irrigation_needed: false,
      recommended_gallons: null,
      est_pump_hours: null,
      days_to_stress: 9,
    });
    expect(
      screen.getByText("No irrigation needed right now"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("About 9 days of soil water left"),
    ).toBeInTheDocument();
  });

  it("renders nothing when severity is unknown", () => {
    const { container } = renderCard({
      ...BASE,
      severity: null,
      irrigation_needed: false,
      recommended_gallons: null,
    });
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when needed but depletion depth is unknown", () => {
    const { container } = renderCard({
      ...BASE,
      depletion_mm: null,
      recommended_gallons: null,
    });
    expect(container).toBeEmptyDOMElement();
  });
});
