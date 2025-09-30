import { Router } from "express";
import authService from "./auth.service"
import { isValid } from "../../middleware/validatation.middleware";
import { registerSchema } from "./auth.validation";
import { isAuthanticated } from "../../middleware/auth.middleware";
const router = Router(); 
router.post("/register",isValid(registerSchema),authService.register)
router.get("/resend-otp",authService.resendOtp)
router.get("/login",authService.login)
router.patch("/verify-account",authService.verifyAccount)
export default router;