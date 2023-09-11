import { database, configuration } from './config/index.js';
import app from './app.js';

// Подключение к базе данных MongoDB
database().then(() => {
  // Запуск сервера
  app.listen(configuration.port, () => {
    console.log(`🟩 Server started on port: ${configuration.port.bold.blue}`);
  });
});


