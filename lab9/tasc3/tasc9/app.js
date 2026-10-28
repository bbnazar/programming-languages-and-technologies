const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=30';

const loadBtn = document.querySelector('#load');
const retryBtn = document.querySelector('#retry');
const filterBtns = document.querySelectorAll('.filter');
const statusEl = document.querySelector('#status');
const statsEl = document.querySelector('#stats');
const results = document.querySelector('#results');

let allTodos = [];
let currentFilter = 'all';

function setStatus(text, type) {
  statusEl.textContent = text;
  statusEl.className = type || '';
}

function setFiltersEnabled(enabled) {
  filterBtns.forEach((btn) => { btn.disabled = !enabled; });
}

function getFiltered() {
  if (currentFilter === 'done') return allTodos.filter((t) => t.completed);
  if (currentFilter === 'active') return allTodos.filter((t) => !t.completed);
  return allTodos;
}

function render() {
  const todos = getFiltered();
  results.replaceChildren();

  if (todos.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = 'В этой категории задач нет';
    results.append(empty);
  }

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

  const done = allTodos.filter((t) => t.completed).length;
  statsEl.textContent =
    `Показано: ${todos.length} из ${allTodos.length} | ` +
    `Выполнено: ${done} | Не выполнено: ${allTodos.length - done}`;
}

async function loadTodos() {
  loadBtn.disabled = true;
  retryBtn.hidden = true;
  setFiltersEnabled(false);
  results.replaceChildren();
  statsEl.textContent = '';
  setStatus('Загрузка...', 'loading');

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      allTodos = [];
      setStatus('Данные не найдены', 'error');
      return;
    }

    allTodos = data;
    render();
    setFiltersEnabled(true);
    setStatus(`Загружено задач: ${allTodos.length}`, 'success');
  } catch (error) {
    allTodos = [];
    setStatus(`Ошибка загрузки: ${error.message}`, 'error');
    retryBtn.hidden = false;
  } finally {
    loadBtn.disabled = false;
  }
}

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach((b) => b.classList.toggle('active', b === btn));
    render();
  });
});

loadBtn.addEventListener('click', loadTodos);
retryBtn.addEventListener('click', loadTodos);