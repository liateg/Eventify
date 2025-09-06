import express from "express"
import {getEvents,viewdetails} from "../controllers/attendeeController.js"

const router=express.Router()

router.get("/",getEvents)
router.get("/event/:id",viewdetails)
export default router