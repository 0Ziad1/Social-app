"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dev_env_1 = require("../../config/dev.env");
const generateToken = (payload, secretKey = dev_env_1.devConfig.SECRET_KEY, options) => {
    return jsonwebtoken_1.default.sign(payload, secretKey, options);
};
exports.generateToken = generateToken;
const verifyToken = (token, secretOrPublicKey = dev_env_1.devConfig.SECRET_KEY, options) => {
    return jsonwebtoken_1.default.verify(token, secretOrPublicKey, options);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=index.js.map