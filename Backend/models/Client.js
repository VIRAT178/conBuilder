import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a client name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  designation: {
    type: String,
    required: [true, 'Please provide a designation'],
    trim: true,
    maxlength: [100, 'Designation cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a testimonial'],
    maxlength: [500, 'Testimonial cannot be more than 500 characters']
  },
  image: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Client', clientSchema)
