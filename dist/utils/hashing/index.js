"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashing = hashing;
exports.comparePassword = comparePassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function hashing(password) {
    return await bcrypt_1.default.hash(password, 10);
}
async function comparePassword(password, hashedPassword) {
    return await bcrypt_1.default.compare(password, hashedPassword);
}
//# sourceMappingURL=index.js.map