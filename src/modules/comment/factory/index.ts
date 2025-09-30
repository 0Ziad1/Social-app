import { ObjectId } from "mongoose";
import { IComment, IPost, IUser } from "../../../utils/common/interface";
import { CreateCommentDTO } from "../comment.dto";
import { Comment } from "../entity";
import { log } from "node:console";

export class CommentFactoryService{
    constructor(){};
    createComment(createCommentDTO:CreateCommentDTO,
        user:IUser,
        post:IPost,
        comment?:any
    ){
        const newComment = new Comment();
        newComment.userId=user._id;
        newComment.postId = post._id as ObjectId;
        // newComment.attachments = createCommentDTO.attachment;
        newComment.content = createCommentDTO.content;
        newComment.parentIds=comment?[...comment.parentIds,comment._id]:[];
        return newComment;
    }
}