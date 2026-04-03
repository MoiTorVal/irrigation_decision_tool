from backend.services.et0_forecast import _compute_ra, forecast_et0

def test_ra_equator_equinox():
    """Ra at equator on spring equinox should be ~36-38 MJ/m²/day"""
    ra = _compute_ra(latitude_deg=0.0, day_of_year=80)
    assert 36 < ra < 38

def test_ra_higher_latitude_less_in_winter():
    """Higher latitudes get less Ra in winter"""
    ra_equator = _compute_ra(latitude_deg=0.0, day_of_year=355)
    ra_north = _compute_ra(latitude_deg=50.0, day_of_year=355)
    assert ra_north < ra_equator

def test_forecast_et0_known_values():
    """Plug in known values and check reasonable range"""
    days = [{"date": "2026-07-01", "t_max_c": 35, "t_min_c": 20}]
    result = forecast_et0(days, latitude_deg=35.0)
    assert 4 < result < 10  # reasonable ET0 range for hot summer day

def test_forecast_et0_empty_list():
    result = forecast_et0([], latitude_deg=35.0)
    assert result == 0.0
