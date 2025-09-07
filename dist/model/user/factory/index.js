"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFactoryService = void 0;
const enum_1 = require("../../../utils/enum");
const hashing_1 = require("../../../utils/hashing");
const otp_1 = require("../../../utils/otp");
const entity_1 = require("../entity");
class AuthFactoryService {
    register(registerDTO) {
        const user = new entity_1.User();
        user.firstName = registerDTO.firstName;
        user.lastName = registerDTO.lastName;
        user.gender = registerDTO.gender;
        user.email = registerDTO.email;
        user.phone = registerDTO.phone;
        user.userAgent = enum_1.USER_AGENT.local;
        user.credentialsUpdatedAt = Date.now();
        user.role = enum_1.SYS_ROLES.user;
        user.otp = (0, otp_1.generateOtp)();
        user.otpExpiryDate = (0, otp_1.generateExpiryDate)(15 * 60 * 1000);
        user.password = (0, hashing_1.hashing)(registerDTO.password);
        user.isVerified = false;
        return user;
    }
}
exports.AuthFactoryService = AuthFactoryService;
//# sourceMappingURL=index.js.map