import { IPost, IUser } from "../../../utils/common/interface";
import { CreateCommentDTO } from "../comment.dto";
import { Comment } from "../entity";
export declare class CommentFactoryService {
    constructor();
    createComment(createCommentDTO: CreateCommentDTO, user: IUser, post: IPost, comment?: any): Comment;
}
//# sourceMappingURL=index.d.ts.map