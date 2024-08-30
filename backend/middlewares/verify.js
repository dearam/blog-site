const jwt=require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    const token=req.cookies['jwt'];
    if(!token){
        return res.status(401).json({ message:"No token provided,please log in" })
    }

    jwt.verify(token,"secret",(err,decoded)=>{
        if(err){
            return res.status(401).json({ message : "Unauthorized"});
        }
        req.userId=decoded._id;
        next();
    })
}

module.exports=verifyToken;