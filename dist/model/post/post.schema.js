"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
const reaction_schema_1 = require("../common/reaction.schema");
const comment_model_1 = __importDefault(require("../comment/comment.model"));
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
    reactions: [{ type: reaction_schema_1.reactionSchema }]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.postSchema.virtual("comments", {
    localField: "_id",
    foreignField: "postId",
    ref: "Comment",
});
exports.postSchema.pre("deleteOne", async function (next) {
    const filter = typeof this.getFilter == "function" ? this.getFilter() : {};
    await comment_model_1.default.deleteMany({ postId: filter._id });
    next();
});
//# sourceMappingURL=post.schema.js.map