// 🔳 Imports packages
import { model, Schema } from 'mongoose';

/**
 * @description Token Schema
 * @type {Schema}
 */
export default model(
  'Token',
  new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 },
  }),
);
