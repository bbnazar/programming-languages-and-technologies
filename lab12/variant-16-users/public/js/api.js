// Общие вспомогательные функции клиента

const $ = (selector) => document.querySelector(selector);

// Показать сообщение пользователю (ok = true -> зелёное, иначе красное)
function setStatus(message, ok) {
  const el = $('#status');
  el.textContent = message || '';
  el.className = 'status ' + (message ? (ok ? 'ok' : 'error') : '');
}

// Запрос к серверу. Всегда возвращает { status, ok, data }, не бросает исключений на 4xx/5xx
async function api(url, method = 'GET', body) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}
