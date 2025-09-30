import { Router } from "express";
import CommentService from "./comment.service";
import { isAuthanticated } from "../../middleware/auth.middleware";

const router = Router({mergeParams:true});
router.post("{/:id}",isAuthanticated(),CommentService.createComment)
export default router;