import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ImpactPage from "./page";
import { renderWithIntl } from "../test-utils";
import { getImpactStats, type ImpactStats } from "../lib/api";

vi.mock("../lib/api", () => ({
  getImpactStats: vi.fn(),
}));

const mockGetStats = vi.mocked(getImpactStats);

const BASE_STATS: ImpactStats = {
  snapshot_date: "2026-07-01",
  total_farms: 12,
  farms_green: 8,
  farms_yellow: 3,
  farms_red: 1,
  total_gallons_saved: 250000,
  total_kwh_saved: 140,
  total_co2_kg_saved: 32,
  computed_at: "2026-07-01T09:00:00Z",
};

describe("ImpactPage alert precision", () => {
  it("shows the accuracy card when precision is available", async () => {
    mockGetStats.mockResolvedValue({
      ...BASE_STATS,
      alerts_feedback_yes: 8,
      alerts_feedback_no: 4,
      alert_precision_pct: 66.7,
    });
    renderWithIntl(<ImpactPage />);

    expect(await screen.findByTestId("alert-precision")).toHaveTextContent(
      "66.7%",
    );
    expect(
      screen.getByText(
        "8 of 12 farmers who replied to an alert text said their field did need water",
      ),
    ).toBeInTheDocument();
  });

  it("hides the card while precision is null (no feedback yet)", async () => {
    mockGetStats.mockResolvedValue({
      ...BASE_STATS,
      alerts_feedback_yes: 0,
      alerts_feedback_no: 0,
      alert_precision_pct: null,
    });
    renderWithIntl(<ImpactPage />);

    await screen.findByText("12 farms monitored");
    expect(screen.queryByTestId("alert-precision")).not.toBeInTheDocument();
  });

  it("tolerates older backends that omit the precision fields", async () => {
    mockGetStats.mockResolvedValue(BASE_STATS);
    renderWithIntl(<ImpactPage />);

    await screen.findByText("12 farms monitored");
    expect(screen.queryByTestId("alert-precision")).not.toBeInTheDocument();
  });
});
