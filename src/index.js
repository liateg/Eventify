import express from "express"
import session from "express-session";
import  flash from "connect-flash";
import userRt from "./routes/authRoute.js"
import { flashMiddleware } from "./middleware/flashMid.js";
import orgRoute from "./routes/organizerRoute.js"



const app=express()
const PORT = process.env.PORT || 3000;

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Make flash messages available in EJS templates
app.use(flashMiddleware);
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use("/user",userRt)
app.use("/org",orgRoute)
app.get("/",(req,res)=>{
    res.render("home.ejs")
})
app.get("/register",(req,res)=>{
    res.render("register.ejs")
})
app.get("/login",(req,res)=>{
    res.render("login.ejs")
})

app.listen(PORT,()=>{
    console.log(`Runneing on port ${PORT}`)
})