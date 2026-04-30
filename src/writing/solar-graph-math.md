The solar graph in Modular Grid Page renders a Canvas 2D arc showing the sun's elevation angle from midnight to midnight. It marks twilight thresholds, places the sun on the curve at the current time, and lets you scrub through any moment in the day by moving your cursor. All of the position math follows the NOAA Solar Calculator equations, derived from Jean Meeus's *Astronomical Algorithms* (2nd ed.).

## Day of Year

Everything starts with **day of year** (DOY) — an integer from 1 to 365. January 1 is DOY 1. It anchors the two time-varying quantities the rest of the math depends on: declination and the equation of time.

## Solar Declination

Earth's axial tilt causes the sun to appear higher in summer and lower in winter. The angle that describes this shift is called the **solar declination** δ:

```
δ = 23.45° × sin( (360/365) × (DOY − 81) )
```

Subtracting 81 shifts the sine peak to the summer solstice (~June 21, DOY 172) and the trough to the winter solstice (~December 21, DOY 355). The amplitude 23.45° is Earth's axial tilt.

## Equation of Time

The sun does not sweep the sky at a perfectly uniform rate. Earth's elliptical orbit and its axial tilt cause apparent solar noon to drift up to ±16 minutes from clock noon over the year. The **equation of time** (EoT) corrects for this drift:

```
B   = (360/365) × (DOY − 81)    [converted to radians]
EoT = 9.87·sin(2B) − 7.53·cos(B) − 1.5·sin(B)    [minutes]
```

This is the Spencer (1971) approximation, accurate to within about 30 seconds. True solar noon in UTC follows directly:

```
noon_utc = 12 − lng/15 − EoT/60
```

The `lng/15` term converts longitude to hours (Earth rotates 15° per hour). Adding the local timezone offset converts that to local solar noon.

## Sunrise and Sunset

Sunrise and sunset occur when the center of the sun crosses a **standard zenith of 90.833°** — 0.833° above the geometric horizon to account for atmospheric refraction and the sun's angular radius.

The **hour angle** HA at those crossings satisfies:

```
cos(HA) = [ cos(90.833°) − sin(lat) × sin(δ) ] / [ cos(lat) × cos(δ) ]
```

Solving for HA gives the offset from solar noon in degrees. Converting to hours:

```
sunrise = noon_utc − HA/15 + tz_offset
sunset  = noon_utc + HA/15 + tz_offset
```

When `cos(HA)` exceeds the range [−1, 1], the location is experiencing polar day or polar night. The code clamps to this range to avoid `NaN` rather than branching on the special case.

## Sun Elevation at Any Time

For an arbitrary local hour `h`, the sun's **elevation angle** above the horizon is:

```
HA     = 15 × (h − tz_offset − noon_utc)    [degrees]
sin(e) = sin(lat)·sin(δ) + cos(lat)·cos(δ)·cos(HA)
e      = arcsin( sin(e) )
```

The graph evaluates this formula at 500 evenly-spaced points across the 24-hour window on mount, producing the `curveHours` and `curveElevations` arrays. Pre-computing the curve rather than recalculating each frame keeps the render loop cheap.

## Canvas Coordinate Mapping

Elevation in degrees maps to a Y pixel position based on the **annual elevation range**, not just today's. Using annual extremes means the horizon line sits at a consistent vertical position across all seasons — the graph does not jump between summer and winter.

```
horizonFrac = maxAnnualElev / (maxAnnualElev − minAnnualElev)
horizonY    = height × horizonFrac    (clamped to 20%–85%)
```

Above the horizon (elevation ≥ 0):

```
y = horizonY × (1 − elev / maxElev)
```

Below the horizon:

```
y = horizonY + (|elev| / |minElev|) × (height − horizonY)
```

The X axis is simply `hour / 24 × width`, mapping midnight to the left edge and midnight again to the right.

## Twilight Thresholds

The graph marks four twilight events on each side of solar noon by scanning the pre-computed elevation array for **zero-crossings** at specific thresholds:

| Threshold | Event |
|-----------|-------|
| 0° | Sunrise / Sunset |
| −6° | Civil dawn / dusk |
| −12° | Nautical dawn / dusk |
| −18° | Astronomical dawn / dusk |

For each threshold `t`, the scanner walks adjacent elevation pairs and checks for a sign change (one above, one below the threshold). When found, linear interpolation gives the precise crossing hour:

```
frac = (e[i] − t) / (e[i] − e[i+1])
hour = curveHours[i] + frac × (curveHours[i+1] − curveHours[i])
```

Whether `e[i+1] > e[i]` (rising) determines if the event is labeled dawn or dusk.

## The Animation Loop

On mount, a startup sweep animates the sun marker from midnight toward the current local time at a fixed step per interval — the effect of the sun "catching up" to now. After the sweep completes, the current time refreshes on a 60-second interval. The canvas renders at 30 fps while idle and upgrades to 60 fps while the cursor is over the graph. On hover, the X position maps back to a fractional hour and a scrubber tooltip shows the elevation angle and any nearby twilight event for that moment.
