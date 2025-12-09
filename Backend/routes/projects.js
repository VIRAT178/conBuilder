import express from 'express'
import { body, validationResult } from 'express-validator'
import Project from '../models/Project.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching projects'
    })
  }
})

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }
    res.json(project)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching project'
    })
  }
})

// Create project 
router.post('/', protect, [
  body('name').trim().notEmpty().withMessage('Project name is required'),
  body('description').trim().notEmpty().withMessage('Description is required')
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    })
  }

  try {
    const { name, description, image } = req.body
    const project = new Project({ name, description, image })
    await project.save()

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating project'
    })
  }
})

// Update project 
router.put('/:id', protect, async (req, res) => {
  try {
    const { name, description, image } = req.body

    let project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    if (name) project.name = name
    if (description) project.description = description
    if (image) project.image = image
    project.updatedAt = Date.now()

    await project.save()

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating project'
    })
  }
})

// Delete project 
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting project'
    })
  }
})

export default router
