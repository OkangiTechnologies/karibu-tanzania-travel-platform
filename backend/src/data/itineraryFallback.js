const { destinations } = require('./destinations');

// Zanzibar: orientation first, then a spread of beach, culture, wildlife and watersport stops.
const ZANZIBAR_ORDER = [
  'stone-town', 'spice-farms', 'nungwi', 'kendwa', 'paje',
  'jambiani', 'jozani', 'safari-blue', 'mnemba', 'prison-island'
];

// Northern Safari Circuit only — Mikumi is a separate southern day-trip park
// (near Dar es Salaam), not part of this route, so it's excluded here on purpose.
const SAFARI_ORDER = ['tarangire', 'lake-manyara', 'serengeti', 'ngorongoro'];

const AFTERNOON_BY_TAG = {
  Beaches: 'Relax on the beach and swim in the lagoon.',
  Nightlife: 'Wander the beach strip, then dinner with a view.',
  Culture: 'Guided walking tour through the old town.',
  History: 'Guided walking tour of the historic site.',
  Architecture: 'Slow walk through the alleys, camera in hand.',
  Diving: 'Snorkeling or diving trip around the reef.',
  Snorkeling: 'Snorkeling trip out to the reef.',
  Wildlife: 'Guided nature walk to spot local wildlife.',
  Nature: 'Guided nature walk through the reserve.',
  Watersports: 'Watersports session — kitesurfing, sailing or snorkeling depending on the spot.',
  Food: 'Local food tasting and a relaxed lunch.',
  Relaxation: 'Free time — hammock, book, slow afternoon.',
  Sunsets: 'Head to the beach early to claim a sunset spot.',
  'Local culture': 'Wander the village and chat with locals.',
  Safari: 'Afternoon game drive, tracking wildlife along the way.',
  'Great Migration': 'Game drive following the migration herds, if in season.',
  UNESCO: 'Descend to the crater floor for a full-day game drive.',
  Birdwatching: 'Guided birdwatching walk along the lake shore.'
};

const EVENING_BY_BUDGET = {
  backpacker: 'Dinner at a local food stall or your guesthouse.',
  'mid-range': 'Dinner at a beachfront restaurant.',
  luxury: 'Private dinner, or a sunset dhow cruise.'
};

const SAFARI_EVENING_BY_BUDGET = {
  backpacker: 'Dinner at your campsite or a budget lodge.',
  'mid-range': 'Dinner at your safari lodge, campfire optional.',
  luxury: 'Private bush dinner or fine dining at your lodge.'
};

const TIPS = [
  'Carry small shilling notes — many local vendors can\u2019t break large bills.',
  'Book popular tours a day ahead in peak season (Jul\u2013Aug, Dec\u2013Jan).',
  'Bring reef-safe sunscreen; some marine areas restrict regular sunscreen.',
  'Agree on taxi fares before you get in — they\u2019re rarely metered.',
  'Tides swing widely on the east coast — check times before swimming.',
  'Modest dress off the beach goes a long way with locals.'
];

const SAFARI_TIPS = [
  'Pack neutral-coloured clothing — bright colours and dark blues attract tsetse flies.',
  'Malaria prophylaxis is recommended for mainland Tanzania — check with a travel clinic.',
  'Bring binoculars — most lodges only supply a couple of shared pairs.',
  'Game drives start early; sunrise light gives the best sightings and photos.',
  'A short domestic flight connects the northern parks to Zanzibar in about 1\u20131.5 hours.'
];

function findDest(id) {
  return destinations.find((d) => d.id === id);
}

function pickPool(order, interests) {
  if (!Array.isArray(interests) || interests.length === 0) return order;

  const wanted = interests.map((i) => i.toLowerCase());
  const matches = order.filter((id) => {
    const dest = findDest(id);
    if (!dest) return false;
    return dest.tags.some((t) => wanted.some((w) => t.toLowerCase().includes(w) || w.includes(t.toLowerCase())));
  });

  const fillers = order.filter((id) => !matches.includes(id));
  return matches.length ? [...matches, ...fillers] : order;
}

