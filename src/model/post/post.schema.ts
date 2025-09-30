import { Schema } from "mongoose";
import { ref } from "process";
import { required } from "zod/mini";
import { IPost } from "../../utils/common/interface";
import { number } from "zod";
import { REACTION } from "../../utils/common/enum";
const reactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reaction: {
        type: Number,
        enum: REACTION,
        default: REACTION.like,
    },

})
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