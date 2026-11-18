const store = require('../data/store');

// Пропускает дальше только пользователей с действующей сессией.
// Нет сессии или пользователь не найден -> 401.
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Требуется вход' });
  }
  const user = store.findUserById(req.session.userId);
  if (!user) {
    return res.status(401).json({ error: 'Пользователь не найден' });
  }
  req.user = user;
  next();
}

// Проверка роли на сервере. Должна идти после requireAuth.
// Роль берётся из серверных данных, а не из запроса клиента. Не хватает прав -> 403.
function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Недостаточно прав' });
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };
