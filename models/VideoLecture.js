const mongoose = require("mongoose");

const videoLectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videoFile: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming teacher is a User with isTeacher = true
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const VideoLecture = mongoose.model("VideoLecture", videoLectureSchema);

module.exports = VideoLecture;
