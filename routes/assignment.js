const express = require("express");
const { createAssignment, getAllAssignments } = require("../controllers/assignment");
const router = express.Router();

// Create assignment (POST)
router.post("/create", createAssignment);

// Get all assignments (GET)
router.get("/", getAllAssignments);

module.exports = router;
