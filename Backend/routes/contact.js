import express from 'express'
import { body, validationResult } from 'express-validator'
import Contact from '../models/Contact.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Submit contact 
router.post('/submit', [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('mobile').trim().notEmpty().withMessage('Mobile number is required'),
  body('city').trim().notEmpty().withMessage('City is required')
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
    const { fullName, email, mobile, city, message } = req.body
    const contact = new Contact({ fullName, email, mobile, city, message })
    await contact.save()

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error submitting contact form'
    })
  }
})

// Get all submissions 
router.get('/submissions', protect, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json(contacts)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching submissions'
    })
  }
})

// Delete submission 
router.delete('/submissions/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting contact'
    })
  }
})

export default router
