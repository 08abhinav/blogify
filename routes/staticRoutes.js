import express from "express";
import {Blog} from "../models/blog.js"

const staticRoute = express.Router()

staticRoute.get("/", async (req, res)=>{
    const allBlog = await Blog.find({})
    res.render('home',{
        user: req.user,
        blogs: allBlog
    })
})

staticRoute.get('/login', (req, res)=>{
    res.render('login')
})

staticRoute.get('/signup', (req, res)=>{
    res.render('signup')
})

staticRoute.get('/blog/addBlog', (req, res)=>{
    res.render('addBlog', {user: req.user})
})

staticRoute.get('/:id', async(req, res)=>{
    const blog = await Blog.findById(req.params.id)
    console.log(blog)
    if(!blog) return ;
    
    return res.render('blogy', {
        user: req.id,
        blog
    })
})

export default staticRoute;
