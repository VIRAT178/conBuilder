import express from 'express';
import {
  subscribeEmail,
  getAllSubscribers,
  deleteSubscriber
} from '../controllers/newsletterController.js';
import { protectRoute } from '../middleware/auth.js';

const router = express.Router();

router.post('/', subscribeEmail);
router.get('/',protectRoute, getAllSubscribers);
router.delete('/:id', protectRoute,deleteSubscriber);

export default router;
