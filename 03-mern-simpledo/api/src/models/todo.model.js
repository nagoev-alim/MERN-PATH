import { model, Schema } from 'mongoose';

/* =============================
📦 Create Schema
============================= */
const todoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

/* =============================
📦 Create a model
============================= */
const Todo = model('Todo', todoSchema);

/* =============================
📦 Export Schema
============================= */
export default Todo;
