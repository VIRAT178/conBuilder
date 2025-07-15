import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Consultation', 'Design', 'Marketing & Design', 'Consultation & Marketing'],
    required: true,
  },
  description: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
