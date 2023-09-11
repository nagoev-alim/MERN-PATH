import { model, Schema } from 'mongoose';

/* =============================
📦 Create Schema
============================= */
const bookSchema = new Schema({
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
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
  },
  series: {
    type: String,
  },
  yearPublication: {
    type: Number,
  },
  dateReading: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['No started', 'Completed', 'In Progress'],
    default: 'No started'
  },
  isbn: {
    type: String,
  },
  numberPages: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  source: {
    type: String,
  },
  quotes: {
    type: [String],
  },
}, { timestamps: true });

/* =============================
📦 Create a model
============================= */
const Book = model('Book', bookSchema);

/* =============================
📦 Export Schema
============================= */
export default Book;
