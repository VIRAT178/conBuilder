import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  role: {
    type: String,
  },
  testimonial: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model('Client', clientSchema);
