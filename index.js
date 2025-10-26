
import express from 'express';
import path from "path";
import userRoute from "./routes/users.js"
import sequelize from './config/db.js';
import cookieParser from 'cookie-parser';
import checkForAuthenticationCookie from './middleware/auth.js';


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

const app = express() ;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))


const PORT= 8000 ;

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));


app.get('/', (req, res)=>{
    res.render('home', {
        user : req.user
    })
})

app.use("/user", userRoute)

app.listen(PORT , () => console.log(`server started at port : ${PORT}`))
