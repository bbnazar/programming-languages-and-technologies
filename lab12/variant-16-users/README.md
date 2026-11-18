# Лабораторная №12, вариант 16: управление пользователями

Роли admin/user, защищённое API, журнал событий входа и выхода.

## Запуск
```
npm install
npm start
```
Открыть http://localhost:3000

Проверка истёкшей сессии (20 секунд): `SESSION_MS=20000 npm start`
(в Windows PowerShell: `$env:SESSION_MS=20000; npm start`)

## Тестовые учётные записи
| Логин | Пароль | Роль |
|-------|--------|------|
| admin | admin123 | admin |
| anna  | test123 | user |
| boris | test123 | user |

## Структура проекта
```
variant-16-users/
├── server.js                  точка входа (запуск сервера)
├── package.json
├── src/
│   ├── app.js                 настройка Express, сессий, подключение маршрутов
│   ├── config.js              настройки (порт, секрет, срок сессии)
│   ├── data/
│   │   ├── store.js           пользователи с ролями (хранилище в памяти)
│   │   └── auditLog.js        журнал входа/выхода
│   ├── middleware/
│   │   └── auth.js            requireAuth (401), requireRole (403)
│   └── routes/
│       ├── auth.routes.js     POST /login, POST /logout, GET /profile
│       ├── users.routes.js    /api/users (только admin)
│       └── logs.routes.js     /api/logs (только admin)
├── public/
│   ├── index.html             разметка
│   ├── css/style.css          стили
│   └── js/
│       ├── api.js             запросы к серверу, вывод сообщений
│       ├── timer.js           индикатор времени сессии
│       ├── admin.js           таблицы пользователей и журнала
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
| GET, POST | /api/users | admin | 200, 201 / 401 / 403 / 400 / 409 |
| PATCH | /api/users/:id/role | admin | 200 / 400 своя роль / 404 |
| DELETE | /api/users/:id | admin | 200 / 400 себя / 404 |
| GET | /api/logs | admin | 200 / 401 / 403 |
