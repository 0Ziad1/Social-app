import { IPost, IUser } from "../../../utils/common/interface";
import { CreateCommentDTO } from "../comment.dto";
import { Comment } from "../entity";

export class CommentFactoryService{
    constructor(){};
    createComment(createCommentDTO:CreateCommentDTO,
        user:IUser,
        post:IPost,
        comment?:any
    ){        
        const newComment = new Comment();
        newComment.userId=user._id;
        newComment.postId = post._id ||comment._postId;
        // newComment.attachments = createCommentDTO.attachment;
        newComment.content = createCommentDTO.content;
        newComment.parentId=comment?._id||undefined;
        newComment.reactions=[];
        newComment.mentions=[];
        return newComment;
    }
}