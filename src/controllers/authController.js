import { PrismaClient } from "@prisma/client";
import {checkPasswor, hash_Password} from "../utils/passwordUtils.js"
import { tr } from "zod/locales";
import { success } from "zod";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

//Register user
export const registerUser=async (req,res)=>{
    try{
        const {name,email,phoneNumber,role,password}=req.body
        const userId=await userExists(phoneNumber)
        
if(!userId){
        const passwordHash=await hash_Password(password)
        // console.log(`${passwordHash} the tyoe ${typeof(passwordHash)}`)
        const user=await prisma.user.create({
            data:{name,email,phoneNumber,role,passwordHash}
        })
     return res.status(201).json({ success:true,data:user});
    }else{
        return res.status(400).json({ success:false ,error:"Phovvvne number already rigestered"});
    }}
    catch(error){
        return res.status(400).json({ success:false ,error: error.message});
    }
}

export const loginUser=async (req,res)=>{
   try{
    
    const {phoneNumber,role,password}=req.body

    const user=await userExists(phoneNumber)
    
    if(user){
        
const match=await checkPasswor(password,user.passwordHash)


if(!match) return res.status(400).json({success:false,error:"Invalid user credential"})
    const accesToken=jwt.sign(
  {
    id:user.id,
    phoneNumber: phoneNumber,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
)

return res.status(201).json({success:true,accesToken:accesToken})

    }else return res.status(400).json({success:false,error:"Invalid user credential"})
   }   catch(error){
        return res.status(400).json({ success:false ,error: error.message});
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
