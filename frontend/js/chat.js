let chatBusy = false;

async function sendChat() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text || chatBusy) return;

  input.value = '';
  appendMsg('user', text);
  chatBusy = true;
  document.getElementById('sendBtn').disabled = true;
  const typingEl = appendTyping();

  try {
    const res = await fetch(`${API_BASE}/concierge/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    typingEl.remove();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    appendMsg('bot', data.reply || "I couldn't generate a response just now — try rephrasing your question.");
  } catch (err) {
    typingEl.remove();
    appendMsg('bot', "I'm having trouble reaching the concierge service right now. Please try again in a moment.");
  }

  chatBusy = false;
  document.getElementById('sendBtn').disabled = false;
}

function sendPreset(el) {
  document.getElementById('chatInput').value = el.textContent;
  sendChat();
}

function appendMsg(role, text) {
  const log = document.getElementById('chatLog');
  const div = document.createElement('div');
  div.className = 'msg ' + role;
  div.textContent = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
  return div;
}

function appendTyping() {
  const log = document.getElementById('chatLog');
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
  return div;
}
