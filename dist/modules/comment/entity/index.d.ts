import { ObjectId } from "mongoose";
import { IAttachments, IReactions } from "../../../utils/common/interface";
export declare class Comment {
    userId: ObjectId;
    postId: ObjectId;
    parentIds: ObjectId[];
    content: string;
    attachments: IAttachments;
    reactions: IReactions[];
    mentions?: ObjectId[];
}
//# sourceMappingURL=index.d.ts.map