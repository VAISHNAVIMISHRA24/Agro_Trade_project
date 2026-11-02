import multer from "multer";
import path from "path";

var storage=multer.diskStorage({
    destination:'./uploads'
    ,
    filename:(req,file,cb)=>{
        console.log("inside multer filenames",file)
        // cb(null,Date.now()+path.extname(file.originalname));
        let ext = path.extname(file.originalname)
        cb(null, file.originalname)
    }
});
  export const upload=multer({storage:storage});