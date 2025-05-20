const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  uploadUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This references the User model
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Assignment", AssignmentSchema);
