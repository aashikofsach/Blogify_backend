import {Router} from 'express'
import multer from 'multer';
import path from "path"
import Blog from '../models/blog.js';
import User from '../models/user.js';
import Comment from '../models/comment.js';

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

router.get("/:id", async (req, res)=>
{
  const blog = await Blog.findOne({
    where : {id : req.params.id},
    include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name", "email", "imageUrl"], // limit what we return
        },
      ],
  })
  console.log(blog , "routes mein blog")
  // console.log(req.user , "routes mein blog agla line ")

  return res.render('blog',{
    user : req.user,
    blog:blog
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
});

router.post("/comment/:blogId" ,  async (req, res)=>
{
  const comment = await Comment.create({
    content : req.body.comment ,
    blogId : req.params.blogId ,
    userId : req.user.id 
    
  })

return res.redirect(`/blog/${req.params.blogId}`)
})




export default router ;
