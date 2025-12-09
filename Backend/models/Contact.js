import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  mobile: {
    type: String,
    required: [true, 'Please provide your mobile number'],
    trim: true,
    maxlength: [20, 'Mobile cannot be more than 20 characters']
  },
  city: {
    type: String,
    required: [true, 'Please provide your city'],
    trim: true,
    maxlength: [50, 'City cannot be more than 50 characters']
  },
  message: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Contact', contactSchema)
