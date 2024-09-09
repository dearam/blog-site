const Blog=require('../model/blog.model');
const User=require('../model/user.model');
const mongoose = require('mongoose');
// const multer = require ('multer')
// const path = require('path')
// const upload = require("../controller/multerConfig");


const uploadImage=(req,res)=>{
    if(!req.file){
        return res.status(400).send('no file uploaded');
    }
    console.log("file uploaded successfully");
}


const newBlog=async (req,res)=>{
    try{
        const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
        const {title,userId,categories,tags,body,quotes}=req.body;
        const image = req.file ? req.file.filename:'';
        

        if (!isValidObjectId(userId)) {
            return res.status(400).json({
                message: "Invalid userId format."
            });
        }


        if(!title || !userId || !body || !image){
            return res.status(400).json({
                message:"titile,userid,body,image one is null"
            })
        }
        if(categories && !Array.isArray(categories)){
            return res.status(400).json({
                message:"categories must be array  is null"
            })
        }
        if(tags && !Array.isArray(tags)){
            return res.status(400).json({
                message:"tags must be array  is null"
            })
        }

        const blog=new Blog({
            title,
            userId,
            date:new Date(),
            categories:categories||[],
            tags:tags||[],
            body,
            quotes:quotes||'',
            image
        })

        const save=await blog.save();
        res.status(201).json({
            message:"success",
            blog:save
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            error:err.message
        })
    }
}

const getAllBlogs=async(req,res)=>{
    try{
        const blogs=await Blog.find();
        return res.status(200).json({
            message:"Success All blogs",
            blogs
        })
    }catch(err){
        return res.status(500).json({
            error:err.message
        })
    }
}


module.exports={newBlog,getAllBlogs,uploadImage} 