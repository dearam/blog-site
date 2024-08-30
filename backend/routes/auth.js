const express=require('express')
const router=express.Router();

const userController=require("../controller/user.controller");
const verifyToken = require('../middlewares/verify');

// router.get("/",userController.getAllUser);
// router.post("/login",userController.getUser);
// router.post("/register",userController.addUser);
router.post("/register",userController.registerUser);
router.post("/login",userController.userLogin);

router.use(verifyToken);

router.get("/userinfo",userController.userInfo);
router.get("/logout",userController.userLogout);
router.get("/alluser",userController.getAllUser);
router.get("/home",(req,res)=>{
    res.status(200).json({ message: 'welcome to the home page!',userId:req.userId})
})
router.put('/user/edit/:id',userController.editUser);
router.delete('/user/delete/:id',userController.deleteUser);

module.exports=router;