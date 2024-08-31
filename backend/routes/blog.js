const express=require('express');
const router=express.Router();
const upload=require('../controller/multerConfig');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const blogController=require('../controller/blog.controller');

router.post("/newblog",blogController.newBlog);
router.get("/getallblogs",blogController.getAllBlogs);
router.post("/uploadImage",upload.single('image'),blogController.uploadImage);

module.exports=router;