import jwt from "jsonwebtoken";
const secret = "$uperM@N&123";

export function createToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role
    };

    const token = jwt.sign(payload, secret); // Set expiration time
    return token;
}

export function validateToken(token){
    const payload = jwt.verify(token, secret)
    return payload;
}

