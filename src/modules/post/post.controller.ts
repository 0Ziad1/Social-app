import { Router } from "express";
import PostService from "./post.service";
import commentRouter from "../comment/comment.controller"
import { isAuthanticated } from "../../middleware/auth.middleware";
const router = Router();
router.use("/:postId/comment", commentRouter);
router.post("/create-post", isAuthanticated(), PostService.createPost);
router.patch("/:id", isAuthanticated(), PostService.addReaction);
router.get("/:id", PostService.getSpecificPost);
router.delete("/:id", isAuthanticated(), PostService.deletePost);
router.patch("/update-post/:id", isAuthanticated(), PostService.updatePost);
export default router;