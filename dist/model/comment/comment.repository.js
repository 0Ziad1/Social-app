"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_repository_1 = require("../../DB/abstract.repository");
const comment_model_1 = __importDefault(require("./comment.model"));
class CommentRepository extends abstract_repository_1.AbstractRepository {
    constructor() {
        super(comment_model_1.default);
    }
}
exports.default = CommentRepository;
//# sourceMappingURL=comment.repository.js.map