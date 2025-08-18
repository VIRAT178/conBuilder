import express from 'express'
import { login, SignUp } from '../controllers/adminController.js';


const AdminRoute = express.Router();
AdminRoute.post('/signup', SignUp);
AdminRoute.post('/login',login);

export default AdminRoute;