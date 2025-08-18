import express from 'express';
import {
  createClient,
  getAllClients,
  updateClient,
  deleteClient
} from '../controllers/clientController.js';
import { upload, cropImageMiddleware } from '../middleware/imageCropper.js';
import { protectRoute } from '../middleware/auth.js';

const router = express.Router();

router.post('/' ,upload.single('image'),protectRoute, cropImageMiddleware, createClient);
router.get('/', getAllClients);
router.put('/:id',upload.single('image'),cropImageMiddleware, protectRoute,updateClient);
router.delete('/:id',protectRoute, deleteClient);

export default router;
