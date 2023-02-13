import express from "express";
import { adminLogin, loginUser, registerUser, resendOtp, verifyotp } from "../Controllers/AuthController.js";
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/verifyotp', verifyotp)
router.post('/resendotp',resendOtp)
router.post('/adminLogin', adminLogin);


export default router