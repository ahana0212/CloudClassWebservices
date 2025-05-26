const VideoLecture = require("../models/VideoLecture");

const uploadVideoLecture = async (req, res) => {
  try {
    const { title, uploadedBy } = req.body;
    const videoFile = req.file?.filename;

    if (!videoFile) {
      return res.status(400).json({ error: "Video file is required" });
    }

    const newLecture = new VideoLecture({
      title,
      videoFile,
      uploadedBy,
    });

    await newLecture.save();

    res.status(201).json({ message: "Video lecture uploaded successfully", lecture: newLecture });
  } catch (error) {
    console.error("Video upload error:", error);
    res.status(500).json({ error: "Server error while uploading video lecture" });
  }
};

const getAllVideoLectures = async (req, res) => {
  try {
    const lectures = await VideoLecture.find().populate("uploadedBy", "name email");
    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video lectures" });
  }
};

module.exports = {
  uploadVideoLecture,
  getAllVideoLectures,
};
