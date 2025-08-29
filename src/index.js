import express from "express"
import userRt from "./routes/authRoute"

const app=express()
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/user",userRt)

app.listen(PORT,()=>{
    console.log(`Runneing on port ${PORT}`)
})