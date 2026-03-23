import pandas as pd 
import numpy as np 
from backend.models import Farm, WeatherReading


def build_features(weather: WeatherReading, farm: Farm) -> np.ndarray:
    crop_encoded = {"almonds": 0, "grapes": 1}.get(farm.crop_type, 0)
    kc = {"almonds": 1.15, "grapes": 0.85}.get(farm.crop_type, 1.0)
    deficit = (float(weather.et0_mm or 0)) * kc - float(weather.rainfall_mm or 0)

    features = pd.DataFrame({
        "temperature": [float(weather.temperature_c or 0)],
        "humidity": [float(weather.humidity_pct or 0)],
        "wind_speed": [float(weather.wind_speed_kph or 0)],
        "rainfall_mm": [float(weather.rainfall_mm or 0)],
        "et0_mm": [float(weather.et0_mm or 0)],
        "area_hectares": [float(farm.area_hectares or 0)],
        "crop_encoded": [crop_encoded],
        "kc": [kc],
        "deficit": [deficit]
    })
    
    return features.values
