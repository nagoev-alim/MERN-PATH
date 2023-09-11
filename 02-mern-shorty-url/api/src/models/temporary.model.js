import { model, Schema } from 'mongoose';

/* =============================
📦 Create Schema
============================= */
const temporarySchema = new Schema({
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
const Temporary = model('Temporary', temporarySchema);

/* =============================
📦 Export Schema
============================= */
export default Temporary;
