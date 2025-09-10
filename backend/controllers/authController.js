const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { createTransporter, testEmailConfig } = require("../config/emailConfig");
const { Op } = require("sequelize");

// Basic login functionality
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token, role: user.role });
};

// Password Reset Methods
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Save token to user record
    await user.update({
      resetToken,
      resetTokenExpiry
    });

    // Create transporter with new configuration
    const transporter = createTransporter();

    // Test email configuration before sending
    const isConfigValid = await testEmailConfig();
    if (!isConfigValid) {
      return res.status(500).json({ message: "Email service configuration error" });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request - HR Portal",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>You have requested to reset your password for the HR Portal.</p>
          <p>Click the button below to reset your password:</p>
          <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Reset Password
          </a>
          <p style="margin-top: 20px; color: #666;">This link will expire in 1 hour.</p>
          <p style="color: #666;">If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ 
      message: "Failed to send password reset email", 
      error: error.message 
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await db.User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          [Op.gt]: new Date()
        }
      }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash new password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // Update user password and clear reset token
    await user.update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null
    });

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyResetToken = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await db.User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          [Op.gt]: new Date()
        }
      }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    res.json({ message: "Token is valid" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
