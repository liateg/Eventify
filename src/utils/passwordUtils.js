import bcrypt from "bcrypt"

const salt=10

export const hash_Password=async(password)=>{
   try{ const hashPassword_=await bcrypt.hash(password,10)
    return hashPassword_}catch (err){
     throw new Error("Error hashing passowd");
    }
}

export const checkPasswor=async (password,hashPassword_)=>{
    try{
        const same=await bcrypt.compare(password,hashPassword_)
       
        return same
    }catch(err){
        throw new Error("Erro comparing password")
    }
}
