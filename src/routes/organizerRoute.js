import express from "express"
import {postEvent} from "../controllers/organizerConttroller.js"

const router=express.router()

router.post("/post",postEvent)

export default router