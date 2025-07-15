import express from 'express';
import {
  createClient,
  getAllClients,
  updateClient,
  deleteClient
} from '../controllers/clientController.js';
import { upload, cropImageMiddleware } from '../middleware/imageCropper.js';

const router = express.Router();

router.post('/', upload.single('image'), cropImageMiddleware, createClient);
router.get('/', getAllClients);
router.put('/:id',upload.single('image'),cropImageMiddleware, updateClient);
router.delete('/:id', deleteClient);

export default router;
