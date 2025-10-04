import { Schema } from "mongoose";
import { ref } from "process";
import { required } from "zod/mini";
import { IPost } from "../../utils/common/interface";
import { number } from "zod";
import { REACTION } from "../../utils/common/enum";
import { reactionSchema } from "../common/reaction.schema";
import Comment from "../comment/comment.model";

export const postSchema = new Schema<IPost>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    content: {
        type: String,
        // required: function () {
        //     if (this.attachments?.length) return false;
        //     return true;
        // }
        required: true,
    },
    reactions: [{ type: reactionSchema }]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
postSchema.virtual("comments", {
    localField: "_id",
    foreignField: "postId",
    ref: "Comment",

})
postSchema.pre("deleteOne", async function (next) {
    const filter = typeof this.getFilter == "function" ? this.getFilter() : {};
    await Comment.deleteMany({ postId: filter._id });
    next();
})