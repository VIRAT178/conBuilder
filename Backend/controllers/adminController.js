import { genrateToken } from "../config/utils.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

export const SignUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.json({ success: false, message: "Missing details!" });
    }

    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.json({ success: false, message: "Admin already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await Admin.create({
      firstName,
      lastName,
      email,
      password: hasedPassword,
    });

    const token = genrateToken(newAdmin._id);
    res.json({
      success: true,
      message: "Now you are Admin",
      adminData: newAdmin,
      token,
    });
  } catch (error) {
    res.json({ success: error, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminData = await Admin.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      adminData.password
    );
    if (!isPasswordCorrect) {
      res.json({ success: false, message: "Inavlid Credentials" });
    }
    if (!adminData) {
      return res.json({ success: false, message: "Email not found" });
    }

    const token = genrateToken(adminData._id);
    return res.json({
      success: true,
      message: "Logged In Successfully",
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
