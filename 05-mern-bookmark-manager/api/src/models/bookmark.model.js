import { model, Schema } from 'mongoose';
/* =============================
📦 Create Schema
============================= */
const bookmarkSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  category: {
    type: Object,
  },
}, { timestamps: true });

/* =============================
📦 Create a model
============================= */
const Bookmark = model('Bookmark', bookmarkSchema);
/* =============================
📦 Export Schema
============================= */
export default Bookmark;
