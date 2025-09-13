import { Router } from "express";
import userService from "./user.service";
import { isValid } from "zod/v3";
const router = Router();
router.get("/:id",userService.getProfile);
export default router;