import { Schema } from "mongoose";
import { REACTION } from "../../utils/common/enum";

export const reactionSchema = new Schema({
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