import express from "express"

const router = express.Router();

import {registerUser,loginUser} from "../controllers/authController.js"
import { validateRegister,validateLogin } from "../middleware/validationMiddleware.js"

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
export default router
