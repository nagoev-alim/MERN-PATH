import { model, Schema } from 'mongoose';

/* =============================
📦 Create Schema
============================= */
const noteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
}, { timestamps: true });

/* =============================
📦 Create a model
============================= */
const Note = model('Note', noteSchema);

/* =============================
📦 Export Schema
============================= */
export default Note;
