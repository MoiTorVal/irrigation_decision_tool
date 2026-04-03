export interface Farm {
  id: number;
  name: string;
  location: string;
  area_hectares: number | null;
  crop_type: string;
  soil_type: string | null;
  root_depth_cm: number | null;
  growth_stage: string | null;
  planting_date: string | null;
  field_capacity_pct: number | null;
  wilting_point_pct: number | null;
  agronomist_id: number;
  created_at: string;
}

export interface WaterStressResponse {
  depletion_mm: number;
  paw_mm: number;
  raw_threshold_mm: number;
  stress_in_days: number | null;
  warning: string;
  severity: string | null;
}

export interface WeatherReading {
  id: number;
  farm_id: number;
  temperature_c: number;
  humidity_pct: number;
  rainfall_mm: number;
  wind_speed_kph: number;
  et0_mm: number | null;
  recorded_at: string;
}

export interface SoilMoistureReading {
  id: number;
  farm_id: number;
  moisture_pct: number;
  recorded_at: string;
}
