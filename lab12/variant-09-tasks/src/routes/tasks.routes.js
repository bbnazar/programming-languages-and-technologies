const express = require('express');
const store = require('../data/store');
const { requireAuth } = require('../middleware/auth');
const { loadOwnTask } = require('../middleware/ownership');

const router = express.Router();

// Все маршруты задач требуют входа
router.use(requireAuth);

// GET /api/tasks: только свои задачи
router.get('/', (req, res) => {
  res.json(store.listTasksByOwner(req.user.id));
});

// GET /api/tasks/:id: одна задача (чужая -> 403)
router.get('/:id', loadOwnTask, (req, res) => {
  res.json(req.task);
});

// POST /api/tasks: создать задачу
router.post('/', (req, res) => {
  const title = String((req.body || {}).title || '').trim();
  if (!title) {
    return res.status(400).json({ error: 'Пустое название задачи' });
  }
  res.status(201).json(store.addTask(req.user.id, title));
});

// PATCH /api/tasks/:id: переключить «выполнено» (чужая -> 403)
router.patch('/:id', loadOwnTask, (req, res) => {
  req.task.done = !req.task.done;
  res.json(req.task);
});

// DELETE /api/tasks/:id: удалить задачу (чужая -> 403)
router.delete('/:id', loadOwnTask, (req, res) => {
  store.removeTask(req.task.id);
  res.json({ ok: true });
});

module.exports = router;
