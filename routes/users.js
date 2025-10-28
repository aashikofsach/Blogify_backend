import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt"
import { createTokenForUser } from "../services/authentication.js";

const router = Router() ;

 router.get("/signup", (req, res)=>{
    res.render("signup");
})

router.get("/signin", (req, res)=>{
    res.render("signin");
});

router.post("/signup", async (req, res)=>{
    console.log('file in routes users 1')
    const {fullName , email , password } = req.body;
        console.log('file in routes users 2')

        console.log(req.body)


    await User.create({
        name : fullName, email ,password
    })

    return res.redirect('/')

})

router.post("/signin", async (req, res) => {
    console.log(req.body , "line 33 in users.js")
    const { email, password } = req.body;

    // 1️⃣ Find the user by email
    const user = await User.findOne({ where : {email} });
    if (!user) {
        return res.status(400).send("User not found");
    }

    console.log(user , password, "file is users.js line 41")

    // 2️⃣ Compare the password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch , "fike is users.js") 
    if (!isMatch) {
        return res.status(400).render("signin", {
            error : "Incorrect password "
        })
    }

    // 3️⃣ Password is correct → login successful

     const token = createTokenForUser(user)
     console.log("this is token",token)
    // return token;
    // return res.send("Login successful!");

    return res.cookie('token', token).redirect('/')
});

router.get("/logout", (req, res)=>{
    res.clearCookie('token').redirect('/')
})




export default router ;