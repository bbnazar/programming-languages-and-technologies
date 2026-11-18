const path = require('path');
const express = require('express');
const session = require('express-session');
const config = require('./config');

const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const logsRoutes = require('./routes/logs.routes');

const app = express();

app.use(express.json());

app.use(session({
  name: config.COOKIE_NAME,
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,            // cookie недоступна из JavaScript (защита от кражи при XSS)
    sameSite: 'lax',           // базовая защита от CSRF
    secure: config.COOKIE_SECURE,
    maxAge: config.SESSION_MS
  }
}));

// Статика (HTML/CSS/JS клиента)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Маршруты
app.use('/', authRoutes);              // POST /login, POST /logout, GET /profile
app.use('/api/users', usersRoutes);    // только для admin
app.use('/api/logs', logsRoutes);      // только для admin

// Неизвестный API-маршрут
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Общий обработчик ошибок (например, некорректный JSON в запросе)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: status === 400 ? 'Некорректный запрос' : 'Внутренняя ошибка сервера'
  });
});

module.exports = app;
