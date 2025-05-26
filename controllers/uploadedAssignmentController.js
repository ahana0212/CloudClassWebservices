const UploadedAssignment = require("../models/uploadedAssignment");

const uploadAssignment = async (req, res) => {
  try {
    const { studentId, assignmentTitle } = req.body;
    const file = req.file?.filename;

    if (!file) {
      return res.status(400).json({ error: "File is required" });
    }

    const newUpload = new UploadedAssignment({
      studentId,
      assignmentTitle,
      file,
    });

    await newUpload.save();

    res.status(201).json({ message: "Assignment uploaded successfully", upload: newUpload });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error while uploading assignment" });
  }
};

const getAllUploadedAssignments = async (req, res) => {
  try {
    const uploads = await UploadedAssignment.find().populate("studentId", "name email");
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch uploaded assignments" });
  }
};

module.exports = {
  uploadAssignment,
  getAllUploadedAssignments,
};
