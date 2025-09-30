import { ObjectId } from "mongoose";
import { IAttachments } from "../../utils/common/interface";

export  interface CreateCommentDTO{
    content:string,
    //to do attachments
    // attachment:any;
}