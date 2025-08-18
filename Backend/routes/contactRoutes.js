import express from 'express';
import {
  submitContact,
  getAllContacts,
  deleteContact
} from '../controllers/contactController.js';
import { protectRoute } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/', getAllContacts);
router.delete('/:id',protectRoute, deleteContact); // Optional

export default router;
