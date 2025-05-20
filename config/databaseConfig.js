// File: config/db.js or database.js
const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/virtual_classroom", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB (localhost)");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectToDB;
