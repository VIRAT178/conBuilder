import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';


const storage = multer.memoryStorage();
const upload = multer({ storage });


const cropImageMiddleware = async (req, res, next) => {
  try {
    if (!req.file) return next(); 

    const filename = `image_${Date.now()}.jpg`;
    const outputPath = path.join('uploads', filename);

    await sharp(req.file.buffer)
      .resize(450, 350)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    req.body.imageUrl = `/uploads/${filename}`; 
    next();
  } catch (error) {
    console.error('Image cropping failed:', error.message);
    res.status(500).json({ error: 'Image upload failed' });
  }
};

export { upload, cropImageMiddleware };
