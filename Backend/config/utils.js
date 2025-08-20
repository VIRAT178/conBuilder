export const genrateToken = (userId) => {
    const token = jwt.sign({ adminId: userId }, process.env.JWT_SECRET);
    return token;
}
