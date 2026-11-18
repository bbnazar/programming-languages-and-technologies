# Лабораторная №12, вариант 9: сервис задач

Вход/выход, личные задачи, запрет просмотра и изменения чужих задач (403).

## Запуск
```
npm install
npm start
```
Открыть http://localhost:3000

Проверка истёкшей сессии (20 секунд): `SESSION_MS=20000 npm start`
(в Windows PowerShell: `$env:SESSION_MS=20000; npm start`)

## Тестовые учётные записи
| Логин | Пароль | Начальная задача |
|-------|--------|------------------|
| anna  | test123 | №1 |
| boris | test123 | №2 |

## Структура проекта
```
variant-09-tasks/
├── server.js                  точка входа (запуск сервера)
├── package.json
├── src/
│   ├── app.js                 настройка Express, сессий, подключение маршрутов
│   ├── config.js              настройки (порт, секрет, срок сессии)
│   ├── data/
│   │   └── store.js           пользователи и задачи (хранилище в памяти)
│   ├── middleware/
│   │   ├── auth.js            requireAuth: проверка сессии (401)
│   │   └── ownership.js       loadOwnTask: проверка владельца (404 / 403)
│   └── routes/
│       ├── auth.routes.js     POST /login, POST /logout, GET /profile
│       └── tasks.routes.js    /api/tasks
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
| GET, POST | /api/tasks | вошедшие | свои задачи / 401 |
| GET, PATCH, DELETE | /api/tasks/:id | владелец | 200 / 403 чужая / 404 |