function firstClauseLower(desc) {
  const clause = desc.split('.')[0];
  return clause.charAt(0).toLowerCase() + clause.slice(1);
}

function buildLeg({ order, count, startDay, interests, eveningLine, tips, keepFirstId, transferNote }) {
  const pool = keepFirstId
    ? [keepFirstId, ...pickPool(order, interests).filter((id) => id !== keepFirstId)]
    : pickPool(order, interests);

  const days = [];
  for (let i = 0; i < count; i++) {
    const dest = findDest(pool[i % pool.length]);
    const primaryTag = dest.tags.find((t) => AFTERNOON_BY_TAG[t]) || dest.tags[0];
    const afternoon = AFTERNOON_BY_TAG[primaryTag] || 'Free time to explore at your own pace.';
    let morning;
    if (i === 0 && transferNote) {
      morning = `${transferNote} Settle in near ${dest.name}.`;
    } else if (i === 0) {
      morning = `Arrive and settle in near ${dest.name}.`;
    } else {
      morning = `Head to ${dest.name} — ${firstClauseLower(dest.desc)}.`;
    }

    days.push({
      day: startDay + i,
      title: dest.name,
      morning,
      afternoon,
      evening: eveningLine,
      tip: tips[(startDay + i - 1) % tips.length]
    });
  }
  return days;
}

/**
 * Builds a deterministic day-by-day itinerary from the destinations dataset.
 * No external calls — always available, even without an API key.
 * region: 'zanzibar' | 'safari' | 'combined'
 */
function buildFallbackItinerary({ days, budget, party, interests, region }) {
  const safeRegion = ['zanzibar', 'safari', 'combined'].includes(region) ? region : 'zanzibar';
  const eveningLine = EVENING_BY_BUDGET[budget] || EVENING_BY_BUDGET['mid-range'];
  const safariEveningLine = SAFARI_EVENING_BY_BUDGET[budget] || SAFARI_EVENING_BY_BUDGET['mid-range'];

  let itineraryDays = [];
  let summary;

  if (safeRegion === 'zanzibar') {
    itineraryDays = buildLeg({
      order: ZANZIBAR_ORDER, count: days, startDay: 1, interests,
      eveningLine, tips: TIPS, keepFirstId: 'stone-town'
    });
    summary = `A ${days}-day route across Zanzibar for ${party || 'your trip'}, built from popular destinations matching your interests.`;
  } else if (safeRegion === 'safari') {
    itineraryDays = buildLeg({
      order: SAFARI_ORDER, count: days, startDay: 1, interests,
      eveningLine: safariEveningLine, tips: SAFARI_TIPS
    });
    summary = `A ${days}-day northern safari circuit for ${party || 'your trip'}, covering Tanzania's best-known parks.`;
  } else {
    // Combined: safari first (~55% of days, min 2), then fly to Zanzibar for the rest.
    const safariDays = Math.max(2, Math.min(days - 2, Math.round(days * 0.55)));
    const zanzibarDays = Math.max(2, days - safariDays);
    const totalDays = safariDays + zanzibarDays;

    const safariLeg = buildLeg({
      order: SAFARI_ORDER, count: safariDays, startDay: 1, interests,
      eveningLine: safariEveningLine, tips: SAFARI_TIPS
    });
    const zanzibarLeg = buildLeg({
      order: ZANZIBAR_ORDER, count: zanzibarDays, startDay: safariDays + 1, interests,
      eveningLine, tips: TIPS, keepFirstId: 'stone-town',
      transferNote: 'Fly from the northern safari circuit to Zanzibar (about 1\u20131.5 hours) and transfer to Stone Town.'
    });

    itineraryDays = [...safariLeg, ...zanzibarLeg];
    summary = `A ${totalDays}-day trip for ${party || 'your trip'}: ${safariDays} days on safari in northern Tanzania, then ${zanzibarDays} days unwinding in Zanzibar.`;
  }

  return { summary, days: itineraryDays, source: 'fallback' };
}

module.exports = { buildFallbackItinerary };
