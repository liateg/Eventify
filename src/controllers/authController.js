import { PrismaClient } from "@prisma/client";
import {checkPasswor, hash_Password} from "../utils/passwordUtils.js"

const prisma = new PrismaClient();

//Register user
export const registerUser=async (req,res)=>{
    try{
        const {name,email,phoneNumber,role,password}=req.body
        const passwordHash=await hash_Password(password)
        // console.log(`${passwordHash} the tyoe ${typeof(passwordHash)}`)
        const user=await prisma.user.create({
            data:{name,email,phoneNumber,role,passwordHash}
        })
     return res.status(201).json({ success:true,data:user});
    }catch(error){
        return res.status(400).json({ success:false ,error: error.message});
    }
}

