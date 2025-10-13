import { ObjectId } from "mongoose";
import { IReactions } from "../../../utils/common/interface";
declare class Post {
    userId: ObjectId;
    reactions: IReactions[];
    content: string;
    frozen: boolean;
}
export default Post;
//# sourceMappingURL=index.d.ts.map