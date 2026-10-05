const express = require('express');
const { callClaude } = require('../services/claude');
const { buildFallbackItinerary } = require('../data/itineraryFallback');

const router = express.Router();

const PLANNER_SYSTEM = `You are a Tanzania trip-planning engine covering Zanzibar and the northern safari circuit (Serengeti, Ngorongoro, Tarangire, Lake Manyara). Given trip parameters, output ONLY valid JSON (no markdown fences, no commentary) matching exactly this schema:
{"summary":"one sentence overview of the trip route/logic","days":[{"day":1,"title":"short theme for the day","morning":"short plan","afternoon":"short plan","evening":"short plan","tip":"one practical tip"}]}
Keep every field concise (max ~18 words) so the whole response is compact.
If region is "zanzibar": ground the plan only in Zanzibar geography and logistics (e.g. Stone Town, Nungwi, Kendwa, Paje, Jambiani, Jozani Forest, Prison/Changuu Island, Mnemba Atoll, spice farms, Safari Blue/Menai Bay).
If region is "safari": ground the plan only in the northern safari circuit (Tarangire, Lake Manyara, Serengeti, Ngorongoro Crater), sequenced so travel between parks is realistic and not backtracking.
If region is "combined": sequence the safari parks first (roughly half to two-thirds of the trip), include one day noting the short domestic flight from the safari circuit to Zanzibar, then finish with Zanzibar days. Do not include Mikumi National Park in any generated plan — it is a separate southern day-trip park, not part of this circuit.
Match pacing and activity choices to the stated budget level and interests.`;

const VALID_BUDGETS = ['backpacker', 'mid-range', 'luxury'];
const VALID_REGIONS = ['zanzibar', 'safari', 'combined'];

// POST /api/v1/itinerary/generate
// body: { days: number, budget: string, party: string, interests: string[], region: string }
// Uses Claude when ANTHROPIC_API_KEY is set; otherwise builds a deterministic
// itinerary from the destinations dataset so the planner works with zero configuration.
router.post('/generate', async (req, res) => {
  const { days, budget, party, interests, region } = req.body || {};

  const numDays = Number(days);
  if (!Number.isInteger(numDays) || numDays < 1 || numDays > 21) {
    return res.status(400).json({ error: 'days must be an integer between 1 and 21' });
  }
  if (!VALID_BUDGETS.includes(budget)) {
    return res.status(400).json({ error: `budget must be one of: ${VALID_BUDGETS.join(', ')}` });
  }
  const safeRegion = VALID_REGIONS.includes(region) ? region : 'zanzibar';

  const partyText = typeof party === 'string' && party.trim() ? party.trim() : 'a traveller';
  const cleanInterests = Array.isArray(interests) ? interests : [];

  if (!process.env.ANTHROPIC_API_KEY) {
    const plan = buildFallbackItinerary({ days: numDays, budget, party: partyText, interests: cleanInterests, region: safeRegion });
    return res.json({ ...plan, meta: { days: numDays, budget, party: partyText, region: safeRegion } });
  }

  const interestText = cleanInterests.length ? cleanInterests.join(', ') : 'a balanced general mix';
  const userText = `Plan a ${numDays}-day Tanzania trip. Region: ${safeRegion}. Budget level: ${budget}. Travel party: ${partyText}. Interests: ${interestText}. Return only the JSON.`;

  try {
    const raw = await callClaude(PLANNER_SYSTEM, userText, 1200);
    const cleaned = raw.replace(/```json|```/g, '').trim();
    const plan = JSON.parse(cleaned);

    if (!plan || !Array.isArray(plan.days)) {
      throw new Error('Model response did not match the expected itinerary schema');
    }

    res.json({ ...plan, source: 'ai', meta: { days: numDays, budget, party: partyText, region: safeRegion } });
  } catch (err) {
    console.error('[itinerary/generate]', err.message);
    const plan = buildFallbackItinerary({ days: numDays, budget, party: partyText, interests: cleanInterests, region: safeRegion });
    res.json({ ...plan, meta: { days: numDays, budget, party: partyText, region: safeRegion } });
  }
});

module.exports = router;
