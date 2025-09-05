import express from "express"
import multer from "multer"
import path from "path"
import {postEvent ,editPost,getMyEvents,pauseEvent} from "../controllers/organizerConttroller.js"
import {authenticateToken} from "../middleware/authorizationMiddleware.js"
const storage=({
  destination:(req, file, cb) => cb(null, __dirname, "public", "upload"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
 })

 const upload = multer({ storage });
 const router=express.Router()




router.post("/post",authenticateToken,upload.single("poster"),postEvent)
router.post("/edit/:id",authenticateToken,editPost)
router.post("/hold",authenticateToken,pauseEvent)
router.get("/events",authenticateToken,getMyEvents)
router.get("/",authenticateToken,(req,res)=>{
    res.render("overview.ejs")
})
router.get("/create",authenticateToken,(req,res)=>{
    res.render("creatEvent.ejs")
})
export default router