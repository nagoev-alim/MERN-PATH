import { model, Schema } from 'mongoose';

/* =============================
📦 Create Schema
============================= */
const userSchema = new Schema({
  username: {
    type: String,
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
  // Uncomment if you need mail notification
  // verified: {
  //   type: Boolean,
  //   default: false,
  // },
}, { timestamps: true });

/* =============================
📦 Create a model
============================= */
const User = model('User', userSchema);

/* =============================
📦 Export Schema
============================= */
export default User;
