import mongoose from 'mongoose';
import { config } from './index.js';

const dbConnection = async () => {
  await mongoose
    .connect(config.mongo.uri)
    .then(() => console.log('🟩 MongoDB Connected'))
    .catch(e => {
      console.log(e)
      process.exit(1);
    });
};

export default dbConnection;
