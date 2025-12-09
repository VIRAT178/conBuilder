import express from 'express'
import multer from 'multer'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { protect } from '../middleware/auth.js'

const router = express.Router()


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadsDir = path.join(__dirname, '..', 'uploads')
fs.mkdirSync(uploadsDir, { recursive: true })

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files are allowed'))
  }
})

// Crop incoming image to 450x350 and store it
router.post('/', protect, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image uploaded' })
  }

  try {
    const filename = `img-${Date.now()}-${Math.round(Math.random() * 1e6)}.jpg`
    const outputPath = path.join(uploadsDir, filename)

    await sharp(req.file.buffer)
      .resize(450, 350, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 85 })
      .toFile(outputPath)

    const baseUrl = `${req.protocol}://${req.get('host')}`
    const url = `${baseUrl}/uploads/${filename}`

    res.status(201).json({
      success: true,
      message: 'Image uploaded and cropped',
      url,
      width: 450,
      height: 350
    })
  } catch (error) {
    console.error('Image processing error:', error)
    res.status(500).json({ success: false, message: 'Error processing image' })
  }
})

export default router
