// 🔳 Import packages
import express from 'express';
import cors from 'cors';
import 'colors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';

// 🔳 Custom import
import router from './routes/index.js';
import { configuration } from './config/index.js';
import { errorHandlerMiddleware } from './middlewares/index.js';

// 🔳 Dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 🔳 Express App Initialization
const app = express();

// 🔳 Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: configuration.url.client,
  credentials: true
}));
app.use(cookieParser());

// 🔳 Include routes
app.use('/api', router);

// 🔳 Setup production server
if (configuration.env === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', '../', 'client', 'dist', 'index.html')));
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

// 🔳 Error handler
app.use(errorHandlerMiddleware);

export default app;
