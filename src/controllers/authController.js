import { PrismaClient } from "@prisma/client";
import {checkPasswor, hash_Password} from "../utils/passwordUtils.js"
// import { tr } from "zod/locales";
// import { success } from "zod";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

//Register user
export const registerUser=async (req,res)=>{
    try{
        const {name,email,phoneNumber,role,password}=req.body
        // console.log(req.body)
        const userId=await userExists(phoneNumber)
        
if(!userId){
        const passwordHash=await hash_Password(password)
        // console.log(`${passwordHash} the tyoe ${typeof(passwordHash)}`)
        const user=await prisma.user.create({
            data:{name,email,phoneNumber,role,passwordHash}
        })
         req.flash("success", "Registration Successful!");
    res.redirect("/login"); // redirect to login
        // return res.render("login.ejs",{success:true,message:"Sussefully Registered"})
    //  return res.status(201).json({ success:true,data:user});
    }else{
        throw new Error("Phone number already degistered")
        // return res.render("register.ejs",{success:false,message:"Phone number already degistered"})
        // return res.status(400).json({ success:false ,error:"Phovvvne number already rigestered"});
    }}
    catch(error){
          req.flash("error", "Registration Failed. Try again.");
    res.redirect("/register");
        // return res.render("home.ejs",{success:false,message:error.message})
        // return res.status(400).json({ success:false ,error: error.message});
    }
}

export const loginUser=async (req,res)=>{
   try{
    
    const {phoneNumber,role,password}=req.body

    const user=await userExists(phoneNumber)
    
    if(user){
        
const match=await checkPasswor(password,user.passwordHash)


if(!match) {
     throw new Error("Invalid user credential")
       
    //  return res.render("login.ejs",{success:false,error:"Invalid user credential"})
    // return res.status(400).json({success:false,error:"Invalid user credential"})
}
// return res.render("home.ejs")
 req.flash("success", "Login Successful!");
    res.redirect("/"); // redirect to login
       
    }else {
        throw new Error("Invalid user credential-user does not exists")
       
    //    return res.render("login.ejs",{success:false,error:"Invalid user credential-user does not exists"})
    
        // return res.status(400).json({success:false,error:"Invalid user credential"})
   }}   catch(error){
    req.flash("error", "Login Failed. Try again.");
    res.redirect("/login");
    //    return res.render("home.ejs",{success:false,message:error.message}) 
    // return res.status(400).json({ success:false ,error: error.message});
    }}






const userExists=async (phoneNumber)=>{
    const user=await prisma.user.findUnique({
        where:{phoneNumber:phoneNumber}
    })
    
    if(user != null) {
        return user}
    else {
        return false}
}

const tokenGen=()=>{
     const accesToken=jwt.sign(
  {
    id:user.id,
    phoneNumber: phoneNumber,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
)

// return res.status(201).json({success:true,accesToken:accesToken})
return res.render("home.ejs",{success:true,message:"Logged in successfully"})
}