const store = require('../data/store');

// Находит задачу по :id и проверяет, что она принадлежит текущему пользователю.
// Задачи нет -> 404, задача чужая -> 403. Должен идти после requireAuth.
function loadOwnTask(req, res, next) {
  const task = store.findTask(Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Задача не найдена' });
  }
  if (task.ownerId !== req.user.id) {
    return res.status(403).json({ error: 'Доступ к чужой задаче запрещён' });
  }
  req.task = task;
  next();
}

module.exports = { loadOwnTask };
