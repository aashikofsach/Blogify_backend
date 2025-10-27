import {Router} from 'express'
import multer from 'multer';
import path from "path"
import Blog from '../models/blog.js';

const router = Router() ;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"))
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const filename = `${Date.now()} - ${file.originalname}`
    cb(null, filename)
  } 
})

const upload = multer({ storage: storage })

router.get("/add-new", (req, res)=>{
    res.render("addBlogs", {
        user : req.user
    })
})

router.post("/", upload.single("file"), async (req, res)=>{
    console.log(req.body);
    console.log(req.file)
    console.log(req.user)

    const {title , body} = req.body;

    const blog = await Blog.create({
        title , body , 
        imageUrl : `/uploads/${req.file.filename}`,
        createdBy : req.user.id

    })

   return  res.redirect(`/blog/${blog.id}`)
})


export default router ;
