// Editorial line-illustration scenes — one visual language across every destination,
// built in SVG rather than stock photography so the whole set stays consistent.
function scene(type, uid) {
  const g = `g${uid}`;
  const skies = {
    heritage: ['#0A3B49', '#2FA6AE'],
    beach: ['#1B6E78', '#F0B25E'],
    boat: ['#0A3B49', '#3FC4CC'],
    wildlife: ['#123A2A', '#3E7A4F'],
    reef: ['#062A34', '#2FA6AE'],
    spice: ['#5C3A18', '#B87A1E'],
    savanna: ['#6B4423', '#E0A83E'],
    crater: ['#1F3B2E', '#5C8A4E'],
    mountain: ['#1A2E4A', '#7BAFD4'],
    lake: ['#0E3A4A', '#4FAFC7']
  };
  const [c1, c2] = skies[type] || skies.beach;
  const defs = `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;
  const sky = `<rect width="400" height="220" fill="url(#${g})"/>`;
  const sun = `<circle cx="330" cy="55" r="30" fill="#F3EAD9" opacity="0.85"/>`;
  const waterline = `<path d="M0 165c40-8 80-8 120 0s80 8 120 0 80-8 120 0 80 8 120 0v55H0z" fill="#062A34" opacity="0.5"/>
    <path d="M0 180c40-6 80-6 120 0s80 6 120 0 80-6 120 0 80 6 120 0v40H0z" fill="#052128"/>`;
  const bodies = {
    heritage: `
      <path d="M20 178V120l14-9 14 9v58" fill="#062A34"/>
      <circle cx="34" cy="103" r="9" fill="#062A34"/>
      <path d="M55 178V130h26v48" fill="#0A3B49"/>
      <path d="M68 130a13 13 0 0126 0z" fill="#0A3B49"/>
      <path d="M95 178v-64l20-12 20 12v64" fill="#062A34"/>
      <path d="M150 178v-40h22v40" fill="#0A3B49"/>
      <path d="M182 178v-56l16-10 16 10v56" fill="#062A34"/>
      <circle cx="198" cy="104" r="7" fill="#062A34"/>
      <path d="M225 178v-34h18v34" fill="#0A3B49"/>
      <path d="M64 178v-26h10v26" fill="#F3EAD9" opacity="0.5"/>`,
    beach: `
      <path d="M300 178c0-30-6-46-6-46s-6 16-6 46z" fill="#123A2A"/>
      <path d="M294 132c-14-6-24-20-24-20s18 2 26 12c4-10 18-16 18-16s-2 16-14 22c10 0 20 10 20 10s-16 4-26-8z" fill="#1E4A2E"/>
      <path d="M0 178c30-10 60-10 90 0s60 10 90 0 60-10 90 0 60 10 90 0 40-8 40-8v14H0z" fill="#F3EAD9" opacity="0.65"/>`,
    boat: `
      <path d="M60 150l90 4-14 26H74z" fill="#062A34"/>
      <path d="M104 150V96" stroke="#062A34" stroke-width="3"/>
      <path d="M104 100c30 6 42 24 42 24H104z" fill="#0A3B49"/>
      <path d="M104 104c-20 6-28 20-28 20h28z" fill="#062A34" opacity="0.8"/>
      <path d="M230 178c30-10 60-10 90 0" stroke="#052128" stroke-width="3" fill="none" opacity="0.5"/>`,
    wildlife: `
      <path d="M0 178V96c20-10 30 6 46-4s28-10 44 0 30 8 46-2 26-8 40 2 30 10 46 0 40-14 40-14v100z" fill="#0F2E22"/>
      <path d="M0 178V120c16-6 26 4 40-2s24-8 38 0 26 6 40-2 24-6 36 2 30 8 46 0 40-10 40-10v70z" fill="#1E4A2E"/>
      <ellipse cx="115" cy="150" rx="15" ry="12" fill="#062A34"/>
      <circle cx="106" cy="140" r="8" fill="#062A34"/>
      <path d="M100 150q-18 10-14 28" stroke="#062A34" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    reef: `
      <path d="M0 178c14-14 22-4 34-14s18-14 30-4 20 12 32 2 22-16 34-4 18 12 30 2v36H0z" fill="#0A3B49" opacity="0.7"/>
      <path d="M150 150q18-10 14 6t-14 10 -8-8 8-8z" fill="#D9962E" opacity="0.85"/>
      <ellipse cx="230" cy="140" rx="20" ry="10" fill="#3FC4CC" opacity="0.8"/>
      <path d="M250 140l12-6v12z" fill="#3FC4CC" opacity="0.8"/>
      <circle cx="70" cy="120" r="4" fill="#F3EAD9" opacity="0.7"/>
      <circle cx="90" cy="105" r="3" fill="#F3EAD9" opacity="0.6"/>`,
    spice: `
      <path d="M40 178V150c-10-4-16-14-16-14s14-2 22 6c2-10 14-18 14-18s2 16-8 24c8-2 18 6 18 6s-14 8-24 2v22z" fill="#123A2A"/>
      <path d="M130 178V140c-10-4-16-16-16-16s16-2 24 8c2-12 16-20 16-20s2 18-10 26c10-2 20 6 20 6s-16 10-26 2v32z" fill="#1E4A2E"/>
      <path d="M220 178V152c-8-4-12-12-12-12s12-2 18 6c2-8 12-14 12-14s2 14-8 20c8-2 16 4 16 4s-12 8-20 2v14z" fill="#123A2A"/>`,
    savanna: `
      <path d="M312 178v-40" stroke="#1E4A2E" stroke-width="4"/>
      <path d="M266 140c8-14 20-20 34-18 6-12 22-14 32-2 10-4 22 2 24 12-10 8-24 6-34 0-8 8-24 8-34 2-8 6-18 8-22 6z" fill="#1E4A2E"/>
      <ellipse cx="75" cy="150" rx="32" ry="20" fill="#0F2E22"/>
      <circle cx="40" cy="140" r="15" fill="#0F2E22"/>
      <path d="M28 140q-10 8-6 22" stroke="#0F2E22" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M40 128q14-10 18 4q-10 6-18-4z" fill="#0F2E22"/>
      <rect x="52" y="164" width="8" height="16" fill="#0F2E22"/>
      <rect x="68" y="166" width="8" height="16" fill="#0F2E22"/>
      <rect x="86" y="166" width="8" height="16" fill="#0F2E22"/>
      <rect x="98" y="164" width="8" height="16" fill="#0F2E22"/>`,
    crater: `
      <ellipse cx="200" cy="150" rx="150" ry="34" fill="none" stroke="#2E4A2E" stroke-width="6" opacity="0.6"/>
      <ellipse cx="200" cy="156" rx="110" ry="22" fill="#3E6B3E" opacity="0.5"/>
      <ellipse cx="200" cy="160" rx="70" ry="12" fill="#5C8A4E" opacity="0.6"/>
      <ellipse cx="190" cy="160" rx="6" ry="4" fill="#0F2E22"/>
      <circle cx="130" cy="152" r="3" fill="#0F2E22"/>
      <circle cx="250" cy="158" r="3" fill="#0F2E22"/>`,
    mountain: `
      <path d="M50 178L185 42l135 136z" fill="#16314A"/>
      <path d="M270 178l45-70 35 70z" fill="#0F2438"/>
      <path d="M160 78l25-36 25 36-10 14h-30z" fill="#EAF4F8"/>
      <ellipse cx="185" cy="128" rx="150" ry="14" fill="#EAF4F8" opacity="0.18"/>
      <ellipse cx="185" cy="142" rx="175" ry="10" fill="#EAF4F8" opacity="0.12"/>`,
    lake: `
      <ellipse cx="110" cy="178" rx="16" ry="5" fill="#0E2E3A"/>
      <path d="M250 166h30l-8-15h-14z" fill="#0E2E3A"/>
      <path d="M257 151v-19" stroke="#0E2E3A" stroke-width="2"/>
      <path d="M257 133l17 10-17 4z" fill="#0E2E3A" opacity="0.85"/>
      <path d="M55 150q10-6 20 0t20 0 20 0 20 0" stroke="#0E2E3A" stroke-width="2" fill="none" opacity="0.35"/>
      <circle cx="330" cy="68" r="3" fill="#0E2E3A" opacity="0.6"/>
      <circle cx="345" cy="60" r="3" fill="#0E2E3A" opacity="0.6"/>`
  };
  return `<svg class="scene" viewBox="0 0 400 220" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
    ${defs}${sky}${['beach', 'boat', 'savanna'].includes(type) ? sun : ''}${bodies[type] || ''}${waterline}
  </svg>`;
}

