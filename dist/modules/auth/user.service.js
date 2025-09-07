"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    constructor() { }
    register(req, res, next) {
        res.
            status(200).
            json({ message: "User created successfully", success: true });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map