// Логика страницы: вход, выход, личные задачи

function showLogin() {
  stopTimer();
  $('#loginForm').hidden = false;
  $('#private').hidden = true;
}

function onSessionExpired() {
  showLogin();
  setStatus('Сессия истекла, войдите снова');
}

function showPrivate(user) {
  $('#loginForm').hidden = true;
  $('#private').hidden = false;
  $('#who').textContent = user.name;
  startTimer(user.expiresAt, onSessionExpired);
  loadTasks();
}

async function loadTasks() {
  const r = await api('/api/tasks');
  if (r.status === 401) return onSessionExpired();

  const ul = $('#tasks');
  ul.innerHTML = '';
  r.data.forEach(task => {
    const li = document.createElement('li');

    const title = document.createElement('span');
    title.textContent = '#' + task.id + ' ' + task.title + ' '; // textContent: защита от XSS
    if (task.done) title.className = 'done';

    const toggle = document.createElement('button');
    toggle.textContent = task.done ? 'Вернуть' : 'Готово';
    toggle.onclick = async () => {
      await api('/api/tasks/' + task.id, 'PATCH');
      loadTasks();
    };

    const del = document.createElement('button');
    del.textContent = 'Удалить';
    del.onclick = async () => {
      await api('/api/tasks/' + task.id, 'DELETE');
      loadTasks();
    };

    li.append(title, toggle, del);
    ul.appendChild(li);
  });
}

// Попытка открыть задачу по номеру (для демонстрации 200 / 403)
async function tryOpenTask(id) {
  const r = await api('/api/tasks/' + id);
  if (r.status === 401) return onSessionExpired();
  if (r.ok) setStatus('Доступ разрешён: ' + r.data.title, true);
  else setStatus('HTTP ' + r.status + ': ' + (r.data.error || 'ошибка'));
}

// Вход
$('#loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const r = await api('/login', 'POST', {
    username: $('#username').value.trim(),
    password: $('#password').value
  });
  if (!r.ok) return setStatus(r.data.error || 'Ошибка входа');

  $('#password').value = '';
  setStatus('Вход выполнен', true);
  showPrivate(r.data);
});

// Выход
$('#logout').addEventListener('click', async () => {
  await api('/logout', 'POST');
  showLogin();
  setStatus('Вы вышли из системы', true);
});

// Добавление задачи
$('#taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const r = await api('/api/tasks', 'POST', { title: $('#taskTitle').value });
  if (r.status === 401) return onSessionExpired();
  if (!r.ok) return setStatus(r.data.error);

  setStatus('');
  $('#taskTitle').value = '';
  loadTasks();
});

$('#foreign1').addEventListener('click', () => tryOpenTask(1));
$('#foreign2').addEventListener('click', () => tryOpenTask(2));

// При загрузке/обновлении страницы проверяем, есть ли активная сессия
(async () => {
  const r = await api('/profile');
  if (r.ok) showPrivate(r.data);
  else showLogin();
})();
