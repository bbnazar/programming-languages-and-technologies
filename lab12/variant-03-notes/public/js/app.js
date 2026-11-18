// Логика страницы: вход, выход, заметки

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
  loadNotes();
}

async function loadNotes() {
  const r = await api('/api/notes');
  if (r.status === 401) return onSessionExpired();

  const ul = $('#notes');
  ul.innerHTML = '';
  r.data.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note.text + ' '; // textContent: защита от XSS

    const del = document.createElement('button');
    del.textContent = 'Удалить';
    del.onclick = async () => {
      await api('/api/notes/' + note.id, 'DELETE');
      loadNotes();
    };

    li.appendChild(del);
    ul.appendChild(li);
  });
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

// Добавление заметки
$('#noteForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const r = await api('/api/notes', 'POST', { text: $('#noteText').value });
  if (r.status === 401) return onSessionExpired();
  if (!r.ok) return setStatus(r.data.error);

  setStatus('');
  $('#noteText').value = '';
  loadNotes();
});

// При загрузке/обновлении страницы проверяем, есть ли активная сессия
(async () => {
  const r = await api('/profile');
  if (r.ok) showPrivate(r.data);
  else showLogin();
})();