function renderDestinations(list) {
  const destGrid = document.getElementById('destGrid');
  destGrid.innerHTML = '';
  if (!list.length) {
    destGrid.innerHTML = '<p style="color:var(--ink-soft); grid-column:1/-1;">No destinations match this filter yet.</p>';
    return;
  }
  list.forEach((d, i) => {
    const card = document.createElement('div');
    card.className = 'dest-card' + (d.wide ? ' wide' : '');
    const areaLabel = d.area === 'zanzibar' ? 'Zanzibar' : 'Mainland';
    card.innerHTML = `
      <div class="dest-visual">${scene(d.scene, i)}</div>
      <div class="dest-body">
        <div class="dest-region"><span class="dest-dot dest-dot-${d.area}"></span>${d.region}<span class="dest-area-tag">${areaLabel}</span></div>
        <h4>${d.name}</h4>
        <p>${d.desc}</p>
        <div class="dest-tags">${d.tags.map((t) => `<span>${t}</span>`).join('')}</div>
      </div>`;
    destGrid.appendChild(card);
  });
}

const CATEGORY_FILTERS = [
  { key: 'all', label: 'All destinations' },
  { key: 'beach', label: 'Beaches & Islands' },
  { key: 'wildlife', label: 'Wildlife & Safari' },
  { key: 'heritage', label: 'Culture & Heritage' },
  { key: 'nature', label: 'Mountains & Lakes' }
];

