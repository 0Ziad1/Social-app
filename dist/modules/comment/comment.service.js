"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../utils/error");
const post_repository_1 = require("../../model/post/post.repository");
const comment_repository_1 = __importDefault(require("../../model/comment/comment.repository"));
const factory_1 = require("./factory");
class CommentService {
    postRepository = new post_repository_1.PostRepository;
    commentRepository = new comment_repository_1.default;
    commentFactoryService = new factory_1.CommentFactoryService;
    createComment = async (req, res) => {
        const { id, postId } = req.params;
        const createCommentDTO = req.body;
        const postExistance = await this.postRepository.exist({ _id: postId });
        if (!postExistance)
            throw new error_1.NotFoundError("Post not found");
        let commentExistance = undefined;
        if (id) {
            commentExistance = await this.commentRepository.exist({ _id: id });
            if (!commentExistance)
                throw new error_1.NotFoundError("Comment not found");
        }
        const comment = this.commentFactoryService.createComment(createCommentDTO, req.user, postExistance, commentExistance);
        console.log(commentExistance);
        const createdComment = await this.commentRepository.create(comment);
        res.status(201).json({ createdComment });
    };
}
exports.default = new CommentService;
//# sourceMappingURL=comment.service.js.map