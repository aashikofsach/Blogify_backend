
import express from 'express';
import path from "path";
import dotenv from "dotenv";

import userRoute from "./routes/users.js"
import blogRoute from "./routes/blog.js"
import sequelize from './config/db.js';
import cookieParser from 'cookie-parser';
import checkForAuthenticationCookie from './middleware/auth.js';
import Blog from "./models/blog.js"


(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected!');
    await sequelize.sync({ alter: true });
    console.log('✅ Models synced!');
  } catch (error) {
    console.error('❌ Error connecting to DB:', error);
  }
})();

dotenv.config();

const app = express() ;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")))


const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));


app.get('/',async (req, res)=>{

  const allBlogs = await Blog.findAll()

    res.render('home', {
        user : req.user,
        blogs : allBlogs
    })
})

app.use("/user", userRoute);
app.use("/blog",blogRoute);

app.listen(PORT , () => console.log(`server started at port : ${PORT}`))
