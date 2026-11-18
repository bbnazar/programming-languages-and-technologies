const express = require('express');
const store = require('../data/store');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Все маршруты заметок требуют входа
router.use(requireAuth);

// GET /api/notes: только свои заметки
router.get('/', (req, res) => {
  res.json(store.listNotesByOwner(req.user.id));
});

// POST /api/notes: создать заметку
router.post('/', (req, res) => {
  const text = String((req.body || {}).text || '').trim();
  if (!text) {
    return res.status(400).json({ error: 'Пустая заметка' });
  }
  res.status(201).json(store.addNote(req.user.id, text));
});

// DELETE /api/notes/:id: удалить свою заметку (чужая -> 403)
router.delete('/:id', (req, res) => {
  const note = store.findNote(Number(req.params.id));
  if (!note) {
    return res.status(404).json({ error: 'Заметка не найдена' });
  }
  if (note.ownerId !== req.user.id) {
    return res.status(403).json({ error: 'Это чужая заметка' });
  }
  store.removeNote(note.id);
  res.json({ ok: true });
});

module.exports = router;
