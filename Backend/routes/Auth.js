import express from 'express';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: "Admin not found." });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect password." });

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET || 'vishal_secret_key',
      { expiresIn: "2h" }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 2 * 60 * 60 * 1000
    });

    res.status(200).json({ message: "Login successful!", data: { email: admin.email } });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});

export default router;
