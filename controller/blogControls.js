import { Blog } from "../models/blog.js";
import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads/'));
    },
    filename: function (req, file, cb) {  
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

export const uploads = multer({ storage: storage });

//blog creating route
export async function handleCreatingBlog(req, res){
    try {
        const {title, content, coverImg, createdBy} = req.body;
        if(!title || !content) return res.status(400).json({"message": "All fields are required."});

        await Blog.create({
            title,
            content,
            coverImg: `uploads/${req.file.filename}`,
            createdBy: req.user._id
        })
        
        return res.redirect("/")
    } catch (error) {
        return res.render('addBlog', {
            error: "Something went wrong."
        })
    }
}

