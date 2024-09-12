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


const newBlog = async (req, res) => {
    try {
        // Define the helper function for checking valid ObjectId
        const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

        // Extract data from request body
        const { title, userId, categories, tags, content, quotes, image } = req.body;

        // Log the request body for debugging
        console.log(req.body);

        // Validate userId
        if (!isValidObjectId(userId)) {
            return res.status(400).json({
                message: "Invalid userId format."
            });
        }

        // Validate required fields
        if (!title || !userId || !content || !image) {
            return res.status(400).json({
                message: "Title, userId, content, and image are required."
            });
        }

        // Validate categories and tags
        if (categories && !Array.isArray(categories)) {
            return res.status(400).json({
                message: "Categories must be an array."
            });
        }
        if (tags && !Array.isArray(tags)) {
            return res.status(400).json({
                message: "Tags must be an array."
            });
        }

        userIdObject=new mongoose.Types.ObjectId(userId);
        // Create a new blog instance
        const blog = new Blog({
            title,
            userId: userIdObject, // Convert userId to ObjectId
            date: new Date(),
            categories: categories || [],
            tags: tags || [],
            content, // Assign the content from the request body
            quotes: quotes || '', // Default to an empty string if quotes are not provided
            image // Assign the image URL from the request body
        });

        // Save the blog to the database
        const savedBlog = await blog.save();
        res.status(201).json({
            message: "Success",
            blog: savedBlog
        });

    } catch (err) {
        console.error(err); // Use console.error for error logs
        res.status(500).json({
            error: err.message
        });
    }
};

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

const bulkInsertBlogs = async (req, res) => {
    try {
        // Extract the array of blog documents from the request body
        const blogs = req.body;

        // Validate each blog object
        for (const blog of blogs) {
            const { userId, categories, tags, content, image } = blog;

            // Validate userId
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                    message: "Invalid userId format."
                });
            }

            // Validate required fields
            if (!blog.title || !userId || !content || !image) {
                return res.status(400).json({
                    message: "Title, userId, content, and image are required."
                });
            }

            // Validate categories and tags
            if (categories && !Array.isArray(categories)) {
                return res.status(400).json({
                    message: "Categories must be an array."
                });
            }
            if (tags && !Array.isArray(tags)) {
                return res.status(400).json({
                    message: "Tags must be an array."
                });
            }
        }

        // Convert userId to ObjectId for all blogs
        const blogsWithObjectId = blogs.map(blog => ({
            ...blog,
            userId: new mongoose.Types.ObjectId(blog.userId)
        }));

        // Insert many blogs into the collection
        const result = await Blog.insertMany(blogsWithObjectId);

        res.status(201).json({
            message: "Successfully inserted blogs",
            count: result.length
        });

    } catch (err) {
        console.error(err); // Use console.error for error logs
        res.status(500).json({
            error: err.message
        });
    }
};

const deleteAllBlogs=async (req,res)=>{
    try{
        const result=await Blog.deleteMany();

        res.status(200).json({
            message:"deleted all blogs"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:err.message
        })
    }
}



module.exports={newBlog,getAllBlogs,uploadImage,bulkInsertBlogs,deleteAllBlogs} 