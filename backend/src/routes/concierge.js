const express = require('express');
const { callClaude } = require('../services/claude');
const { getFallbackReply } = require('../data/faq');

const router = express.Router();

const CONCIERGE_SYSTEM = `You are the AI Concierge for a Tanzania tourism platform, covering Zanzibar and mainland Tanzania (including the northern safari circuit — Serengeti, Ngorongoro, Tarangire, Lake Manyara — and other national parks such as Mikumi). Answer questions about destinations, attractions, culture and etiquette, activities, accommodation, transport, food, and practical travel logistics for Tanzania only. Be accurate, concrete, and concise (roughly 60-120 words). Use a warm but professional tone. If a question falls outside Tanzania travel, briefly redirect to what the concierge can help with. Do not invent specific prices, phone numbers, or business names you are not confident about — speak in general terms instead (e.g. "budget guesthouses" rather than a specific named business) unless it's a well-known landmark or well-known operator.`;

// POST /api/v1/concierge/chat
// body: { message: string }
// Uses Claude when ANTHROPIC_API_KEY is set; otherwise answers from a built-in
// keyword-matched knowledge base so the platform works with zero configuration.
router.post('/chat', async (req, res) => {
  const { message } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'message is required' });
  }
  if (message.length > 1000) {
    return res.status(400).json({ error: 'message is too long (max 1000 characters)' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.json({ reply: getFallbackReply(message.trim()), source: 'fallback' });
  }

  try {
    const reply = await callClaude(CONCIERGE_SYSTEM, message.trim(), 500);
    res.json({ reply: reply || getFallbackReply(message.trim()), source: 'ai' });
  } catch (err) {
    console.error('[concierge/chat]', err.message);
    res.json({ reply: getFallbackReply(message.trim()), source: 'fallback' });
  }
});

module.exports = router;
