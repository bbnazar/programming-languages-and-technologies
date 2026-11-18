// Учебное хранилище в памяти. После перезапуска сервера данные сбрасываются.
const bcrypt = require('bcryptjs');
const config = require('../config');

// Тестовые пользователи. Пароли хранятся только как bcrypt-хеш.
const users = [
  { id: 1, username: 'anna', name: 'Анна', hash: bcrypt.hashSync('test123', config.BCRYPT_ROUNDS) },
  { id: 2, username: 'boris', name: 'Борис', hash: bcrypt.hashSync('test123', config.BCRYPT_ROUNDS) }
];

let notes = [];
let nextNoteId = 1;

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function findUserById(id) {
  return users.find(u => u.id === id);
}

function listNotesByOwner(ownerId) {
  return notes.filter(n => n.ownerId === ownerId);
}

function findNote(id) {
  return notes.find(n => n.id === id);
}

function addNote(ownerId, text) {
  const note = { id: nextNoteId++, ownerId, text };
  notes.push(note);
  return note;
}

function removeNote(id) {
  notes = notes.filter(n => n.id !== id);
}

module.exports = {
  findUserByUsername,
  findUserById,
  listNotesByOwner,
  findNote,
  addNote,
  removeNote
};
