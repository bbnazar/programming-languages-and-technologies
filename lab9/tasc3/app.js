const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=10';

const loadBtn = document.querySelector('#load');
const retryBtn = document.querySelector('#retry');
const statusEl = document.querySelector('#status');
const statsEl = document.querySelector('#stats');
const results = document.querySelector('#results');

function setStatus(text, type) {
  statusEl.textContent = text;
  statusEl.className = type || '';
}

function renderTodos(todos) {
  results.replaceChildren();
  for (const todo of todos) {
    const item = document.createElement('li');
    item.classList.toggle('done', todo.completed === true);

    const mark = document.createElement('span');
    mark.className = 'mark';
    mark.textContent = todo.completed ? '✓' : '✗';

    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = `${todo.id}. ${todo.title}`;

    item.append(mark, title);
    results.append(item);
  }
}

function renderStats(todos) {
  const done = todos.filter((t) => t.completed).length;
  statsEl.textContent = `Выполнено: ${done} | Не выполнено: ${todos.length - done}`;
}

async function loadTodos() {
  loadBtn.disabled = true;
  retryBtn.hidden = true;
  results.replaceChildren();
  statsEl.textContent = '';
  setStatus('Загрузка...', 'loading');

  const startedAt = performance.now();

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const todos = await response.json();

    if (!Array.isArray(todos) || todos.length === 0) {
      setStatus('Данные не найдены', 'error');
      return;
    }

    renderTodos(todos);
    renderStats(todos);

    const elapsed = Math.round(performance.now() - startedAt);
    setStatus(`Загружено задач: ${todos.length} (за ${elapsed} мс)`, 'success');
  } catch (error) {
    setStatus(`Ошибка загрузки: ${error.message}`, 'error');
    retryBtn.hidden = false;
  } finally {
    loadBtn.disabled = false;
  }
}

loadBtn.addEventListener('click', loadTodos);
retryBtn.addEventListener('click', loadTodos);