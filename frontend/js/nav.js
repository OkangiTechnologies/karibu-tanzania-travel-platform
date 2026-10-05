function showView(name) {
  document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
  document.querySelectorAll('.nav-tab').forEach((t) => t.classList.toggle('active', t.dataset.view === name));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('navTabs').addEventListener('click', (e) => {
  const btn = e.target.closest('.nav-tab');
  if (btn) showView(btn.dataset.view);
});
