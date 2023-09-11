// 🔳 Import packages
import 'colors';
// 🔳 Custom imports
import { database, configuration } from './config/index.js';
import app from './app.js';

// 🔳 Connection to MongoDB
database().then(() => {
  // Запуск сервера
  app.listen(configuration.port, () => {
    console.log(`🟢 Server started on port: 📝${configuration.port.bold.yellow.underline}`);
  });
});


