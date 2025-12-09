import express from 'express'
import { body, validationResult } from 'express-validator'
import Client from '../models/Client.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 })
    res.json(clients)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching clients'
    })
  }
})

// Get single client
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      })
    }
    res.json(client)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching client'
    })
  }
})

// Create client 
router.post('/', protect, [
  body('name').trim().notEmpty().withMessage('Client name is required'),
  body('designation').trim().notEmpty().withMessage('Designation is required'),
  body('description').trim().notEmpty().withMessage('Testimonial is required')
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
    const { name, designation, description, image } = req.body
    const client = new Client({ name, designation, description, image })
    await client.save()

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: client
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating client'
    })
  }
})

// Update client 
router.put('/:id', protect, async (req, res) => {
  try {
    const { name, designation, description, image } = req.body

    let client = await Client.findById(req.params.id)
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      })
    }

    if (name) client.name = name
    if (designation) client.designation = designation
    if (description) client.description = description
    if (image) client.image = image
    client.updatedAt = Date.now()

    await client.save()

    res.json({
      success: true,
      message: 'Client updated successfully',
      data: client
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating client'
    })
  }
})

// Delete client 
router.delete('/:id', protect, async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id)
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      })
    }

    res.json({
      success: true,
      message: 'Client deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting client'
    })
  }
})

export default router
