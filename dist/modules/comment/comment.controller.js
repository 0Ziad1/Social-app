"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_service_1 = __importDefault(require("./comment.service"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)({ mergeParams: true });
router.post("{/:id}", (0, auth_middleware_1.isAuthanticated)(), comment_service_1.default.createComment);
router.get("/:id", comment_service_1.default.getSpecific);
router.delete("/:id", (0, auth_middleware_1.isAuthanticated)(), comment_service_1.default.deleteComment);
router.post("/react/:id", (0, auth_middleware_1.isAuthanticated)(), comment_service_1.default.addReaction);
exports.default = router;
//# sourceMappingURL=comment.controller.js.map