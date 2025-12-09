import express from 'express'
import { body, validationResult } from 'express-validator'
import Newsletter from '../models/Newsletter.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Subscribe to newsletter 
router.post('/subscribe', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required')
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
    const { email } = req.body

    // Check if already subscribed
    const existingSubscriber = await Newsletter.findOne({ email })
    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        message: 'Email already subscribed'
      })
    }

    const newsletter = new Newsletter({ email })
    await newsletter.save()

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: newsletter
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error subscribing to newsletter'
    })
  }
})

// Get all subscribers
router.get('/subscribers', protect, async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 })
    res.json(subscribers)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching subscribers'
    })
  }
})

// Delete subscriber 
router.delete('/subscribers/:id', protect, async (req, res) => {
  try {
    const subscriber = await Newsletter.findByIdAndDelete(req.params.id)
    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      })
    }

    res.json({
      success: true,
      message: 'Subscriber deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting subscriber'
    })
  }
})

export default router
