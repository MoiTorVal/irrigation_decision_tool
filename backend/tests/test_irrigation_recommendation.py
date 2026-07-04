from datetime import date
from decimal import Decimal

from backend import crud
from backend.enums import StressSeverity
from backend.schemas import AquaCropOutputBase, FarmCreate, IrrigationEventCreate

AS_OF = date(2026, 6, 8)
POLYGON_WKT = "POLYGON ((-120.5 36.5, -120.4 36.5, -120.4 36.6, -120.5 36.6, -120.5 36.5))"


def _stress(db, farm_id, severity, depletion="30.00", days_to_stress=2):
    crud.upsert_aquacrop_output(db, farm_id, AquaCropOutputBase(
        as_of_date=AS_OF,
        depletion_mm=Decimal(depletion) if depletion is not None else None,
        root_zone_moisture_pct=Decimal("55.00"),
        severity=severity,
        days_to_stress=days_to_stress,
        paw_mm=Decimal("80.00"),
        raw_threshold_mm=Decimal("76.00"),
    ))


def _farm(db, user_id, **fields):
    return crud.create_farm(
        db, FarmCreate(name="Rec Farm", **fields), user_id=user_id
    )


# ── amount math ──────────────────────────────────────────────────────────────


def test_yellow_farm_with_acreage_gets_gallons(client, db, user):
    farm = _farm(db, user.id, acreage_acres=10)
    _stress(db, farm.id, StressSeverity.YELLOW)

    body = client.get(f"/farms/{farm.id}/irrigation-recommendation").json()
    assert body["irrigation_needed"] is True
    assert body["severity"] == "yellow"
    assert body["days_to_stress"] == 2
    # 30 mm × 10 ac × (27,154 gal/ac-in ÷ 25.4 mm/in) = 320,716.5 → 320,717
    assert body["recommended_gallons"] == "320717"
    assert body["acres_used"] == "10.00"
    assert body["acres_source"] == "profile"
    # no runtime-mode log yet — no pump estimate
    assert body["pump_gpm"] is None
    assert body["est_pump_hours"] is None


def test_pump_hours_use_latest_logged_gpm(client, db, user):
    farm = _farm(db, user.id, acreage_acres=10)
    _stress(db, farm.id, StressSeverity.RED, days_to_stress=0)
    crud.create_irrigation_event(db, farm.id, IrrigationEventCreate(
        event_date=date(2026, 6, 1), gallons_applied=Decimal("60000"),
        hours_run=Decimal("2"), pump_gpm=Decimal("500"),
    ))
    crud.create_irrigation_event(db, farm.id, IrrigationEventCreate(
        event_date=date(2026, 6, 5), gallons_applied=Decimal("30000"),
        hours_run=Decimal("2"), pump_gpm=Decimal("250"),
    ))

    body = client.get(f"/farms/{farm.id}/irrigation-recommendation").json()
    assert body["pump_gpm"] == "250.00"
    # 320,717 gal ÷ (250 gal/min × 60 min/h) = 21.38 h → 21.4
    assert body["est_pump_hours"] == "21.4"


def test_polygon_area_backfills_missing_acreage(client, db, user):
    farm = _farm(db, user.id, field_polygon=POLYGON_WKT)
    _stress(db, farm.id, StressSeverity.YELLOW)

    body = client.get(f"/farms/{farm.id}/irrigation-recommendation").json()
    assert body["acres_source"] == "polygon"
    # 0.1° × 0.1° at ~36.5°N is roughly 24,500 acres — sanity band, not exact
    assert 20_000 < Decimal(body["acres_used"]) < 30_000
    assert body["recommended_gallons"] is not None


def test_profile_acreage_wins_over_polygon(client, db, user):
    farm = _farm(db, user.id, acreage_acres=10, field_polygon=POLYGON_WKT)
    _stress(db, farm.id, StressSeverity.YELLOW)

    body = client.get(f"/farms/{farm.id}/irrigation-recommendation").json()
    assert body["acres_source"] == "profile"
    assert body["acres_used"] == "10.00"


# ── nothing to prescribe ─────────────────────────────────────────────────────


def test_green_farm_needs_no_irrigation(client, db, user):
    farm = _farm(db, user.id, acreage_acres=10)
    _stress(db, farm.id, StressSeverity.GREEN, days_to_stress=9)

    body = client.get(f"/farms/{farm.id}/irrigation-recommendation").json()
    assert body["irrigation_needed"] is False
    assert body["recommended_gallons"] is None
    assert body["est_pump_hours"] is None
    assert body["days_to_stress"] == 9


def test_no_area_known_gives_no_gallons(client, db, user):
    farm = _farm(db, user.id)
    _stress(db, farm.id, StressSeverity.YELLOW)

    body = client.get(f"/farms/{farm.id}/irrigation-recommendation").json()
    assert body["irrigation_needed"] is True
    assert body["acres_used"] is None
    assert body["acres_source"] is None
    assert body["recommended_gallons"] is None
    assert body["depletion_mm"] == "30.00"  # UI can still show refill depth


def test_null_depletion_gives_no_gallons(client, db, user):
    farm = _farm(db, user.id, acreage_acres=10)
    _stress(db, farm.id, StressSeverity.YELLOW, depletion=None)

    body = client.get(f"/farms/{farm.id}/irrigation-recommendation").json()
    assert body["irrigation_needed"] is True
    assert body["recommended_gallons"] is None


# ── access control / availability ────────────────────────────────────────────


def test_404_before_first_assessment(client, farm):
    response = client.get(f"/farms/{farm.id}/irrigation-recommendation")
    assert response.status_code == 404


def test_404_unknown_farm(client):
    response = client.get("/farms/9999/irrigation-recommendation")
    assert response.status_code == 404


def test_unauthenticated_401(unauthed_client, farm):
    response = unauthed_client.get(f"/farms/{farm.id}/irrigation-recommendation")
    assert response.status_code == 401
