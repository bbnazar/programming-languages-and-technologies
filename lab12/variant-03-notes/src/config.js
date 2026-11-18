// Все настройки в одном месте. Значения можно переопределить переменными окружения.
module.exports = {
  PORT: Number(process.env.PORT) || 3000,

  // В реальном проекте секрет берётся только из окружения и не попадает в репозиторий
  SESSION_SECRET: process.env.SESSION_SECRET || 'dev-only-secret',

  // Время жизни сессии. Для проверки истечения: SESSION_MS=20000 npm start
  SESSION_MS: Number(process.env.SESSION_MS) || 15 * 60 * 1000,

  COOKIE_NAME: 'sid',

  // При запуске по HTTPS: COOKIE_SECURE=true
  COOKIE_SECURE: process.env.COOKIE_SECURE === 'true',

  BCRYPT_ROUNDS: 10
};
