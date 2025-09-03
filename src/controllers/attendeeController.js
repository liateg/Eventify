import { Prisma } from "@prisma/client"
import { success } from "zod";
const prisma = new PrismaClient();

export const getEvents=async (req,res)=>{
    try{
        const events=await prisma.event.findMany({
            where:{status:"active"},
            include:{tickets:true}
        })
        return res.status(201).json({success:true,data:events})
    }catch(error){
return res.status(401).json({success:false,message:error.message})
    }
}

export const filterEvents=async(req,res)=>{
    try{
const {category}=req.body
  const events=await prisma.event.findMany({
            where:{
                status:"active",
                category:category
            },
            include:{tickets:true}
        })
        return res.status(201).json({success:true,data:events})
    }catch(error){
return res.status(401).json({success:false,message:error.message})
    }
}

