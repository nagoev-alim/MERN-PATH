// 🔳 Imports packages
import mongoose from 'mongoose';
// 🔳 Custom import
import { configuration } from './index.js';

// 🟥 Connect to MongoDB
const database = async () => {
  await mongoose
    .connect(configuration.mongo.uri)
    .then(() => console.log(`🟡 MongoDB: 📝${'Connected'.toUpperCase().bold.yellow.underline}`))
    .catch(e => {
      console.log(e)
      process.exit(1);
    });
};

export default database;
