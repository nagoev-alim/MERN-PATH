// 🔳 Imports packages
import { model, Schema } from 'mongoose';

/**
 * @description Diary Schema
 * @type {Schema}
 */
export default model('Diary', new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  day: {
    type: String,
  },
  weather: {
    type: [String],
  },
  social: {
    type: [String],
  },
  school: {
    type: [String],
  },
  romance: {
    type: [String],
  },
  other: {
    type: [String],
  },
  meals: {
    type: [String],
  },
  health: {
    type: [String],
  },
  chores: {
    type: [String],
  },
  beauty: {
    type: [String],
  },
  work: {
    type: [String],
  },
  emotions: {
    type: [String],
  },
  hobbies: {
    type: [String],
  },
  events: {
    type: [String],
  },
  sleep: {
    type: String,
  },
  poster: {
    type: String,
  },
}, { timestamps: true }));
