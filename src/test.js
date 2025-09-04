// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFiMDlkYTZhLTVjMzMtNDRjZC05OTA1LWNjYjkwNjZiMDc0MSIsInBob25lTnVtYmVyIjoiKzI1MTcxMTExMTExMSIsInJvbGUiOiJPcmdhbml6ZXIiLCJpYXQiOjE3NTcwMDUyMDUsImV4cCI6MTc1NzA5MTYwNX0.BlqrMYkCNLHhDNohVVRITn87g_Yn1KSsnTOzl8sdif8
import express from "express"


const app=express()
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("overview.ejs")
})
app.get("/creteEvent",(req,res)=>{
    res.render("createEvent.ejs")
})
app.post("/register",(req,res)=>{
    res.render("register.ejs")
})
app.post("/login",(req,res)=>{
    res.render("login.ejs")
})

app.listen(PORT,()=>{
    console.log(`Runneing on port ${PORT}`)
})