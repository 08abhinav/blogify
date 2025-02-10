import mongoose from "mongoose";
import { randomBytes } from "node:crypto";
import { createToken } from "../services/authentication.js";
const {createHmac} = await import("node:crypto")

const UserSchema = new mongoose.Schema({
    fullName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    salt:{
        type: String,
        // require: true
    },
    password:{
        type: String,
        require: true
    },
    profilePic:{
        type: String, 
        default: '/images/userAvatar.png'
    },
    role:{
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
},{timestamps: true})

UserSchema.pre("save", function(next){
    const user = this;
    if(!user.isModified('password')) return;

    const salt = randomBytes(16).toString();

    const hashedPassword = createHmac('sha256', salt)
    .update(user.password)
    .digest("hex")

    this.salt = salt;
    this.password = hashedPassword;

    next();
})


UserSchema.static('matchPasswordAndGenearteToken', async function(email, password){
    const user = await this.findOne({email});
    if (!user) throw new Error('User not found');
    
    const salt = user.salt;
    const hashedPassword = user.password;

    const userPassword = createHmac('sha256', salt)
    .update(password)
    .digest("hex")
    
    if(hashedPassword !== userPassword) throw new Error("Incorrect password");

    const token = createToken(user)
    return token
})

export const UserModel = mongoose.model("UsersInfo",UserSchema)
