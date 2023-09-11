import { config, dbConnection } from './config/index.js';
import app from './app.js';

// Подключение к базе данных MongoDB
dbConnection();

// Запуск сервера
app.listen(config.port, () => console.log(`🟩 Server started on port: ${config.port.bold.blue}`));
