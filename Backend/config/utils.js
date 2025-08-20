import jwt from 'jsonwebtoken'
export const genrateToken =(userId) =>{
    jwt.sign({ adminId: userId }, process.env.JWT_SECRET)
    return token ;
}