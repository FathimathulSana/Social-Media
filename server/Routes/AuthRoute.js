import express from "express";
import { adminLogin, loginUser, registerUser, resendOtp, verifyotp } from "../Controllers/AuthController.js";
import { resetPass, resetPassword } from '../Controllers/ResetController.js'
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/verifyotp', verifyotp)
router.post('/resendotp', resendOtp)
router.post('/adminLogin', adminLogin);
router.post('/forgotpassword', resetPass)
router.put('/resetPasswordForm', resetPassword)


export default router