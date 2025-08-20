import Admin from '../models/Admin.js'
import jwt from 'jsonwebtoken';
export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decode.adminId).select("-password");
    if (!admin) {
      return res.status(401).json({ success: false, message: "Admin not found!" });
    }
    req.admin = admin;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
