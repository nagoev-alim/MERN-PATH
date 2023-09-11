import { model, Schema } from 'mongoose';

/* =============================
📦 Create Schema
============================= */
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

/* =============================
📦 Create a model
============================= */
const User = model('User', userSchema);

/* =============================
📦 Export Schema
============================= */
export default User;
