require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const conciergeRoutes = require('./routes/concierge');
const itineraryRoutes = require('./routes/itinerary');
const destinationsRoutes = require('./routes/destinations');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '100kb' }));

// Basic request log
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// API routes
app.use('/api/v1/concierge', conciergeRoutes);
app.use('/api/v1/itinerary', itineraryRoutes);
app.use('/api/v1/destinations', destinationsRoutes);
app.use('/api/v1/health', healthRoutes);

// Serve the static frontend so the whole app runs from one server.
// express.static serves index.html for "/" automatically and returns a
// real 404 for any other missing file — no wildcard fallback needed here,
// since this is a single-page app with in-page tabs, not client-side routes.
const frontendPath = path.join(__dirname, '../../frontend');
app.use(express.static(frontendPath));

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Karibu Zanzibar API listening on http://localhost:${PORT}`);
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('ANTHROPIC_API_KEY is not set — Concierge and Trip Planner will fail. See backend/.env.example');
  }
});
