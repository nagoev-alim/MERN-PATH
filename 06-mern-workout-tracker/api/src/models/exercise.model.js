import { model, Schema } from 'mongoose';

/* =============================
📦 Create Schema
============================= */
const setSchema = new Schema({
  kg: { type: Number, required: false },
  reps: { type: Number, required: true },
});

const exerciseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  duration: {
    type: Number,
    required: true,
  },
  sets: [{
    type: setSchema,
    required: true,
  }],
}, { timestamps: true });

/* =============================
📦 Create a model
============================= */
const Exercise = model('Exercise', exerciseSchema);

/* =============================
📦 Export Schema
============================= */
export default Exercise;
