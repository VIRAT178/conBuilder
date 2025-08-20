import express from 'express';
import { protectRoute } from '../middleware/auth.js'; 

const router = express.Router();
router.post('/auth/logout', (req, res) => {
  res.clearCookie('token'); 
  res.json({ success: true, message: "Logged out successfully" });
});

router.get('/auth/check', protectRoute, (req, res) => {
  res.json({ success: true, message: "Authorized", admin: req.admin });
});

export default router;
