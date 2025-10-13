import { Router } from "express";
import CommentService from "./comment.service";
import { isAuthanticated } from "../../middleware/auth.middleware";

const router = Router({ mergeParams: true });
router.post("{/:id}", isAuthanticated(), CommentService.createComment)
router.get("/:id", CommentService.getCommentWithReply)
router.get("/get-comment/:id", CommentService.getCommentById)
router.delete("/:id", isAuthanticated(), CommentService.deleteComment)
router.post("/react/:id", isAuthanticated(), CommentService.addReaction);
router.delete("/delete-comment/:id",isAuthanticated(),CommentService.hardDeleteComment);
router.patch("/freeze-comment/:id",isAuthanticated(),CommentService.freezeComment);
router.patch("/update-comment/:id", isAuthanticated(), CommentService.updateComment);
export default router;