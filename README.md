# Karibu Tanzania — Tourism Intelligence Platform

An AI concierge and AI trip planner covering **Zanzibar** and mainland
Tanzania. The itinerary planner actively routes trips across Zanzibar and the
**northern safari circuit** (Serengeti, Ngorongoro, Tarangire, Lake Manyara).
The Destinations tab goes further — 25 places in total, including the
southern safari circuit (Ruaha, Nyerere/Selous), Mount Kilimanjaro, Pemba and
Mafia islands, Lake Victoria, and historic sites like Bagamoyo and Olduvai
Gorge — browsable and filterable, even though the planner doesn't route
itineraries through all of them (see **Regions** below for why). Built as a
static frontend backed by a small Express API. Runs with **zero
configuration** — no API key required — and automatically upgrades to live
Claude responses if you add one.

## Structure

```
.
├── backend/                 Express API (concierge, planner, destinations)
│   ├── src/
│   │   ├── server.js        App entry point — mounts routes, serves the frontend
│   │   ├── routes/          One file per API route group
│   │   ├── services/        claude.js — thin wrapper around the Claude Messages API
│   │   └── data/            Destinations dataset + built-in fallback logic
│   ├── package.json
│   └── .env.example
└── frontend/                 Static site (no build step)
    ├── index.html
    ├── css/styles.css
    └── js/                   One file per feature: nav, chat, planner, destinations
```

## Requirements

- Node.js 18 or later (uses the built-in `fetch`)

## Setup

```bash
cd backend
npm install
npm start
```

Open **http://localhost:4000** — the backend serves the frontend directly, so
this is the only server you need to run.

## Two modes, same app

- **No API key (default).** The Concierge answers from a built-in
  keyword-matched knowledge base, and the Trip Planner builds itineraries
  deterministically from the destinations dataset. Fully functional, fully
  offline, no setup.
- **With an API key.** Copy `backend/.env.example` to `backend/.env`, set
  `ANTHROPIC_API_KEY`, and restart. Both features switch to live Claude
  responses automatically — no code changes needed. If a live call ever
  fails, the app quietly falls back to the built-in logic instead of
  breaking.

## Regions

The Trip Planner takes a `region` parameter:

| Region | Coverage |
|---|---|
| `zanzibar` | Stone Town, Nungwi, Kendwa, Paje, Jambiani, Jozani, Prison Island, Mnemba, spice farms, Safari Blue |
| `safari` | Tarangire → Lake Manyara → Serengeti → Ngorongoro (the northern circuit) |
| `combined` | Safari first (~55% of the trip), a noted domestic flight, then Zanzibar for the rest |

Mikumi National Park is listed in the Destinations tab but deliberately left
out of generated itineraries — it's a separate short safari from Dar es
Salaam, not geographically part of the northern circuit, so folding it into
a combined route would misrepresent the trip logistics. The same logic
applies to the rest of the Destinations tab that isn't in the table above —
Kilimanjaro, Arusha National Park, the southern circuit (Ruaha,
Nyerere/Selous), Pemba, Mafia, Bagamoyo, Olduvai Gorge and Lake Victoria are
real, well-documented destinations, but each has different logistics
(a multi-day trek, a separate island transfer, a different gateway city)
that don't fit cleanly into the three routed itineraries. They're fully
browsable and filterable in the Destinations tab; adding them to the planner
is a natural next step (see the Roadmap tab in the app) once each has its
own routing logic rather than being force-fit into an existing circuit.

## API reference

| Method | Endpoint                      | Description                                   |
|--------|--------------------------------|------------------------------------------------|
| POST   | `/api/v1/concierge/chat`       | `{ message }` → `{ reply, source }`            |
| POST   | `/api/v1/itinerary/generate`   | `{ days, budget, party, interests[], region }` → itinerary JSON |
| GET    | `/api/v1/destinations`         | Optional `?area=` `&category=` `&region=` `&tag=` filters |
| GET    | `/api/v1/destinations/:id`     | Single destination                             |
| GET    | `/api/v1/health`               | Service status                                 |

## Notes

- CORS is open by default for local development — restrict `cors()` in
  `backend/src/server.js` before deploying publicly.
- The Claude system prompts live in `backend/src/routes/concierge.js` and
  `backend/src/routes/itinerary.js`; the offline fallback logic lives in
  `backend/src/data/faq.js` and `backend/src/data/itineraryFallback.js`.
- Destination and etiquette guidance should be confirmed with official
  sources before travel.
