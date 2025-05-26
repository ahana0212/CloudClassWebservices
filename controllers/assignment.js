const Assignment = require("../models/assignments");

// Create a new assignment
const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, attachmentUrl } = req.body;
    const createdBy = req.user._id; // from middleware if using auth

    if (!title || !dueDate) {
      return res.status(400).json({ success: false, message: "Title and due date are required" });
    }

    const assignment = new Assignment({
      title,
      description,
      dueDate,
      attachmentUrl,
      createdBy,
    });

    await assignment.save();
    res.status(201).json({ success: true, assignment });
  } catch (err) {
    console.error("Error creating assignment:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all assignments (optional)
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate("createdBy", "name email");
    res.json({ success: true, assignments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch assignments" });
  }
};

module.exports = {
  createAssignment,
  getAllAssignments,
};
