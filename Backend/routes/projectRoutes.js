import express from 'express';
import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { upload, cropImageMiddleware } from '../middleware/imageCropper.js';

const router = express.Router();


router.post('/', upload.single('image'), cropImageMiddleware, createProject);
router.get('/', getAllProjects);
router.put('/:id', upload.single('image'), cropImageMiddleware, updateProject);
router.delete('/:id', deleteProject);



export default router;

