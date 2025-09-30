import { ObjectId } from "mongoose";
import { IReactions } from "../../utils/common/interface";

export   interface CreatePostDTO{
    // attachments?:any[],
    reactions:IReactions[],
    content:string,
}