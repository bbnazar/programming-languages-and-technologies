const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('../config');
const store = require('../data/store');
const auditLog = require('../data/auditLog');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Данные профиля для клиента (без хеша пароля) + время окончания сессии
function profile(req, user) {
  return { ...store.toPublic(user), expiresAt: req.session.cookie.expires };
}

// POST /login: проверка учётных данных и создание сессии
router.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Заполните логин и пароль' });
  }

  const user = store.findUserByUsername(String(username));
  if (!user || !bcrypt.compareSync(String(password), user.hash)) {
    auditLog.add('LOGIN_FAIL', String(username), req.ip);
    return res.status(401).json({ error: 'Неверный логин или пароль' });
  }

  // Новая сессия после входа (защита от фиксации сессии)
  req.session.regenerate(err => {
    if (err) return res.status(500).json({ error: 'Ошибка сессии' });
    req.session.userId = user.id;
    auditLog.add('LOGIN_OK', user.username, req.ip);
    res.json(profile(req, user));
  });
});

// POST /logout: уничтожение сессии и удаление cookie
router.post('/logout', (req, res) => {
  const user = store.findUserById(req.session.userId);
  if (user) auditLog.add('LOGOUT', user.username, req.ip);

  req.session.destroy(() => {
    res.clearCookie(config.COOKIE_NAME);
    res.json({ ok: true });
  });
});

// GET /profile: данные текущего пользователя (нужна сессия)
router.get('/profile', requireAuth, (req, res) => {
  res.json(profile(req, req.user));
});

module.exports = router;
