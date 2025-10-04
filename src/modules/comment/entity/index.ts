import { ObjectId } from "mongoose";
import { IAttachments, IReactions } from "../../../utils/common/interface";


export class Comment {
   userId!:ObjectId;
   postId!:ObjectId;
   parentId!:ObjectId|undefined;
   content!:string;
   attachments!:IAttachments;
   reactions!:IReactions[];
   mentions?:ObjectId[];
}