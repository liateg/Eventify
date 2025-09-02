import express from "express"
import {postEvent ,editPost,getMyEvents,pauseEvent} from "../controllers/organizerConttroller.js"

const router=express.Router()

router.post("/post",postEvent)
router.post("/edit/:id",editPost)
router.post("/hold",pauseEvent)
router.get("/",getMyEvents)
export default router