import { ObjectId } from "mongoose";
import { IReactions, IUser } from "../../../utils/common/interface";
import Post from "../entity";
import { CreatePostDTO } from "../post.dto";

export class PostFactoryService{
    createPost(createPostDTO:CreatePostDTO,user:IUser){
        const post = new Post;
        post.userId = user._id as ObjectId;
        post.content = createPostDTO.content;
       post.reactions = [];
       return post;
    }
}