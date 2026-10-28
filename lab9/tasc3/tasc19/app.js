const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
const DEBOUNCE_MS = 500;

const input = document.querySelector('#search');
const retryBtn = document.querySelector('#retry');
const statusEl = document.querySelector('#status');
const statsEl = document.querySelector('#stats');
const results = document.querySelector('#results');

let timerId = null;
let controller = null;
let lastQuery = '';
let sentCount = 0;
let abortedCount = 0;

function setStatus(text, type) {
  statusEl.textContent = text;
  statusEl.className = type || '';
}

function updateStats() {
  statsEl.textContent = `Отправлено запросов: ${sentCount} | Отменено: ${abortedCount}`;
}

function renderPosts(posts) {
  results.replaceChildren();
  for (const post of posts) {
    const item = document.createElement('li');

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = `${post.id}. ${post.title}`;

    const body = document.createElement('p');
    body.className = 'body';
    body.textContent = post.body;

    item.append(title, body);
    results.append(item);
  }
}

async function search(query) {
  // отменяем предыдущий запрос, если он ещё выполняется
  if (controller) {
    controller.abort();
    abortedCount++;
  }
  controller = new AbortController();
  const { signal } = controller;

  lastQuery = query;
  retryBtn.hidden = true;
  results.replaceChildren();
  setStatus('Загрузка...', 'loading');
  sentCount++;
  updateStats();

  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(query)}&_limit=10`;
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const posts = await response.json();
    if (signal.aborted) return;

    if (!Array.isArray(posts) || posts.length === 0) {
      setStatus(`По запросу «${query}» ничего не найдено`, 'error');
      return;
    }

    renderPosts(posts);
    setStatus(`Найдено публикаций: ${posts.length}`, 'success');
  } catch (error) {
    if (error.name === 'AbortError') {
      updateStats();
      return; // запрос отменён нами — это не ошибка
    }
    setStatus(`Ошибка загрузки: ${error.message}`, 'error');
    retryBtn.hidden = false;
  }
}

input.addEventListener('input', () => {
  clearTimeout(timerId);
  const query = input.value.trim();

  if (!query) {
    if (controller) controller.abort();
    results.replaceChildren();
    retryBtn.hidden = true;
    setStatus('Введите запрос для поиска', 'waiting');
    return;
  }

  setStatus('Ожидание окончания ввода...', 'waiting');
  timerId = setTimeout(() => search(query), DEBOUNCE_MS);
});

retryBtn.addEventListener('click', () => {
  if (lastQuery) search(lastQuery);
});

updateStats();