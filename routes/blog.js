import {Router} from 'express'


const router = Router() ;

router.get("/add-new", (req, res)=>{
    res.render("addBlogs", {
        user : req.user
    })
})

router.post("/", (req, res)=>{
    console.log(req.body);
   return  res.redirect('/')
})


export default router ;
