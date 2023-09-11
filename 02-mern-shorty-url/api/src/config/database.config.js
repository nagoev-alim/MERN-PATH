import mongoose from 'mongoose';
import { configuration } from './index.js';

// 📋 Connect to MongoDB
const database = async () => {
  await mongoose
    .connect(configuration.mongo.uri)
    .then(() => console.log('🟩 MongoDB Connected'))
    .catch(e => {
      console.log(e)
      process.exit(1);
    });
};

export default database;
