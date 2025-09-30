"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../utils/common/enum");
const reactionSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reaction: {
        type: Number,
        enum: enum_1.REACTION,
        default: enum_1.REACTION.like,
    },
});
exports.postSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.postSchema.virtual("comments", {
    localField: "_id",
    foreignField: "postId",
    ref: "Comment",
});
//# sourceMappingURL=post.schema.js.map