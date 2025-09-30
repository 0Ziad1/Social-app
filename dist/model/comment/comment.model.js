"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const comment_schema_1 = __importDefault(require("./comment.schema"));
const Comment = (0, mongoose_1.model)("Comment", comment_schema_1.default);
exports.default = Comment;
//# sourceMappingURL=comment.model.js.map