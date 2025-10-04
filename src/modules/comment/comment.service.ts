import { Request, Response } from "express";

import { AuthorityError, NotFoundError } from "../../utils/error";
import { PostRepository } from "../../model/post/post.repository";
import CommentRepository from "../../model/comment/comment.repository";
import { CreateCommentDTO } from "./comment.dto";
import { CommentFactoryService } from "./factory";
import { IComment, IPost, IUser } from "../../utils/common/interface";
import { threadId } from "worker_threads";
import { addReactionProvider } from "../../utils/common/providers/reaction";

class CommentService {
    private readonly postRepository = new PostRepository;
    private readonly commentRepository = new CommentRepository;
    commentFactoryService = new CommentFactoryService;
    public createComment = async (req: Request, res: Response) => {

        const { id, postId } = req.params;
        const createCommentDTO: CreateCommentDTO = req.body;
        const postExistance = await this.postRepository.exist({ _id: postId })
        if (!postExistance) throw new NotFoundError("Post not found");
        let commentExistance = undefined;
        if (id) {
            commentExistance = await this.commentRepository.exist({ _id: id })
            if (!commentExistance) throw new NotFoundError("Comment not found");
        }
        const comment = await this.commentFactoryService.createComment(createCommentDTO, req.user as IUser
            , postExistance as unknown as IPost, commentExistance);


        const createdComment = await this.commentRepository.create(comment as unknown as IComment);

        res.status(201).json({ createdComment })
    }
    public getSpecific = async (req: Request, res: Response) => {
        const { id } = req.params;
        const commentExistance = await this.commentRepository.exist({ _id: id }, {}, { populate: { path: "replies" } });
        if (!commentExistance) throw new NotFoundError("Comment not found");
        return res.status(200).json({ commentExistance })
    }
    public deleteComment = async (req: Request, res: Response) => {
        const { id } = req.params;
        const commentExistance = await this.commentRepository.exist({ _id: id },
            {},
            { populate: [{ path: "postId", select: "userId" }] });
        if (!commentExistance) throw new NotFoundError("Comment not found");
        if (![commentExistance.userId.toString(),
        ((commentExistance.postId as unknown as IPost).userId).toString()].includes(req.user?._id.toString() as string)) {
            throw new AuthorityError("You have no authority to delete this comment")
        }
        await this.commentRepository.delete({ _id: id });
        return res.status(200).json({ message: "comment deleted successfully" });
    }
    public addReaction = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = req.user?._id;
        const { reaction } = req.body;
        await addReactionProvider(this.commentRepository, id as string, userId as unknown as string, reaction);
        return res.sendStatus(204);
    }
}
export default new CommentService;