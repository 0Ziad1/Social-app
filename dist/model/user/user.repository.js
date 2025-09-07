"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const abstract_repository_1 = require("../../DB/abstract.repository");
const user_model_1 = __importDefault(require("./user.model"));
class UserRepository extends abstract_repository_1.AbstractRepository {
    constructor() {
        super(user_model_1.default);
    }
    async getAllUsers(filter, projection, options) {
        return await user_model_1.default.find(filter, projection, options);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map