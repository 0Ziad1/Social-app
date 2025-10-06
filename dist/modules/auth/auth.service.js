"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dev_env_1 = require("../../config/dev.env");
const user_1 = require("../../model/user");
const error_1 = require("../../utils/error");
const hashing_1 = require("../../utils/hashing");
const mailer_1 = require("../../utils/mailer");
const otp_1 = require("../../utils/otp");
const token_1 = require("../../utils/token");
const auth_provider_1 = require("./providers/auth.provider");
class AuthService {
    userRepository = new user_1.UserRepository();
    authRepository = new user_1.AuthFactoryService();
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
    login = async (req, res) => {
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
        if (userExistance.twoStepVerfication == true) {
            const otp = (0, otp_1.generateOtp)();
            const otpExpiryDate = (0, otp_1.generateExpiryDate)(15 * 60 * 1000);
            await this.userRepository.updated({ email: userExistance.email }, { otp, otpExpiryDate });
            await (0, mailer_1.sendEmail)({
                from: `'social-app' <${dev_env_1.devConfig.EMAIL}>`,
                to: userExistance.email,
                subject: "Your otp is",
                html: `<h1>Your OTP is ${otp}</h1>`,
            });
            res.sendStatus(204);
        }
        const accessToken = (0, token_1.generateToken)({ id: userExistance._id, role: userExistance.role }, undefined, { expiresIn: 15 * 60 * 1000 });
        res.status(200).json({ message: "logged in successfully", data: accessToken });
    };
    loginConfirmation = async (req, res) => {
        const loginConfirmationDTO = req.body;
        const user = await this.userRepository.exist({ email: req.user?.email });
        if (user?.otp != loginConfirmationDTO.otp)
            throw new error_1.BadRequestError("Wrong otp");
        if (user?.otpExpiryDate < Date.now())
            throw new error_1.BadRequestError("Otp Expired");
        const accessToken = (0, token_1.generateToken)({ id: req.user?._id, role: req.user?.role }, undefined, { expiresIn: 15 * 60 * 1000 });
        res.status(200).json({ message: "logged in successfully", data: accessToken });
    };
    verifyAccount = async (req, res) => {
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