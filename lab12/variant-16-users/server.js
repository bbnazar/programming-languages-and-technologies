// Точка входа: только запуск сервера. Вся настройка приложения в src/app.js
const app = require('./src/app');
const config = require('./src/config');

app.listen(config.PORT, () => {
  console.log('Открой http://localhost:' + config.PORT);
});
