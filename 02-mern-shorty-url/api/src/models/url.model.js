import { model, Schema } from 'mongoose';

/* =============================
📦 Create Schema
============================= */
const urlSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  shortenId: {
    type: String,
  },
  shortenUrl: {
    type: String,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
}, { timestamps: true });

/* =============================
📦 Create a model
============================= */
const Url = model('Url', urlSchema);

/* =============================
📦 Export Schema
============================= */
export default Url;
