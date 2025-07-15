import express from 'express';
import {
  subscribeEmail,
  getAllSubscribers,
  deleteSubscriber
} from '../controllers/newsletterController.js';

const router = express.Router();

router.post('/', subscribeEmail);
router.get('/', getAllSubscribers);
router.delete('/:id', deleteSubscriber);

export default router;