let allDestinations = [];
let activeFilter = 'all';

function applyFilter(key) {
  activeFilter = key;
  document.querySelectorAll('#destFilterRow .chip').forEach((c) => c.classList.toggle('sel', c.dataset.cat === key));
  const filtered = key === 'all' ? allDestinations : allDestinations.filter((d) => d.category === key);
  document.getElementById('destCount').textContent = `Showing ${filtered.length} of ${allDestinations.length} destinations`;
  renderDestinations(filtered);
}

function renderFilterBar() {
  const row = document.getElementById('destFilterRow');
  row.innerHTML = CATEGORY_FILTERS.map(
    (f) => `<button class="chip${f.key === 'all' ? ' sel' : ''}" data-cat="${f.key}">${f.label}</button>`
  ).join('');
  row.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (btn) applyFilter(btn.dataset.cat);
  });
}

const SHOWCASE_IDS = ['stone-town', 'serengeti', 'kilimanjaro', 'ngorongoro', 'mnemba', 'nungwi', 'pemba', 'lake-victoria'];

function renderShowcase(list) {
  const el = document.getElementById('showcaseScroll');
  if (!el) return;
  const featured = SHOWCASE_IDS.map((id) => list.find((d) => d.id === id)).filter(Boolean);
  el.innerHTML = featured
    .map(
      (d, i) => `<div class="showcase-card" onclick="showView('destinations')">
        <div class="sc-visual">${scene(d.scene, 'sc' + i)}</div>
        <div class="sc-body">
          <div class="sc-region">${d.region}</div>
          <h4>${d.name}</h4>
        </div>
      </div>`
    )
    .join('');
}

async function loadDestinations() {
  try {
    const res = await fetch(`${API_BASE}/destinations`);
    const data = await res.json();
    allDestinations = data.destinations || [];
    renderShowcase(allDestinations);
    renderFilterBar();
    applyFilter('all');
  } catch (err) {
    document.getElementById('destGrid').innerHTML =
      '<p style="color:var(--ink-soft);">Destinations are unavailable right now — check that the backend API is running.</p>';
  }
}

loadDestinations();
