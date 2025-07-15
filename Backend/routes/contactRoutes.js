import express from 'express';
import {
  submitContact,
  getAllContacts,
  deleteContact
} from '../controllers/contactController.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/', getAllContacts);
router.delete('/:id', deleteContact); // Optional

export default router;
