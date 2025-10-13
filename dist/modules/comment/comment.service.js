"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../utils/error");
const post_repository_1 = require("../../model/post/post.repository");
const comment_repository_1 = __importDefault(require("../../model/comment/comment.repository"));
const factory_1 = require("./factory");
const reaction_1 = require("../../utils/common/providers/reaction");
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
        const comment = await this.commentFactoryService.createComment(createCommentDTO, req.user, postExistance, commentExistance);
        const createdComment = await this.commentRepository.create(comment);
        res.status(201).json({ createdComment });
    };
    getCommentWithReply = async (req, res) => {
        const { id } = req.params;
        const commentExistance = await this.commentRepository.exist({ _id: id }, {}, { populate: { path: "replies" } });
        if (!commentExistance)
            throw new error_1.NotFoundError("Comment not found");
        return res.status(200).json({ commentExistance });
    };
    deleteComment = async (req, res) => {
        const { id } = req.params;
        const commentExistance = await this.commentRepository.exist({ _id: id }, {}, { populate: [{ path: "postId", select: "userId" }] });
        if (!commentExistance)
            throw new error_1.NotFoundError("Comment not found");
        if (![commentExistance.userId.toString(),
            (commentExistance.postId.userId).toString()].includes(req.user?._id.toString())) {
            throw new error_1.AuthorityError("You have no authority to delete this comment");
        }
        await this.commentRepository.delete({ _id: id });
        return res.status(200).json({ message: "comment deleted successfully" });
    };
    addReaction = async (req, res) => {
        const { id } = req.params;
        const userId = req.user?._id;
        const { reaction } = req.body;
        await (0, reaction_1.addReactionProvider)(this.commentRepository, id, userId, reaction);
        return res.sendStatus(204);
    };
    freezeComment = async (req, res) => {
        const userId = req.user?._id;
        const { id } = req.params;
        const comment = await this.commentRepository.exist({ _id: id });
        if (!comment)
            throw new error_1.NotFoundError("Comment not found");
        if (comment?.userId.toString() != userId.toString())
            throw new error_1.AuthorityError("You are not the owner of this comment to freeze it");
        let reversed;
        if (comment.frozen == true) {
            reversed = false;
        }
        else
            reversed = true;
        await this.commentRepository.updated({ _id: id, userId }, { frozen: reversed });
        return res.sendStatus(204);
    };
    hardDeleteComment = async (req, res) => {
        const userId = req.user?._id;
        const { id } = req.params;
        const comment = await this.commentRepository.exist({ _id: id });
        if (!comment)
            throw new error_1.NotFoundError("Comment not found");
        if (comment?.userId.toString() != userId.toString())
            throw new error_1.AuthorityError("You are not the owner of this comment to delete it");
        await this.commentRepository.delete({ _id: id });
        return res.status(200).json({ Message: "Comment deleted successfully" });
    };
    updateComment = async (req, res) => {
        const userId = req.user?._id;
        const { id } = req.params;
        const updateCommentDTO = req.body;
        const comment = await this.commentRepository.exist({ _id: id });
        if (!comment)
            throw new error_1.NotFoundError("Comment not found");
        if (comment?.userId.toString() != userId.toString())
            throw new error_1.AuthorityError("You are not the owner of this comment to update it");
        await this.commentRepository.updated({ _id: id }, { content: updateCommentDTO.content });
        res.sendStatus(204);
    };
    getCommentById = async (req, res) => {
        const { id } = req.params;
        const commentExistance = await this.commentRepository.exist({ _id: id }, {});
        if (!commentExistance)
            throw new error_1.NotFoundError("Comment not found");
        return res.status(200).json({ comment: commentExistance });
    };
}
exports.default = new CommentService;
//# sourceMappingURL=comment.service.js.map