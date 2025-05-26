const mongoose = require("mongoose");

const uploadedAssignmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignmentTitle: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const UploadedAssignment = mongoose.model("UploadedAssignment", uploadedAssignmentSchema);

module.exports = UploadedAssignment;
