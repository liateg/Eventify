import express from "express"
import {postEvent ,editPost,getMyEvents,pauseEvent} from "../controllers/organizerConttroller.js"
import {authenticateToken} from "../middleware/authorizationMiddleware.js"
const router=express.Router()

router.post("/post",authenticateToken,postEvent)
router.post("/edit/:id",authenticateToken,editPost)
router.post("/hold",authenticateToken,pauseEvent)
router.get("/",authenticateToken,getMyEvents)
export default router