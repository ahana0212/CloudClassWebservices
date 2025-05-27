const User = require("../models/users");
const crypto = require("crypto");
const sendMsgToPhone = require("../utils/sendOTPtoMobile");

// Generate OTP for login
exports.generate_otp_for_login = async (req, res) => {
  try {
    const { userName } = req.body;
    const PhoneNumber = userName;
    const user = await User.findOne({ PhoneNumber });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpires = expires;
    await user.save();

    await sendMsgToPhone(PhoneNumber, otp); // Send email

    res.status(200).json({ message: "OTP sent successfully", success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Validate OTP
exports.validate_otp = async (req, res) => {
  try {
    const { userName, otp } = req.body;
    const PhoneNumber = userName;
    const user = await User.findOne({ PhoneNumber });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ error: "OTP expired" });
    }

    // OTP is valid — you can now log in the user
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "OTP validated successfully", success: true, authToken: "dksvnjdvbjkdfvjndjkfvbjdfnvjdbnv" , user: userName });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
