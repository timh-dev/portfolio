Modular Grid Page started as a personal need: a browser homepage that actually showed the things I wanted to see, without being a dashboard designed for someone else. It became a project in its own right when the solar graph and image shader system turned out to be more interesting than the homepage around them.

## Architecture

The page is a responsive tile grid. Column count adjusts to viewport width; tile size is a user-controlled slider. Every tile, theme, and data source is configured through an in-app settings panel — no config file to edit by hand. Settings are persisted in IndexedDB with a localStorage mirror and can be exported as a timestamped JSON backup.

## The Solar Graph

The solar graph is the most technically interesting piece. It renders a Canvas 2D arc showing the sun's elevation angle from midnight to midnight at your location, calculated using NOAA Solar Calculator equations derived from Jean Meeus's *Astronomical Algorithms*.

The math computes:
- Solar declination from day of year
- The equation of time (Spencer 1971 approximation, accurate to ~30 seconds)
- Hour angle and elevation at any local time
- Twilight crossings (civil, nautical, astronomical) by scanning for zero-crossings in the pre-computed elevation curve

On mount, the sun sweeps from midnight to the current time. Hovering scrubs to any hour and shows a tooltip with elevation angle and nearby twilight events.

## Image Shaders

Photo tiles can apply GPU-accelerated filter effects via WebGL shaders from [Paper Design](https://shaders.paper.design): halftone dots, halftone CMYK, fluted glass, paper texture, water, and image dithering. Each filter is applied per-tile and cached so return visits show the filtered image immediately.

## Tech

React 18, Vite, Tailwind CSS v4, Radix UI, kbar (command palette), Paper Design Shaders. Images fetched from Unsplash API with fallback to Wikimedia. Weather from OpenWeatherMap API. Both API keys are optional.
