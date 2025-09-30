"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentFactoryService = void 0;
const entity_1 = require("../entity");
class CommentFactoryService {
    constructor() { }
    ;
    createComment(createCommentDTO, user, post, comment) {
        const newComment = new entity_1.Comment();
        newComment.userId = user._id;
        newComment.postId = post._id;
        // newComment.attachments = createCommentDTO.attachment;
        newComment.content = createCommentDTO.content;
        newComment.parentIds = comment ? [...comment.parentIds, comment._id] : [];
        return newComment;
    }
}
exports.CommentFactoryService = CommentFactoryService;
//# sourceMappingURL=index.js.map