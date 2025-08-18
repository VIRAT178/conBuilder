import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
  },
  lastName:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Admin =  mongoose.model('Admin', adminSchema);
export default Admin;