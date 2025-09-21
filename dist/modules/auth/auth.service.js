"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../utils/error");
const user_1 = require("../../model/user");
const user_2 = require("../../model/user");
const mailer_1 = require("../../utils/mailer");
const otp_1 = require("../../utils/otp");
const hashing_1 = require("../../utils/hashing");
const dev_env_1 = require("../../config/dev.env");
const auth_provider_1 = require("./providers/auth.provider");
class AuthService {
    userRepository = new user_1.UserRepository();
    authRepository = new user_2.AuthFactoryService();
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
        await (0, mailer_1.sendEmail)({
            from: `'social-app' <${dev_env_1.devConfig.EMAIL}>`,
            to: userExistance.email,
            subject: "verify your account",
            html: `<h1>your otp is ${userExistance.otp}</h1>`
        });
        res.status(200).json({ message: "otp resent successfully" });
    };
    login = async (req, res, next) => {
        const loginDTO = req.body;
        const userExistance = await this.userRepository.exist({ email: loginDTO.email });
        if (!userExistance) {
            throw new error_1.NotFoundError("email not found");
        }
        const match = await (0, hashing_1.comparePassword)(loginDTO.password, userExistance.password);
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
        const userExistance = await auth_provider_1.authProvider.checkOTP(verifyAccountDTO);
        this.userRepository.updated({ _id: userExistance._id }, {
            isVerified: true,
            $unset: { otp: 1, otpExpiryDate: 1 }
        });
        await userExistance.save();
        res.sendStatus(204);
    };
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map