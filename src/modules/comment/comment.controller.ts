import { Router } from "express";
import CommentService from "./comment.service";
import { isAuthanticated } from "../../middleware/auth.middleware";

const router = Router({ mergeParams: true });
router.post("{/:id}", isAuthanticated(), CommentService.createComment)
router.get("/:id", CommentService.getSpecific)
router.delete("/:id", isAuthanticated(), CommentService.deleteComment)
router.post("/react/:id", isAuthanticated(), CommentService.addReaction);
export default router;