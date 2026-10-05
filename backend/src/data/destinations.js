const destinations = [
  // ---------- Zanzibar ----------
  {
    id: 'stone-town',
    name: 'Stone Town',
    region: 'Zanzibar · West Coast',
    area: 'zanzibar',
    category: 'heritage',
    wide: true,
    scene: 'heritage',
    desc: 'UNESCO-listed old town of coral-stone buildings, carved wooden doors and narrow alleys — the cultural heart of the archipelago, blending Swahili, Arab, Persian and Indian influences.',
    tags: ['Culture', 'Walking tours', 'Architecture']
  },
  {
    id: 'nungwi',
    name: 'Nungwi',
    region: 'Zanzibar · North Tip',
    area: 'zanzibar',
    category: 'beach',
    scene: 'beach',
    desc: 'The most developed beach resort area, with calm, tide-independent swimming, sunset dhow cruises and a lively strip of restaurants and bars.',
    tags: ['Beaches', 'Nightlife', 'Resorts']
  },
  {
    id: 'kendwa',
    name: 'Kendwa',
    region: 'Zanzibar · Northwest',
    area: 'zanzibar',
    category: 'beach',
    scene: 'beach',
    desc: "Quieter neighbour to Nungwi with a long, powder-white beach and the archipelago's best-known full-moon parties.",
    tags: ['Beaches', 'Sunsets']
  },
  {
    id: 'paje',
    name: 'Paje',
    region: 'Zanzibar · Southeast Coast',
    area: 'zanzibar',
    category: 'beach',
    scene: 'boat',
    desc: "Zanzibar's kite-surfing capital, with steady trade winds, shallow lagoons at low tide, and a laid-back backpacker-friendly scene.",
    tags: ['Watersports', 'Kitesurfing']
  },
  {
    id: 'jambiani',
    name: 'Jambiani',
    region: 'Zanzibar · Southeast Coast',
    area: 'zanzibar',
    category: 'beach',
    scene: 'beach',
    desc: 'A traditional fishing village turned relaxed beach destination — seaweed farms at low tide and a slower pace than the north coast.',
    tags: ['Relaxation', 'Local culture']
  },
  {
    id: 'jozani',
    name: 'Jozani-Chwaka Bay National Park',
    region: 'Zanzibar · Central-East',
    area: 'zanzibar',
    category: 'wildlife',
    wide: true,
    scene: 'wildlife',
    desc: "Zanzibar's only national park, home to the endangered red colobus monkey found nowhere else on Earth, plus mangrove boardwalks through Chwaka Bay.",
    tags: ['Wildlife', 'Nature', 'Conservation']
  },
  {
    id: 'prison-island',
    name: 'Prison (Changuu) Island',
    region: 'Off Stone Town',
    area: 'zanzibar',
    category: 'heritage',
    scene: 'reef',
    desc: 'A short boat ride from Stone Town to see giant Aldabra tortoises and snorkel over a small coral reef.',
    tags: ['History', 'Wildlife']
  },
  {
    id: 'mnemba',
    name: 'Mnemba Atoll',
    region: 'Off Northeast Coast',
    area: 'zanzibar',
    category: 'beach',
    scene: 'reef',
    desc: "A private atoll ringed by some of the archipelago's best reef diving and snorkeling, including regular dolphin and turtle sightings.",
    tags: ['Diving', 'Snorkeling']
  },
  {
    id: 'spice-farms',
    name: 'Spice Farms (Kizimbani)',
    region: 'Zanzibar · Central',
    area: 'zanzibar',
    category: 'heritage',
    scene: 'spice',
    desc: 'Guided walks through working farms growing cloves, vanilla, cinnamon and nutmeg — the trade that gave Zanzibar its historic name, the Spice Islands.',
    tags: ['Food', 'Culture']
  },
  {
    id: 'safari-blue',
    name: 'Safari Blue (Menai Bay)',
    region: 'Zanzibar · South',
    area: 'zanzibar',
    category: 'beach',
    scene: 'boat',
    desc: "A full-day traditional dhow sailing trip through Menai Bay's marine conservation area, with snorkeling and a seafood lunch on a sandbank.",
    tags: ['Watersports', 'Food']
  },

  // ---------- Northern Safari Circuit ----------
  {
    id: 'serengeti',
    name: 'Serengeti National Park',
    region: 'Northern Circuit · Mara Region',
    area: 'mainland',
    category: 'wildlife',
    circuit: true,
    wide: true,
    scene: 'savanna',
    desc: 'Endless open plains and the stage for the Great Migration — over a million wildebeest and zebra moving with the rains — alongside resident lion, leopard and elephant populations year-round.',
    tags: ['Safari', 'Great Migration', 'Wildlife']
  },
  {
    id: 'ngorongoro',
    name: 'Ngorongoro Crater',
    region: 'Northern Circuit · Arusha Region',
    area: 'mainland',
    category: 'wildlife',
    circuit: true,
    scene: 'crater',
    desc: "A UNESCO World Heritage Site and the world's largest inactive, unbroken volcanic caldera — its floor holds one of Africa's densest concentrations of wildlife, including black rhino.",
    tags: ['Safari', 'UNESCO', 'Wildlife']
  },
  {
    id: 'tarangire',
    name: 'Tarangire National Park',
    region: 'Northern Circuit · Manyara Region',
    area: 'mainland',
    category: 'wildlife',
    circuit: true,
    scene: 'savanna',
    desc: 'A baobab-studded landscape known for large elephant herds, especially in the dry season when the Tarangire River draws wildlife from across the region.',
    tags: ['Safari', 'Wildlife']
  },
  {
    id: 'lake-manyara',
    name: 'Lake Manyara National Park',
    region: 'Northern Circuit · Arusha Region',
    area: 'mainland',
    category: 'wildlife',
    circuit: true,
    scene: 'savanna',
    desc: 'A groundwater forest beneath the Rift Valley escarpment, known for tree-climbing lions and a flamingo-lined soda lake — often the first stop on a northern circuit safari.',
    tags: ['Safari', 'Wildlife', 'Birdwatching']
  },
  {
    id: 'mikumi',
    name: 'Mikumi National Park',
    region: 'Southern Tanzania · near Dar es Salaam',
    area: 'mainland',
    category: 'wildlife',
    circuit: false,
    scene: 'savanna',
    desc: "Tanzania's most accessible park from Dar es Salaam, with an open floodplain often compared to the Serengeti — elephant, lion, giraffe and buffalo, reachable as a self-contained short safari rather than part of the northern circuit.",
    tags: ['Safari', 'Wildlife', 'Day trips']
  },

  // ---------- Mount Kilimanjaro & Arusha area ----------
  {
    id: 'kilimanjaro',
    name: 'Mount Kilimanjaro',
    region: 'Kilimanjaro Region',
    area: 'mainland',
    category: 'nature',
    circuit: false,
    wide: true,
    scene: 'mountain',
    desc: "Africa's highest peak and the world's tallest free-standing mountain — a 5–9 day trek through five climate zones to Uhuru Peak at 5,895m, no technical climbing gear required on the standard routes.",
    tags: ['Trekking', 'Mountain', 'Adventure']
  },
  {
    id: 'arusha-np',
    name: 'Arusha National Park',
    region: 'Arusha Region',
    area: 'mainland',
    category: 'wildlife',
    circuit: false,
    scene: 'savanna',
    desc: 'A compact, often-overlooked park in the shadow of Mount Meru — giraffe, buffalo and colobus monkeys around the Momella Lakes, easily done as a half-day trip from Arusha town.',
    tags: ['Safari', 'Wildlife', 'Day trips']
  },

  // ---------- Southern Circuit ----------
  {
    id: 'ruaha',
    name: 'Ruaha National Park',
    region: 'Southern Circuit · Iringa Region',
    area: 'mainland',
    category: 'wildlife',
    circuit: false,
    scene: 'savanna',
    desc: "Tanzania's largest national park and one of its least crowded — dramatic baobab-lined landscapes along the Great Ruaha River, with one of East Africa's largest elephant and lion populations.",
    tags: ['Safari', 'Wildlife']
  },
  {
    id: 'nyerere-selous',
    name: 'Nyerere National Park (Selous)',
    region: 'Southern Circuit · Pwani/Morogoro',
    area: 'mainland',
    category: 'wildlife',
    circuit: false,
    scene: 'savanna',
    desc: "Africa's largest protected wildlife area, centred on the Rufiji River — boat safaris alongside the usual game drives, and far fewer visitors than the northern parks.",
    tags: ['Safari', 'Wildlife', 'Boat safari']
  },

  // ---------- Islands beyond Unguja ----------
  {
    id: 'pemba',
    name: 'Pemba Island',
    region: 'Zanzibar Archipelago · North',
    area: 'zanzibar',
    category: 'beach',
    circuit: false,
    scene: 'reef',
    desc: "Zanzibar's quieter sister island — steep forested hills, clove plantations and some of the least-dived reef walls in East Africa, with a fraction of Unguja's visitor numbers.",
    tags: ['Diving', 'Relaxation', 'Off the beaten path']
  },
  {
    id: 'mafia',
    name: 'Mafia Island',
    region: 'Pwani Region',
    area: 'mainland',
    category: 'beach',
    circuit: false,
    scene: 'reef',
    desc: 'A marine park south of Zanzibar best known for reliable whale shark encounters (Oct–Mar) and undisturbed coral gardens, reached by a short flight from Dar es Salaam.',
    tags: ['Diving', 'Snorkeling', 'Marine park']
  },

  // ---------- Culture, history & lakes ----------
  {
    id: 'bagamoyo',
    name: 'Bagamoyo',
    region: 'Pwani Region · Mainland Coast',
    area: 'mainland',
    category: 'heritage',
    circuit: false,
    scene: 'heritage',
    desc: 'A former 19th-century slave-trade port and one-time German colonial capital, now a UNESCO-nominated historic town of crumbling coral-stone buildings a short drive from Dar es Salaam.',
    tags: ['History', 'Culture']
  },
  {
    id: 'olduvai-gorge',
    name: 'Olduvai Gorge',
    region: 'Northern Circuit · Ngorongoro Highlands',
    area: 'mainland',
    category: 'heritage',
    circuit: false,
    scene: 'crater',
    desc: 'One of the most important paleoanthropological sites in the world — fossil finds here reshaped understanding of early human evolution, with a small museum and viewpoint over the gorge.',
    tags: ['History', 'Archaeology']
  },
  {
    id: 'lake-victoria',
    name: 'Lake Victoria (Mwanza)',
    region: 'Mwanza Region',
    area: 'mainland',
    category: 'nature',
    circuit: false,
    wide: true,
    scene: 'lake',
    desc: "Africa's largest lake and the source of the Nile — Mwanza's rock-strewn shoreline, fishing villages and Rubondo Island's forest and chimpanzees make it a detour few visitors take.",
    tags: ['Nature', 'Lake', 'Off the beaten path']
  },
  {
    id: 'udzungwa',
    name: 'Udzungwa Mountains National Park',
    region: 'Southern Highlands · Iringa Region',
    area: 'mainland',
    category: 'wildlife',
    circuit: false,
    scene: 'wildlife',
    desc: "Tanzania's answer to a rainforest reserve — dense highland forest, waterfall hikes and primates found nowhere else, walked rather than driven, unlike most of the country's parks.",
    tags: ['Nature', 'Wildlife', 'Hiking']
  }
];

module.exports = { destinations };
