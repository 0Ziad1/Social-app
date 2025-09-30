import { AbstractRepository } from "../../DB/abstract.repository";
import { IPost } from "../../utils/common/interface";
import { Post } from "./post.model";

export class PostRepository extends AbstractRepository<IPost>{
    constructor(){
        super(Post)
    }
} 