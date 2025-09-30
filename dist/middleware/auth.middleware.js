"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthanticated = void 0;
const token_1 = require("../utils/token");
const error_1 = require("../utils/error");
const user_1 = require("../model/user");
const isAuthanticated = () => {
    return async (req, res, next) => {
        const token = req.headers.authorization;
        const payload = (0, token_1.verifyToken)(token, undefined, {});
        if (!payload) {
            throw new error_1.AuthorityError("invalid Token");
        }
        const userRepository = new user_1.UserRepository();
        const userExistance = await userRepository.exist({ _id: payload.id });
        if (!userExistance) {
            throw new error_1.NotFoundError("user not found");
        }
        req.user = userExistance;
        next();
    };
};
exports.isAuthanticated = isAuthanticated;
//# sourceMappingURL=auth.middleware.js.map