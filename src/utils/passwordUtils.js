import bcrypt from "bcrypt"

const salt=10

export const hashPassword=async(password)=>{
   try{ const hashPassword=await bcrypt.hash(password,salt)
    return hashPassword}catch (err){
     throw new Error("Error hashing passowd");
    }
}

export const checkPasswor=async (password,hashPassword_)=>{
    try{
        return await bcrypt.compare(password,hashPassword_)
    }catch(err){
        throw new Error("Erro comparing password")
    }
}
