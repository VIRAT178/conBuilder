import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import "dotenv/config";
import path from 'path';
import cookieParser from 'cookie-parser';

import projectRoutes from './routes/projectRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import AdminRoute from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js'; 

const app = express();

const allowedOrigins = [
  'https://con-builder.vercel.app',
  'http://localhost:5173',
];

app.use(cors({
  origin: function (origin, callback) {
   
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(cookieParser());

app.use('/api/v1', authRoutes);
app.use('/api/v1', AdminRoute);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/newsletter', newsletterRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected ');
  } catch (error) {
    console.error('MongoDB Connection Error ', error.message);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running at http://localhost:${PORT} `);
});
