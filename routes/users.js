// File: routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const authController = require("../controllers/auth");

// Routes
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/auth/request-otp", authController.generate_otp_for_login);
router.post("/auth/verify-otp", authController.validate_otp);


module.exports = router;
