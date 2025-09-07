"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashing = hashing;
exports.comparePassword = comparePassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
function hashing(password) {
    return bcrypt_1.default.hashSync(password, 10);
}
function comparePassword(password, hashedPassword) {
    return bcrypt_1.default.compareSync(password, hashedPassword);
}
//# sourceMappingURL=index.js.map