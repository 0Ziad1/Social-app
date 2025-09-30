import { Request, Response } from "express";

import { NotFoundError } from "../../utils/error";
import { PostRepository } from "../../model/post/post.repository";
import CommentRepository from "../../model/comment/comment.repository";
import { CreateCommentDTO } from "./comment.dto";
import { CommentFactoryService } from "./factory";
import { IComment, IPost, IUser } from "../../utils/common/interface";

class CommentService {
    private readonly postRepository = new PostRepository;
    private readonly commentRepository = new CommentRepository;
    commentFactoryService = new CommentFactoryService;
    createComment = async (req: Request, res: Response) => {

        const { id, postId } = req.params;
        const createCommentDTO: CreateCommentDTO = req.body;        
        const postExistance = await this.postRepository.exist({ _id:postId })
        if (!postExistance) throw new NotFoundError("Post not found");
        let commentExistance=undefined;
        if (id) {
             commentExistance = await this.commentRepository.exist({ _id:id })
            if (!commentExistance) throw new NotFoundError("Comment not found");
        }
        const comment = this.commentFactoryService.createComment(createCommentDTO, req.user as IUser
            , postExistance as unknown as IPost, commentExistance)
            console.log(commentExistance);
            
            
        const createdComment = await this.commentRepository.create(comment as unknown as IComment);
        res.status(201).json({ createdComment })
    }
}
export default new CommentService;