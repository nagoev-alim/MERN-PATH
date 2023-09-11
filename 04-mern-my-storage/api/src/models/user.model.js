import { model, Schema } from 'mongoose';

/* =============================
📦 Create Schema
============================= */
const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
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
  phone: {
    type: String,
  },
  dob: {
    type: Date,
  },
  address: {
    city: { type: String },
    country: { type: String },
    zipCode: { type: String },
  },
  verified: {
    type: Boolean,
    default: false,
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
