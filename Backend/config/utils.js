import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
  return jwt.sign(
    { adminId: userId },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }  
  );
};
