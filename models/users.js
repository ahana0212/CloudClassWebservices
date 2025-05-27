const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  PhoneNumber: { type: String, required: true, unique: true },
  isTeacher: { type: Boolean, required: true, default: false },
  otp: { type: String },
  otpExpires: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
