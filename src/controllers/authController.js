import { PrismaClient } from "@prisma/client";
import {checkPasswor, hashPassword} from "src/utils/passwordUtils.js"

const prisma = new PrismaClient();

//Register user
export const registerUser=async (req,res)=>{
    try{
        const {name,email,pnumber,role,password}=req.body
        const hashedPassword=hashPassword(password)
        const user=await prisma.user.create({
            data:{name,email,pnumber,role,hashedPassword}
        })
     return res.status(201).json({ success:true,data:user});
    }catch(error){
        return res.status(400).json({ success:fales,error: error.message});
    }
}