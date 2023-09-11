import { model, Schema } from 'mongoose';

/* =============================
📦 Create Schema
============================= */
const movieSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  poster: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  yearProduction: {
    type: Number,
  },
  country: {
    type: String,
  },
  genre: {
    type: [String],
  },
  slogan: {
    type: String,
  },
  directed: {
    type: String,
  },
  time: {
    type: String,
  },
  review: {
    type: String,
  },
  dateViewing: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['No started', 'Completed', 'In Progress'],
  },
}, { timestamps: true });

/* =============================
📦 Create a model
============================= */
const Movie = model('Movie', movieSchema);

/* =============================
📦 Export Schema
============================= */
export default Movie;
