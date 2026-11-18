// Учебное хранилище в памяти. После перезапуска сервера данные сбрасываются.
const bcrypt = require('bcryptjs');
const config = require('../config');

// Тестовые пользователи. Пароли хранятся только как bcrypt-хеш.
const users = [
  { id: 1, username: 'anna', name: 'Анна', hash: bcrypt.hashSync('test123', config.BCRYPT_ROUNDS) },
  { id: 2, username: 'boris', name: 'Борис', hash: bcrypt.hashSync('test123', config.BCRYPT_ROUNDS) }
];

// Начальные задачи: №1 принадлежит Анне, №2 принадлежит Борису.
// Нужны для проверки сценария «доступ к чужому ресурсу».
let tasks = [
  { id: 1, ownerId: 1, title: 'Сдать лабораторную №12', done: false },
  { id: 2, ownerId: 2, title: 'Подготовить отчёт', done: false }
];
let nextTaskId = 3;

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function findUserById(id) {
  return users.find(u => u.id === id);
}

function listTasksByOwner(ownerId) {
  return tasks.filter(t => t.ownerId === ownerId);
}

function findTask(id) {
  return tasks.find(t => t.id === id);
}

function addTask(ownerId, title) {
  const task = { id: nextTaskId++, ownerId, title, done: false };
  tasks.push(task);
  return task;
}

function removeTask(id) {
  tasks = tasks.filter(t => t.id !== id);
}

module.exports = {
  findUserByUsername,
  findUserById,
  listTasksByOwner,
  findTask,
  addTask,
  removeTask
};
