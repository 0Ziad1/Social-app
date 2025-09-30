"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFactoryService = void 0;
const entity_1 = __importDefault(require("../entity"));
class PostFactoryService {
    createPost(createPostDTO, user) {
        const post = new entity_1.default;
        post.userId = user._id;
        post.content = createPostDTO.content;
        post.reactions = [];
        return post;
    }
}
exports.PostFactoryService = PostFactoryService;
//# sourceMappingURL=index.js.map