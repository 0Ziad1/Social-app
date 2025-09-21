"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../model/user");
const error_1 = require("../../utils/error");
class UserService {
    userRepo = new user_1.UserRepository();
    constructor() { }
    ;
    getProfile = async (req, res, next) => {
        const user = await this.userRepo.getOne({ _id: req.params.id });
        if (!user) {
            throw new error_1.NotFoundError("User not found");
        }
        req.user = user;
        res
            .status(200)
            .json({
            message: "done successfully", success: true, data: req.user
        });
    };
}
exports.default = new UserService;
//# sourceMappingURL=user.service.js.map