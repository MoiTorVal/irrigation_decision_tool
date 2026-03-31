from dataclasses import dataclass
from typing import Optional, Any
import math 

# Crop coefficients (Kc) by growth stage - FAO-56 Table 12
KC_TABLE = {
    "tomato":  {"initial": 0.6,  "mid": 1.15, "late": 0.8},
    "wheat":   {"initial": 0.3,  "mid": 1.15, "late": 0.4},
    "maize":   {"initial": 0.3,  "mid": 1.20, "late": 0.6},
    "grapes":  {"initial": 0.3,  "mid": 0.85, "late": 0.45},
    "almonds": {"initial": 0.40, "mid": 0.90, "late": 0.65},
    "default": {"initial": 0.5,  "mid": 1.00, "late": 0.75},
}

DEPLETION_FRACTION = {
    "tomato": 0.4,
    "wheat": 0.55,
    "maize": 0.55,
    "grapes": 0.45,
    "almonds": 0.40,
    "default": 0.50,
}

VALID_STAGES = ("initial", "mid", "late")

@dataclass
class WaterBalanceResult:
    current_depletion_mm: float
    paw_mm: float
    raw_threshold_mm: float
    stress_in_days: Optional[int]
    warning: bool
    severity: str


def _get_kc(crop_type, growth_stage):
    crop = (crop_type or "default").strip().lower()
    stage = (growth_stage or "mid").strip().lower()
    kc_row = KC_TABLE.get(crop, KC_TABLE["default"])
    if stage not in VALID_STAGES: 
        stage = "mid"
    return kc_row[stage]

def _get_depletion_fraction(crop_type):
    crop = (crop_type or "default").strip().lower()
    return DEPLETION_FRACTION.get(crop, DEPLETION_FRACTION["default"])

def _compute_paw(field_capacity_pct, wilting_point_pct, root_depth_mm):
    return (field_capacity_pct - wilting_point_pct) / 100 * root_depth_mm

def _classify_severity(depletion_mm, raw_mm, paw_mm):
    if depletion_mm >= paw_mm :
        return "high"
    elif depletion_mm >= raw_mm:
        return "medium"
    elif depletion_mm >= raw_mm * 0.75:
        return "low"
    
    return "None"
        
def compute_water_balance(farm, weather_reading, soil_moisture_reading=None, et0_forecast_mm_per_day=None):
    fc = float(farm.field_capacity or 30.0)
    wp = float(farm.wilting_point or 15.0)
    root_depth = float(farm.root_depth or 60.0)

    paw_mm = _compute_paw(fc, wp, root_depth)
    p = _get_depletion_fraction(farm.crop_type)
    raw_mm = paw_mm * p
    kc = _get_kc(farm.crop_type, farm.growth_stage)

    if soil_moisture_reading is not None:
        sm_pct = float(soil_moisture_reading.soil_moisture or fc)
        depletion_mm = (fc - sm_pct) / 100.0 * root_depth 

    elif weather_reading:
        cumulative = 0.0
        for reading in weather_reading:
            et0 = float(reading.et0.mm or 0.0)
            rain = float(reading.rainfall_mm or 0.0)
            cumulative += (et0 * kc) - rain
            cumulative = max(0.0, min(cumulative, paw_mm))
            depletion_mm = cumulative
    else:
        depletion_mm = 0.0

    stress_in_days = None
    if et0_forecast_mm_per_day is not None and et0_forecast_mm_per_day > 0: 
        daily_etc = et0_forecast_mm_per_day * kc
        remaining_buffer = raw_mm - depletion_mm
        if remaining_buffer <= 0:
            stress_in_days = 0
        else:
            stress_in_days = math.ceil(remaining_buffer / daily_etc)
            
    severity = _classify_severity(depletion_mm, raw_mm, paw_mm)

    return WaterBalanceResult(
        current_depletion_mm=round(depletion_mm, 2),
        paw_mm=round(paw_mm, 2),
        raw_threshold_mm=round(raw_mm, 2),
        stress_in_days=stress_in_days,
        warning=severity != "None",
        severity=severity
    )

if __name__ == "__main__":
    from types import SimpleNamespace

    def run(label, farm, weather=None, soil_moisture=None, et0_forecast=None):
        result = compute_water_balance(farm, weather, soil_moisture, et0_forecast)
        print(f"\n--- {label} ---")
        print(f"  PAW:        {result.paw_mm} mm")
        print(f"  RAW:        {result.raw_threshold_mm} mm")
        print(f"  Depletion:  {result.current_depletion_mm} mm")
        print(f"  Severity:   {result.severity}")
        print(f"  Warning:    {result.warning}")
        print(f"  Stress in:  {result.stress_in_days} days")

    tomato_farm = SimpleNamespace(
        crop_type="tomato", growth_stage="mid",
        field_capacity=30.0, wilting_point=15.0, root_depth=600.0
    )

    # 1. No stress — soil moisture near field capacity
    run(
        "Tomato | sensor | no stress",
        tomato_farm,
        soil_moisture=SimpleNamespace(soil_moisture=29.0),
        et0_forecast=5.0,
    )

    # 2. Medium stress — soil moisture at RAW threshold
    run(
        "Tomato | sensor | medium stress",
        tomato_farm,
        soil_moisture=SimpleNamespace(soil_moisture=24.0),
        et0_forecast=5.0,
    )

    # 3. High stress — soil at wilting point
    run(
        "Tomato | sensor | high stress",
        tomato_farm,
        soil_moisture=SimpleNamespace(soil_moisture=15.0),
        et0_forecast=5.0,
    )

    # 4. Weather-only path — 5 days of ET0=6, no rain
    weather_readings = [
        SimpleNamespace(et0=SimpleNamespace(mm=6.0), rainfall_mm=0.0)
        for _ in range(5)
    ]
    run(
        "Tomato | weather only | 5 dry days",
        tomato_farm,
        weather=weather_readings,
        et0_forecast=5.0,
    )