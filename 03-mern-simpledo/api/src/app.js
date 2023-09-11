// Подключение необходимых модулей
import express from 'express';
import router from './routes/index.js';
import cors from 'cors';
import 'colors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import { configuration } from './config/index.js';
import { errorHandlerMiddleware } from './middleware/index.js';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Инициализация Express приложения
const app = express();

// Использование Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  credential: '*',
}));

// Подключение маршрутов
app.use('/api', router);

// Настройка продакшена
if (configuration.env === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', '../', 'client', 'dist', 'index.html')));
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

// Обработка ошибок
app.use(errorHandlerMiddleware);

export default app;
