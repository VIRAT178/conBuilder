import express from 'express'
import { body, validationResult } from 'express-validator'
import Admin from '../models/Admin.js'
import { generateToken, protect } from '../middleware/auth.js'

const router = express.Router()

// Signup
router.post('/signup', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().notEmpty()
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
    const { email, password, name } = req.body

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      })
    }


    const admin = new Admin({ email, password, name })
    await admin.save()

   
    const token = generateToken(admin._id)

    res.status(201).json({
      success: true,
      message: 'Admin account created successfully',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating account'
    })
  }
})


router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
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
    const { email, password } = req.body

    const admin = await Admin.findOne({ email }).select('+password')
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

 
    const isPasswordValid = await admin.matchPassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

   
    const token = generateToken(admin._id)

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error logging in'
    })
  }
})

router.get('/verify', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId)
    res.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Verification failed'
    })
  }
})

export default router
