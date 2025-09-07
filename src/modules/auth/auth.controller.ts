import { Router } from "express";
import authService from "./auth.service"
const router = Router(); 
router.post("/register",authService.register)
router.get("/resend-otp",authService.resendOtp)
router.get("/login",authService.login)
router.patch("/verify-account",authService.verifyAccount)
export default router;