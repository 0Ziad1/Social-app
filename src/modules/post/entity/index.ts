import { ObjectId } from "mongoose";
import { IAttachments, IPost, IReactions } from "../../../utils/common/interface";
class Post {
    userId!:ObjectId;
    reactions!:IReactions[];
    // attachments?:IAttachments;
    content!:string;
}
export default Post