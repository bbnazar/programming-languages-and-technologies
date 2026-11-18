# Лабораторная №12, вариант 3: система заметок

Вход/выход, приватная страница с заметками, серверная сессия (cookie HttpOnly).

## Запуск
```
npm install
npm start
```
Открыть http://localhost:3000

Проверка истёкшей сессии (20 секунд): `SESSION_MS=20000 npm start`
(в Windows PowerShell: `$env:SESSION_MS=20000; npm start`)

## Тестовые учётные записи
| Логин | Пароль |
|-------|--------|
| anna  | test123 |
| boris | test123 |

## Структура проекта
```
variant-03-notes/
├── server.js                  точка входа (запуск сервера)
├── package.json
├── src/
│   ├── app.js                 настройка Express, сессий, подключение маршрутов
│   ├── config.js              настройки (порт, секрет, срок сессии)
│   ├── data/
│   │   └── store.js           пользователи и заметки (хранилище в памяти)
│   ├── middleware/
│   │   └── auth.js            requireAuth: проверка сессии (401)
│   └── routes/
│       ├── auth.routes.js     POST /login, POST /logout, GET /profile
│       └── notes.routes.js    GET/POST/DELETE /api/notes
├── public/
│   ├── index.html             разметка
│   ├── css/style.css          стили
│   └── js/
│       ├── api.js             запросы к серверу, вывод сообщений
│       ├── timer.js           индикатор времени сессии
│       └── app.js             логика страницы
├── REPORT.md                  отчёт
└── QUESTIONS.md               ответы на контрольные вопросы
```

## API
| Метод | Путь | Доступ | Результат |
|-------|------|--------|-----------|
| POST | /login | все | 200 профиль / 400 пустые поля / 401 неверные данные |
| POST | /logout | все | 200, сессия уничтожена |
| GET | /profile | вошедшие | 200 / 401 |
| GET, POST | /api/notes | вошедшие | свои заметки / 401 |
| DELETE | /api/notes/:id | владелец | 200 / 403 чужая / 404 |
