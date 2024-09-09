const multer = require('multer');

const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
      cb(null,'uploads');
    },
    filename:(req,file,cb)=>{
      cb(null,file.originalname);
    }
  })
const upload=multer({
    storage:storage,
    limits:{fileSize:10*1024*1024}
  })

module.exports=upload;