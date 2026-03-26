# Halal Restaurant Finder Finland 🇫🇮

A React web application to discover halal restaurants across Finland on an interactive map.

## Features

- **Interactive Map** – React Leaflet map centered on Finland with color-coded pins per cuisine
- **Real Data** – Fetched directly from a published Google Sheet CSV using the native `fetch` API
- **Search & Filter** – Search by name or city; filter by cuisine type; both work simultaneously
- **Restaurant Detail Panel** – Click any pin or card for full details: name, address, hours, halal status, website
- **Near Me** – Geolocation API to find and sort the closest restaurants
- **Cuisine-coloured pins** – Each cuisine type gets a unique marker color
- **Halal badges** – "Verified Halal" vs "Halal Options" shown on every card
- **Fully Responsive** – Works on mobile and desktop

## Tech Stack

| Tool | Purpose |
|------|---------|
| React + Vite | Frontend framework and build tool |
| React Leaflet | Interactive map rendering |
| CartoDB Tiles | Clean, minimal map tiles |
| Google Sheets CSV | Data source (fetched in browser) |
| Plain CSS | Styling (no Tailwind dependency) |

## Project Structure

```
src/
├── components/
│   ├── CuisineFilter.jsx   – Cuisine chip buttons
│   ├── MapView.jsx         – Leaflet map + markers + zoom
│   ├── RestaurantCard.jsx  – Card in the sidebar list
│   ├── RestaurantDetail.jsx – Detail panel (map overlay)
│   ├── SearchBar.jsx       – Search input
│   └── Sidebar.jsx         – Left panel container
├── hooks/
│   └── useRestaurants.js   – Custom hook: fetch + parse CSV, loading/error state
├── utils/
│   ├── distance.js         – Haversine formula, cuisine colors/images
│   └── sheetParser.js      – CSV → JS objects parser
├── App.jsx                 – Root component, state management
├── index.css               – All styles
└── main.jsx                – React entry point
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

## Deployment (Railway)

1. Push the repo to GitHub
2. Create a new Railway project and connect the GitHub repo
3. Railway auto-detects Vite — add a build command: `npm run build`
4. Set start command to: `npx serve dist`
5. Done — Railway will give you a live URL

## Notes

- If the Google Sheet CSV is unavailable, the app falls back to built-in sample data covering Helsinki, Tampere, Turku, Jyväskylä, Oulu, and Espoo.
- Restaurant images are sourced from Unsplash (free-to-use photos, mapped by cuisine type).
- Static placeholder values (e.g. ratings) are used where the Sheet doesn't provide that data.
