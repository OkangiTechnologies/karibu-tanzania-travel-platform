// Keyword-matched answers for the Concierge when running without an API key.
// Each entry is checked in order; the first sufficiently-matching entry wins.

const faq = [
  {
    keywords: ['stay', 'area', 'first-timer', 'first timer', 'where should i stay', 'base myself'],
    answer: "For a first visit, Nungwi or Kendwa on the north tip are the easiest base — calm, swimmable beaches at any tide, plenty of restaurants, and easy transfers to Stone Town (about 1–1.5 hours by road). If you want culture on your doorstep, Stone Town itself works well for 1–2 nights before moving to the coast."
  },
  {
    keywords: ['airport', 'znz', 'transfer', 'get to nungwi', 'get from the airport'],
    answer: "From Abeid Amani Karume International Airport (ZNZ), a private taxi to Nungwi takes roughly 1–1.5 hours. Many hotels arrange airport pickup directly — worth booking ahead. A cheaper option is a shared shuttle or dala-dala into Stone Town, then onward transport north."
  },
  {
    keywords: ['bikini', 'dress', 'wear', 'clothing', 'modest', 'cover up'],
    answer: "Bikinis and swimwear are fine on resort beaches. Once you step off the beach — in villages, Stone Town, or near mosques — modest dress (shoulders and knees covered) is appreciated, since Zanzibar is predominantly Muslim. Locals are generally relaxed about it, but covering up shows respect."
  },
  {
    keywords: ['turtle', 'snorkel', 'snorkeling', 'diving', 'reef'],
    answer: "Mnemba Atoll, off the northeast coast, is the best-known spot for reef snorkeling and diving, with regular turtle and dolphin sightings. Prison (Changuu) Island near Stone Town also has a small reef and is a much shorter trip if you're short on time."
  },
  {
    keywords: ['spice', 'spice tour', 'spice farm'],
    answer: "A good spice tour is a guided walk through a working farm (Kizimbani is well known) where you'll see and smell cloves, vanilla, cinnamon and nutmeg growing, taste seasonal fruit, and usually finish with a simple local lunch. Most run 2–3 hours."
  },
  {
    keywords: ['currency', 'money', 'cash', 'usd', 'tzs'],
    answer: "The local currency is the Tanzanian Shilling (TZS). US dollars (2009 or newer notes) are widely accepted for hotels, park fees and tours, but small vendors and local transport usually expect shillings."
  },
  {
    keywords: ['visa', 'entry', 'passport'],
    answer: "Most nationalities can get a visa on arrival or apply for an e-visa in advance. If you're arriving from a country with yellow fever risk, bring your vaccination certificate — it's checked on entry."
  },
  {
    keywords: ['ferry', 'dar es salaam', 'boat to zanzibar'],
    answer: "The ferry from Dar es Salaam takes about 2 hours; Azam Marine and Kilimanjaro Fast Ferries are the main operators. Book a VIP seat if you can — it's a modest upgrade for a more comfortable crossing."
  },
  {
    keywords: ['best time', 'season', 'when to visit', 'weather', 'rain'],
    answer: "June–October and December–February are the driest, most popular windows. March–May is the long-rain low season — wetter, but quieter and cheaper."
  },
  {
    keywords: ['get around', 'transport', 'taxi', 'dala', 'rent a car', 'scooter'],
    answer: "Dala-dala minibuses are the cheapest way around but slow and crowded. Most visitors use private taxis or a hired driver for beach-to-beach transfers, and some rent a scooter or car for flexibility — an international driving permit is recommended."
  },
  {
    keywords: ['jozani', 'monkey', 'colobus', 'wildlife', 'forest'],
    answer: "Jozani-Chwaka Bay National Park is the place for this — it's the only spot the red colobus monkey, found nowhere else on Earth, can reliably be seen. There's also a mangrove boardwalk through Chwaka Bay."
  },
  {
    keywords: ['stone town', 'old town', 'unesco'],
    answer: "Stone Town is the UNESCO-listed old quarter — coral-stone buildings, carved wooden doors, and narrow alleys blending Swahili, Arab, Persian and Indian influences. Plan half a day minimum for a walking tour, more if you want to linger in the markets."
  },
  {
    keywords: ['safety', 'safe', 'is it safe'],
    answer: "Tanzania is generally safe for visitors, on the coast and inland. Usual precautions apply — keep valuables secure, use reputable tour operators, agree on driver/guide arrangements in advance, and be mindful walking alone late at night in unlit areas."
  },
  {
    keywords: ['serengeti'],
    answer: "The Serengeti is Tanzania's best-known park, famous for the Great Migration — over a million wildebeest and zebra moving with the rains. Calving season runs roughly January–March in the south; river crossings happen around June–September in the north. It's usually paired with Ngorongoro, Tarangire and Lake Manyara on a northern circuit safari."
  },
  {
    keywords: ['ngorongoro', 'crater'],
    answer: "Ngorongoro Crater is a UNESCO World Heritage Site — the world's largest inactive volcanic caldera, with one of Africa's densest wildlife concentrations on its floor, including black rhino. Most visitors descend for a full-day game drive and stay at a lodge on the crater rim."
  },
  {
    keywords: ['mikumi'],
    answer: "Mikumi National Park is Tanzania's most accessible safari park from Dar es Salaam — a few hours by road, with an open floodplain often compared to the Serengeti. It's a self-contained short safari rather than part of the northern circuit, good if you're short on time or based on the mainland coast."
  },
  {
    keywords: ['combine', 'safari and zanzibar', 'zanzibar and safari', 'both', 'safari then beach'],
    answer: "Combining a northern safari with Zanzibar is very common — a short domestic flight connects Arusha/Kilimanjaro to Zanzibar in about 1–1.5 hours. Most people do safari first (4–5 days across Tarangire, Lake Manyara, Serengeti and Ngorongoro) then unwind in Zanzibar for the back half of the trip."
  },
  {
    keywords: ['malaria', 'vaccination', 'vaccine', 'yellow fever'],
    answer: "Malaria prophylaxis is generally recommended for mainland Tanzania, including safari areas — check with a travel clinic before you go. A yellow fever certificate is required if you're arriving from a country with yellow fever risk; it's checked on entry regardless of whether you're headed to Zanzibar or the mainland."
  },
  {
    keywords: ['when to go safari', 'best time safari', 'migration', 'game drive season'],
    answer: "June–October (dry season) gives the easiest wildlife viewing, with animals concentrated around water sources. The wildebeest migration is roughly Jan–Mar for calving in the southern Serengeti and Jun–Sep for river crossings in the north — timing your visit to a specific migration event takes some planning."
  },
  {
    keywords: ['kilimanjaro', 'climb', 'trek', 'trekking', 'hike the mountain'],
    answer: "Kilimanjaro is climbed over 5–9 days across several routes (Machame and Marangu are the most popular), no technical climbing skill needed on the standard routes — just fitness and a slow, steady pace to manage the altitude. Success rates rise noticeably on longer itineraries, since they allow more time to acclimatise."
  },
  {
    keywords: ['southern circuit', 'ruaha', 'selous', 'nyerere'],
    answer: "The southern circuit — Ruaha and Nyerere (formerly Selous) — sees far fewer visitors than the northern parks and is reached via Dar es Salaam or a domestic flight rather than through Arusha. Nyerere is known for boat safaris on the Rufiji River; Ruaha for its size and large elephant and lion populations."
  },
  {
    keywords: ['pemba', 'mafia', 'whale shark'],
    answer: "Pemba is Zanzibar's quieter sister island — steep, forested, and known for some of the least-dived reef walls in East Africa. Mafia Island, further south near Dar es Salaam, is the more reliable spot for whale shark encounters, roughly October–March. Both take a short flight to reach."
  },
  {
    keywords: ['bagamoyo', 'olduvai', 'gorge', 'cradle of mankind'],
    answer: "Bagamoyo is a former 19th-century slave-trade port and colonial capital, easily visited from Dar es Salaam. Olduvai Gorge, in the Ngorongoro highlands, is one of the most important paleoanthropological sites in the world — often combined with a Serengeti or Ngorongoro safari since it's on the same route."
  },
  {
    keywords: ['lake victoria', 'mwanza', 'rubondo'],
    answer: "Lake Victoria, Africa's largest lake, is reached via Mwanza — a detour most visitors skip, but Rubondo Island's forest and chimpanzee population make it worth the trip if you have time beyond the standard safari and beach circuit."
  },
  {
    keywords: ['udzungwa', 'rainforest', 'waterfall hike'],
    answer: "The Udzungwa Mountains are Tanzania's main rainforest reserve — hiked rather than driven, with waterfall trails and primate species found nowhere else in the country. It sits in the Southern Highlands, well off the standard northern circuit route."
  }
];

const fallbackAnswer =
  "I don't have a specific answer for that from my built-in knowledge base. Try the Destinations tab for a curated shortlist, or the Trip Planner to build a full itinerary across Zanzibar or the northern safari circuit — or ask about staying areas, transport, etiquette, safari parks, or spice tours.";

/**
 * Very small keyword matcher — no external calls, no API key required.
 * @param {string} message
 * @returns {string}
 */
function getFallbackReply(message) {
  const text = message.toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const entry of faq) {
    const score = entry.keywords.reduce((acc, kw) => (text.includes(kw) ? acc + 1 : acc), 0);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }

  return best ? best.answer : fallbackAnswer;
}

module.exports = { getFallbackReply };
