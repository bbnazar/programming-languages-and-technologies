// Учебное хранилище пользователей в памяти. После перезапуска сервера данные сбрасываются.
const bcrypt = require('bcryptjs');
const config = require('../config');

// Тестовые пользователи. Пароли хранятся только как bcrypt-хеш.
let users = [
  { id: 1, username: 'admin', name: 'Администратор', role: 'admin', hash: bcrypt.hashSync('admin123', config.BCRYPT_ROUNDS) },
  { id: 2, username: 'anna', name: 'Анна', role: 'user', hash: bcrypt.hashSync('test123', config.BCRYPT_ROUNDS) },
  { id: 3, username: 'boris', name: 'Борис', role: 'user', hash: bcrypt.hashSync('test123', config.BCRYPT_ROUNDS) }
];
let nextUserId = 4;

// Пользователь без хеша пароля: это можно отдавать клиенту
function toPublic(user) {
  return { id: user.id, username: user.username, name: user.name, role: user.role };
}

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function findUserById(id) {
  return users.find(u => u.id === id);
}

function listUsers() {
  return users.map(toPublic);
}

function addUser({ username, name, password, role }) {
  const user = {
    id: nextUserId++,
    username,
    name,
    role: role === 'admin' ? 'admin' : 'user',
    hash: bcrypt.hashSync(password, config.BCRYPT_ROUNDS)
  };
  users.push(user);
  return user;
}

function toggleRole(user) {
  user.role = user.role === 'admin' ? 'user' : 'admin';
  return user;
}

function removeUser(id) {
  users = users.filter(u => u.id !== id);
}

module.exports = {
  toPublic,
  findUserByUsername,
  findUserById,
  listUsers,
  addUser,
  toggleRole,
  removeUser
};
