const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { uploadAssignment, getAllUploadedAssignments } = require("../controllers/uploadedAssignmentController");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uploadAssignment);
router.get("/all", getAllUploadedAssignments);

module.exports = router;
