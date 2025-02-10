import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    coverImg:{
        type: String,
    },
    createBy:{
        type: mongoose.Types.ObjectId,
        ref: "usersinfos",
    }
}, {timestamps: true})

export const Blog = mongoose.model("Blog", blogSchema)
