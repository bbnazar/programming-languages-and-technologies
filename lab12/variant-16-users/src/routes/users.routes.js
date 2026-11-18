const express = require('express');
const store = require('../data/store');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Все маршруты управления пользователями: только вошедший admin
router.use(requireAuth, requireRole('admin'));

// GET /api/users: список пользователей
router.get('/', (req, res) => {
  res.json(store.listUsers());
});

// POST /api/users: создать пользователя
router.post('/', (req, res) => {
  const { username, name, password, role } = req.body || {};

  if (!username || !name || !password) {
    return res.status(400).json({ error: 'Заполните все поля' });
  }
  if (String(password).length < 6) {
    return res.status(400).json({ error: 'Пароль минимум 6 символов' });
  }
  if (store.findUserByUsername(String(username))) {
    return res.status(409).json({ error: 'Логин занят' });
  }

  const user = store.addUser({
    username: String(username),
    name: String(name),
    password: String(password),
    role
  });
  res.status(201).json(store.toPublic(user));
});

// PATCH /api/users/:id/role: переключить роль admin <-> user
router.patch('/:id/role', (req, res) => {
  const target = store.findUserById(Number(req.params.id));
  if (!target) {
    return res.status(404).json({ error: 'Пользователь не найден' });
  }
  if (target.id === req.user.id) {
    return res.status(400).json({ error: 'Нельзя менять свою роль' });
  }
  res.json(store.toPublic(store.toggleRole(target)));
});

// DELETE /api/users/:id: удалить пользователя
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (id === req.user.id) {
    return res.status(400).json({ error: 'Нельзя удалить себя' });
  }
  if (!store.findUserById(id)) {
    return res.status(404).json({ error: 'Пользователь не найден' });
  }
  store.removeUser(id);
  res.json({ ok: true });
});

module.exports = router;
