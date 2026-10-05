const express = require('express');
const { destinations } = require('../data/destinations');

const router = express.Router();

// GET /api/v1/destinations?area=&category=&region=&tag=
router.get('/', (req, res) => {
  const { area, category, region, tag } = req.query;
  let results = destinations;

  if (area) {
    const q = String(area).toLowerCase();
    results = results.filter((d) => d.area.toLowerCase() === q);
  }
  if (category) {
    const q = String(category).toLowerCase();
    results = results.filter((d) => d.category.toLowerCase() === q);
  }
  if (region) {
    const q = String(region).toLowerCase();
    results = results.filter((d) => d.region.toLowerCase().includes(q));
  }
  if (tag) {
    const q = String(tag).toLowerCase();
    results = results.filter((d) => d.tags.some((t) => t.toLowerCase().includes(q)));
  }

  res.json({ count: results.length, destinations: results });
});

// GET /api/v1/destinations/:id
router.get('/:id', (req, res) => {
  const dest = destinations.find((d) => d.id === req.params.id);
  if (!dest) return res.status(404).json({ error: 'Destination not found' });
  res.json(dest);
});

module.exports = router;
