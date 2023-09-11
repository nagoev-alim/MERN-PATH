import { model, Schema } from 'mongoose';

/* =============================
📦 Create Schema
============================= */
const categorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
}, { timestamps: true });

/* =============================
📦 Create a model
============================= */
const Category = model('Category', categorySchema);

/* =============================
📦 Export Schema
============================= */
export default Category;
