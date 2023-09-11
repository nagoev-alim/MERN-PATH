// Подключение необходимых модулей
import express from 'express';
import router from './routes/index.js';
import cors from 'cors';
import 'colors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import { config } from './config/index.js';
import { errorHandler } from './middleware/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Инициализация Express приложения
const app = express();

// Использование Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Подключение маршрутов
app.use('/api', router);

// Настройка продакшена
if (config.env === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'dist', 'index.html')));
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

// Обработка ошибок
app.use(errorHandler);

export default app;
