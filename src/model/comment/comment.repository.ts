import { AbstractRepository } from "../../DB/abstract.repository";
import { IComment } from "../../utils/common/interface";
import Comment from "./comment.model";
class CommentRepository extends AbstractRepository<IComment>{
    constructor(){
        super(Comment)
    }
}
export default  CommentRepository;