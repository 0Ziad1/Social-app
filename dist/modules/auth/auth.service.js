"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../utils/error");
const user_repository_1 = require("../../model/user/user.repository");
const factory_1 = require("../../model/user/factory");
const mailer_1 = require("../../utils/mailer");
const otp_1 = require("../../utils/otp");
const hashing_1 = require("../../utils/hashing");
class UserService {
    userRepository = new user_repository_1.UserRepository();
    authRepository = new factory_1.AuthFactoryService();
    constructor() {
    }
    register = async (req, res, next) => {
        const registerDTO = req.body;
        const userExistance = await this.userRepository.exist({ email: registerDTO.email });
        if (userExistance) {
            throw new error_1.ConflictError("User already Exist");
        }
        const user = await this.authRepository.register(registerDTO);
        const createdUser = await this.userRepository.create(user);
        await (0, mailer_1.sendEmail)(user.email, "verify your account", `<p>your otp is ${user.otp}</p>`);
        res.
            status(200).
            json({ message: "User created successfully", success: true, data: createdUser });
    };
    resendOtp = async (req, res, next) => {
        const resendOtpDTO = req.body;
        const userExistance = await this.userRepository.exist({ email: resendOtpDTO.email });
        if (!userExistance) {
            throw new error_1.NotFoundError("email not found");
        }
        const otp = (0, otp_1.generateOtp)();
        const otpExpiryDate = (0, otp_1.generateExpiryDate)(15 * 60 * 1000);
        userExistance.otp = otp;
        userExistance.otpExpiryDate = otpExpiryDate;
        await userExistance.save();
        await (0, mailer_1.sendEmail)(userExistance.email, "verify your account", `<p>your otp is ${userExistance.otp}</p>`);
        res.status(200).json({ message: "otp resent successfully" });
    };
    login = async (req, res, next) => {
        const loginDTO = req.body;
        const userExistance = await this.userRepository.exist({ email: loginDTO.email });
        if (!userExistance) {
            throw new error_1.NotFoundError("email not found");
        }
        const match = (0, hashing_1.comparePassword)(loginDTO.password, userExistance.password);
        if (!match) {
            throw new error_1.AuthorityError("invalid credintials");
        }
        if (userExistance.isVerified == false) {
            throw new error_1.BadRequestError("verify your account first");
        }
        res.status(200).json({ message: "logged in successfully" });
    };
    verifyAccount = async (req, res, next) => {
        const verifyAccountDTO = req.body;
        const userExistance = await this.userRepository.exist({ email: verifyAccountDTO.email }, {});
        if (!userExistance) {
            throw new error_1.NotFoundError("email not found");
        }
        if (userExistance.otp != verifyAccountDTO.otp) {
            throw new error_1.BadRequestError("wrong otp");
        }
        if (userExistance.otpExpiryDate < Date.now()) {
            throw new error_1.BadRequestError("otp expired");
        }
        this.userRepository.updated({ _id: userExistance._id }, { isVerified: true });
        await userExistance.save();
        res.status(200).json({ message: "account verified successfully" });
    };
}
exports.default = new UserService();
//# sourceMappingURL=auth.service.js.map