// Логика страницы: вход, выход, роли

function showLogin() {
  stopTimer();
  $('#loginForm').hidden = false;
  $('#private').hidden = true;
  $('#adminPanel').hidden = true;
}

function onSessionExpired() {
  showLogin();
  setStatus('Сессия истекла, войдите снова');
}

function showPrivate(user) {
  $('#loginForm').hidden = true;
  $('#private').hidden = false;
  $('#who').textContent = user.name;
  $('#role').textContent = user.role;
  startTimer(user.expiresAt, onSessionExpired);

  // Панель админа скрываем для user. Это только удобство: доступ всё равно проверяет сервер.
  if (user.role === 'admin') loadAdmin();
  else $('#adminPanel').hidden = true;
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

// Выход с подтверждением (творческое задание)
$('#logout').addEventListener('click', async () => {
  if (!confirm('Выйти из системы?')) return;
  await api('/logout', 'POST');
  showLogin();
  setStatus('Вы вышли из системы', true);
});

// Попытка открыть журнал: admin получит 200, обычный user получит 403
$('#tryAdmin').addEventListener('click', async () => {
  const r = await api('/api/logs');
  if (r.status === 401) return onSessionExpired();
  if (r.ok) setStatus('Доступ к журналу разрешён', true);
  else setStatus('HTTP ' + r.status + ': ' + (r.data.error || 'ошибка'));
});

// Создание пользователя
$('#userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const r = await api('/api/users', 'POST', {
    username: $('#newUsername').value.trim(),
    name: $('#newName').value.trim(),
    password: $('#newPassword').value,
    role: $('#newRole').value
  });
  if (r.status === 401) return onSessionExpired();
  if (!r.ok) return setStatus(r.data.error);

  setStatus('Пользователь создан', true);
  e.target.reset();
  loadAdmin();
});

// При загрузке/обновлении страницы проверяем, есть ли активная сессия
(async () => {
  const r = await api('/profile');
  if (r.ok) showPrivate(r.data);
  else showLogin();
})();
