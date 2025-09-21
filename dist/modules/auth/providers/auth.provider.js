"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProvider = void 0;
const user_1 = require("../../../model/user");
const error_1 = require("../../../utils/error");
exports.authProvider = {
    async checkOTP(verifyAccountDTO) {
        const userRepository = new user_1.UserRepository();
        const userExistance = await userRepository.exist({ email: verifyAccountDTO.email }, {});
        if (!userExistance) {
            throw new error_1.NotFoundError("email not found");
        }
        if (userExistance.otp != verifyAccountDTO.otp) {
            throw new error_1.BadRequestError("wrong otp");
        }
        if (userExistance.otpExpiryDate < Date.now()) {
            throw new error_1.BadRequestError("otp expired");
        }
        return userExistance;
    }
};
//# sourceMappingURL=auth.provider.js.map