import mongoose, { Schema } from "mongoose";
import { IComment } from "../../utils/common/interface";
import { reactionSchema } from "../common/reaction.schema";

const commentSchema = new Schema<IComment>({
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
    parentId: {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
    },
    content: {
        type: String,
    },
    reactions: [{ type: reactionSchema }]

}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } })
commentSchema.virtual("replies",
    {
        foreignField: "parentId",
        localField: "_id",
        ref: "Comment"
    }
)
commentSchema.pre("deleteOne", async function (next) {
    const filter = typeof this.getFilter == "function" ? this.getFilter() : {};
    const replies = await this.model.find({ parentId: filter._id });
    if (replies.length) {
        for (const reply of replies) {
            await this.model.deleteOne({ _id: reply._id });
        }
    }
    next();
})
export default commentSchema;