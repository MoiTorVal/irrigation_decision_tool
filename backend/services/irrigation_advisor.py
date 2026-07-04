"""Turns the latest AquaCrop stress result into an actionable amount.

An alert that says "stress in 2 days" still leaves the farmer doing mental
math. This module answers the follow-up question — "so how much do I put
on?" — by pricing the root-zone depletion across the field area, plus a
pump-runtime estimate when a farmer-logged GPM exists. Pure math, no DB
access: the router supplies the inputs so this stays unit-testable.
"""

from decimal import ROUND_HALF_UP, Decimal

from backend import models
from backend.enums import StressSeverity
from backend.schemas import IrrigationRecommendationResponse

# Matches the frontend's soil.ts constant (1 acre-inch = 27,154 US gallons).
GALLONS_PER_ACRE_INCH = Decimal("27154")
MM_PER_INCH = Decimal("25.4")
GALLONS_PER_ACRE_MM = GALLONS_PER_ACRE_INCH / MM_PER_INCH

_NEEDS_WATER = (StressSeverity.YELLOW, StressSeverity.RED)


def build_recommendation(
    output: models.AquaCropOutput,
    farm: models.Farm,
    polygon_acres: Decimal | None,
    pump_gpm: Decimal | None,
) -> IrrigationRecommendationResponse:
    """polygon_acres is the PostGIS-derived fallback; the farmer-entered
    acreage wins because the drawn boundary is often approximate."""
    if farm.acreage_acres is not None:
        acres, acres_source = farm.acreage_acres, "profile"
    elif polygon_acres is not None:
        acres, acres_source = polygon_acres, "polygon"
    else:
        acres, acres_source = None, None

    needed = output.severity in _NEEDS_WATER

    gallons: Decimal | None = None
    if needed and output.depletion_mm is not None and output.depletion_mm > 0 and acres is not None:
        gallons = (output.depletion_mm * acres * GALLONS_PER_ACRE_MM).quantize(
            Decimal("1"), rounding=ROUND_HALF_UP
        )

    hours: Decimal | None = None
    if gallons is not None and pump_gpm is not None and pump_gpm > 0:
        hours = (gallons / (pump_gpm * 60)).quantize(
            Decimal("0.1"), rounding=ROUND_HALF_UP
        )

    return IrrigationRecommendationResponse(
        farm_id=farm.id,
        as_of_date=output.as_of_date,
        severity=output.severity,
        days_to_stress=output.days_to_stress,
        depletion_mm=output.depletion_mm,
        irrigation_needed=needed,
        recommended_gallons=gallons,
        acres_used=acres,
        acres_source=acres_source,
        pump_gpm=pump_gpm,
        est_pump_hours=hours,
    )
