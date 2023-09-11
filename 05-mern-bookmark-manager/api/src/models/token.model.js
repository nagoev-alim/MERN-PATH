import { model, Schema } from 'mongoose';

/* =============================
📦 Create Schema
============================= */
const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

/* =============================
📦 Create a model
============================= */
const Token = model('Token', tokenSchema);

/* =============================
📦 Export Schema
============================= */
export default Token;
