const express=require('express');
const router=express.Router();

const blogController=require('../controller/blog.controller');

router.post("/newblog",blogController.newBlog);
router.get("/getallblogs",blogController.getAllBlogs);
module.exports=router;