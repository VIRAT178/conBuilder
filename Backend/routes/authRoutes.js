import express from 'express';
import { protectRoute } from '../middleware/auth.js'; 

const router = express.Router();

router.get('/auth/check', protectRoute, (req, res) => {
  res.json({ success: true, message: "Authorized", admin: req.admin });
});

export default router;
