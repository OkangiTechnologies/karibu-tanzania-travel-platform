function updateDays() {
  const v = document.getElementById('daysRange').value;
  document.getElementById('daysVal').textContent = v;
  document.getElementById('daysHintLbl').textContent = v + ' days';
}

document.getElementById('interestChips').addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (chip) chip.classList.toggle('sel');
});

async function generateItinerary() {
  const days = Number(document.getElementById('daysRange').value);
  const budget = document.getElementById('budgetSelect').value;
  const party = document.getElementById('partySelect').value;
  const region = document.getElementById('regionSelect').value;
  const interests = Array.from(document.querySelectorAll('#interestChips .chip.sel')).map((c) => c.dataset.v);

  const btn = document.getElementById('genBtn');
  btn.disabled = true;
  btn.textContent = 'Generating itinerary…';
  const panel = document.getElementById('itinPanel');
  panel.innerHTML = '<div class="itin-empty"><div class="typing" style="justify-content:center;"><span></span><span></span><span></span></div><p style="margin-top:14px;">Drafting your day-by-day plan…</p></div>';

  try {
    const res = await fetch(`${API_BASE}/itinerary/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ days, budget, party, interests, region })
    });
    const plan = await res.json();
    if (!res.ok) throw new Error(plan.error || 'Request failed');
    renderItinerary(plan, plan.meta || { days, budget, party, region });
  } catch (err) {
    panel.innerHTML = '<div class="itin-empty"><p>The planner couldn\'t generate an itinerary just now. Please try again.</p></div>';
  }

  btn.disabled = false;
  btn.textContent = 'Generate itinerary';
}

const REGION_LABELS = {
  zanzibar: 'Zanzibar',
  safari: 'Northern Safari Circuit',
  combined: 'Safari + Zanzibar'
};

function renderItinerary(plan, meta) {
  const panel = document.getElementById('itinPanel');
  const regionLabel = REGION_LABELS[meta.region] || 'Zanzibar';
  let html = `<div class="itin-header">
    <div><h3>Your ${regionLabel} itinerary</h3><p>${escapeHtml(plan.summary || '')}</p></div>
    <div class="itin-tag">${escapeHtml(String(meta.budget).replace('-', ' '))}</div>
  </div>`;

  (plan.days || []).forEach((d) => {
    html += `<div class="day-card">
      <div class="day-num">DAY ${d.day}</div>
      <h4>${escapeHtml(d.title || '')}</h4>
      <div class="day-slot"><b>Morning</b><span>${escapeHtml(d.morning || '')}</span></div>
      <div class="day-slot"><b>Afternoon</b><span>${escapeHtml(d.afternoon || '')}</span></div>
      <div class="day-slot"><b>Evening</b><span>${escapeHtml(d.evening || '')}</span></div>
      ${d.tip ? `<div class="day-tip">💡 ${escapeHtml(d.tip)}</div>` : ''}
    </div>`;
  });

  panel.innerHTML = html;
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}
