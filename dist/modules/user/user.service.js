"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../model/user");
const error_1 = require("../../utils/error");
const mailer_1 = require("../../utils/mailer");
const dev_env_1 = require("../../config/dev.env");
const otp_1 = require("../../utils/otp");
const hashing_1 = require("../../utils/hashing");
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
    requestTwoStepVerfication = async (req, res) => {
        const email = req.user?.email;
        const otp = (0, otp_1.generateOtp)();
        const otpExpiryDate = (0, otp_1.generateExpiryDate)(15 * 60 * 1000);
        await this.userRepo.updated({ email }, { otp, otpExpiryDate });
        await (0, mailer_1.sendEmail)({
            from: `'social-app' <${dev_env_1.devConfig.EMAIL}>`,
            to: email,
            subject: "This is your otp to enable 2FA",
            html: `<h1>Your OTP is ${otp}</h1>`,
        });
        return res.status(200).json({ message: "Otp has send" });
    };
    enableTwoStepVerfication = async (req, res) => {
        const email = req.user?.email;
        const twoStepVerficationDTO = req.body;
        const user = await this.userRepo.exist({ email });
        if (req.user?.otp != twoStepVerficationDTO.otp)
            throw new error_1.BadRequestError("Wrong otp");
        if (req.user?.otpExpiryDate < Date.now())
            throw new error_1.BadRequestError("Otp Expired");
        await this.userRepo.updated({ email }, { $unset: { otp: 1, otpExpiryDate: 1 }, twoStepVerfication: true }, {});
        return res.status(200).json({ message: "2FA enabled successfully" });
    };
    updatePassword = async (req, res) => {
        const updatePassowordDTO = req.body;
        const userExistance = await this.userRepo.exist({ email: updatePassowordDTO.email });
        if (!userExistance)
            throw new error_1.NotFoundError("User not found");
        const match = await (0, hashing_1.comparePassword)(updatePassowordDTO.password, userExistance.password);
        if (!match)
            throw new error_1.AuthorityError("invalid credintials");
        const updatedPassword = await (0, hashing_1.hashing)(updatePassowordDTO.newPassword);
        await this.userRepo.updated({ email: updatePassowordDTO.email }, { password: updatedPassword });
        return res.status(200).json({ message: "Password updated" });
    };
    updateEmail = async (req, res) => {
        const userId = req.user?._id;
        const { newEmail } = req.body;
        if (!newEmail)
            throw new error_1.BadRequestError("New email is required");
        const existing = await this.userRepo.exist({ email: newEmail });
        if (existing)
            throw new error_1.BadRequestError("Email already in use");
        await this.userRepo.updated({ _id: userId }, { email: newEmail });
        await (0, mailer_1.sendEmail)({
            from: `'social-app' <${dev_env_1.devConfig.EMAIL}>`,
            to: newEmail,
            subject: "Email updated successfully",
            html: `<p>Your email has been changed successfully.</p>`,
        });
        return res.status(200).json({ message: "Email updated successfully" });
    };
    updateBasicInfo = async (req, res) => {
        const userId = req.user?._id;
        const { firstName, lastName, gender, bio } = req.body;
        const updateData = {};
        if (firstName)
            updateData.firstName = firstName;
        if (lastName)
            updateData.lastName = lastName;
        if (gender)
            updateData.gender = gender;
        if (bio)
            updateData.bio = bio;
        if (Object.keys(updateData).length === 0)
            throw new error_1.BadRequestError("No fields provided to update");
        await this.userRepo.updated({ _id: userId }, updateData);
        return res.status(200).json({ message: "Profile updated successfully" });
    };
    blockUser = async (req, res) => {
        const user = req.user;
        const { id } = req.params;
        const userExistance = await this.userRepo.exist({ _id: id });
        if (!userExistance)
            throw new error_1.NotFoundError("User not found");
        user?.blockedUsers.push("68ed413247d1091d97a0c1cb");
        await this.userRepo.updated({ _id: user?._id }, { $push: { blockedUsers: id } });
        res.status(200).json({ message: "User blocked successfully" });
    };
}
exports.default = new UserService;
//# sourceMappingURL=user.service.js.map