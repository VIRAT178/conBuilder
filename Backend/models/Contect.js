import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  city: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);
