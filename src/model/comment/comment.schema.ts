import mongoose, { Schema } from "mongoose";
import { IComment } from "../../utils/common/interface";

const schema = new Schema<IComment>({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
    },
    postId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Post",
    }, 
    parentIds:[ {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Comment",
    }],
    content: {
        string: String,
    }
})
export default schema;