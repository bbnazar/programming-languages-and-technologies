// Журнал событий входа/выхода (в памяти, последние 200 записей)
const MAX_ENTRIES = 200;
const entries = [];

// event: LOGIN_OK | LOGIN_FAIL | LOGOUT
function add(event, username, ip) {
  entries.push({
    time: new Date().toISOString(),
    event,
    username: username || '',
    ip: ip || ''
  });
  if (entries.length > MAX_ENTRIES) entries.shift();
}

// Новые записи сверху
function list() {
  return entries.slice().reverse();
}

module.exports = { add, list };
