import express from "express"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url";
import {postEvent ,editPost,getMyEvents,pauseEvent,activeEvents} from "../controllers/organizerConttroller.js"
import {authenticateToken} from "../middleware/authorizationMiddleware.js"

// get __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const storage=multer.diskStorage({
//   destination:(req, file, cb) => cb(null, __dirname, "public", "upload"),
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
//  })

//  const upload = multer({ storage });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "public", "upload")); // join into single path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
 const router=express.Router()




router.post("/post",authenticateToken,upload.single("poster"),postEvent)
router.post("/edit/:id",authenticateToken,editPost)
router.post("/hold/:id",authenticateToken,pauseEvent)
router.get("/myevents",authenticateToken,getMyEvents)
router.get("/",authenticateToken,activeEvents)
router.get("/onboard",(req,res)=>{
  res.render("organizeronboard.ejs")
})
router.get("/create",authenticateToken,(req,res)=>{
    res.render("createEvent.ejs",{userId:req.user.id})
})

export default router