// Панель администратора: таблицы пользователей и журнала

function addRow(table, cells, isHeader) {
  const tr = document.createElement('tr');
  cells.forEach(cell => {
    const td = document.createElement(isHeader ? 'th' : 'td');
    if (cell instanceof Node) td.appendChild(cell);
    else td.textContent = cell; // textContent: защита от XSS
    tr.appendChild(td);
  });
  table.appendChild(tr);
}

function makeButton(text, handler) {
  const b = document.createElement('button');
  b.textContent = text;
  b.addEventListener('click', handler);
  return b;
}

async function loadAdmin() {
  const users = await api('/api/users');
  if (users.status === 401) return onSessionExpired();
  if (!users.ok) return setStatus('HTTP ' + users.status + ': ' + (users.data.error || 'ошибка'));

  $('#adminPanel').hidden = false;

  // Таблица пользователей
  const usersTable = $('#usersTable');
  usersTable.innerHTML = '';
  addRow(usersTable, ['ID', 'Логин', 'Имя', 'Роль', 'Действия'], true);

  users.data.forEach(u => {
    const actions = document.createElement('span');
    actions.append(
      makeButton('Сменить роль', async () => {
        const r = await api('/api/users/' + u.id + '/role', 'PATCH');
        setStatus(r.ok ? '' : r.data.error);
        loadAdmin();
      }),
      makeButton('Удалить', async () => {
        const r = await api('/api/users/' + u.id, 'DELETE');
        setStatus(r.ok ? '' : r.data.error);
        loadAdmin();
      })
    );
    addRow(usersTable, [u.id, u.username, u.name, u.role, actions]);
  });

  // Журнал входа/выхода
  const logs = await api('/api/logs');
  const logsTable = $('#logsTable');
  logsTable.innerHTML = '';
  addRow(logsTable, ['Время', 'Событие', 'Логин', 'IP'], true);
  if (logs.ok) {
    logs.data.forEach(e => {
      addRow(logsTable, [new Date(e.time).toLocaleString(), e.event, e.username, e.ip]);
    });
  }
}
