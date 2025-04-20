import jwt from "jsonwebtoken";
const secret = "SuperWoman69"

function createToken(user){
    const paylaod = {
        _id :user._id,
        name:user.fullName,
        role:user.role,
        email:user.email,
        profilePhoto:user.profilePhoto
    };
    return jwt.sign(paylaod,secret);
}

function verifyToken(token){
    return jwt.verify(token,secret); 
}

export {createToken,verifyToken};