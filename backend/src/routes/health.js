const express = require('express');

const router = express.Router();

const startedAt = Date.now();

// GET /api/v1/health
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    uptimeSeconds: Math.round((Date.now() - startedAt) / 1000),
    claudeConfigured: Boolean(process.env.ANTHROPIC_API_KEY),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
