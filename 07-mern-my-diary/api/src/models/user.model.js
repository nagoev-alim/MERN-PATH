// 🔳 Imports packages
import { model, Schema } from 'mongoose';

/**
 * @description User Schema
 * @type {Schema}
 */
export default model(
  'User',
  new Schema({
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  }, { timestamps: true }));
