import Admin from '../models/Admin.js'
import jwt from 'jsonwebtoken';

export const protectRoute = async(req, res , next)=>{
    try {
        const token = req.headers.token;
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findById(decode.adminId).select("-password");
        if(!admin){
            return res.json({success:false, message:"Admin not found!"})
        }
        req.admin = admin;
        next();
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message: error.message})
    }
}