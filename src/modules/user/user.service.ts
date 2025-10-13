import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../model/user";
import { AuthorityError, BadRequestError, NotFoundError } from "../../utils/error";
import { TwoStepVerficationDTO, UpdatePassowordDTO } from "./user.dto";
import { sendEmail } from "../../utils/mailer";
import { devConfig } from "../../config/dev.env";
import { generateExpiryDate, generateOtp } from "../../utils/otp";
import { comparePassword, hashing } from "../../utils/hashing";
import { ObjectId } from "mongoose";
class UserService {
    private userRepo = new UserRepository();
    constructor() { };
    public getProfile = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.userRepo.getOne({ _id: req.params.id });
        if (!user) {
            throw new NotFoundError("User not found");
        }
        req.user = user;
        res
            .status(200)
            .json({
                message: "done successfully", success: true, data: req.user
            });
    }
    public requestTwoStepVerfication = async (req: Request, res: Response) => {
        const email = req.user?.email;
        const otp = generateOtp();
        const otpExpiryDate = generateExpiryDate(15 * 60 * 1000);
        await this.userRepo.updated({ email }, { otp, otpExpiryDate });
        await sendEmail(
            {
                from: `'social-app' <${devConfig.EMAIL}>`,
                to: email as string,
                subject: "This is your otp to enable 2FA",
                html: `<h1>Your OTP is ${otp}</h1>`,
            }
        )
        return res.status(200).json({ message: "Otp has send" });
    }
    public enableTwoStepVerfication = async (req: Request, res: Response) => {
        const email = req.user?.email;
        const twoStepVerficationDTO: TwoStepVerficationDTO = req.body;
        const user = await this.userRepo.exist({ email })
        if (req.user?.otp != twoStepVerficationDTO.otp) throw new BadRequestError("Wrong otp");
        if (req.user?.otpExpiryDate as any < Date.now()) throw new BadRequestError("Otp Expired");
        await this.userRepo.updated({ email },
            { $unset: { otp: 1, otpExpiryDate: 1 }, twoStepVerfication: true }, {});
        return res.status(200).json({ message: "2FA enabled successfully" });
    }
    public updatePassword = async (req: Request, res: Response) => {
        const updatePassowordDTO: UpdatePassowordDTO = req.body;
        const userExistance = await this.userRepo.exist({ email: updatePassowordDTO.email });
        if (!userExistance) throw new NotFoundError("User not found");
        const match = await comparePassword(updatePassowordDTO.password, userExistance.password);
        if (!match) throw new AuthorityError("invalid credintials");
        const updatedPassword = await hashing(updatePassowordDTO.newPassword)
        await this.userRepo.updated({ email: updatePassowordDTO.email }
            , { password: updatedPassword });
        return res.status(200).json({ message: "Password updated" });
    }
    public updateEmail = async (req: Request, res: Response) => {
        const userId = req.user?._id;
        const { newEmail } = req.body;

        if (!newEmail) throw new BadRequestError("New email is required");

        const existing = await this.userRepo.exist({ email: newEmail });
        if (existing) throw new BadRequestError("Email already in use");

        await this.userRepo.updated({ _id: userId }, { email: newEmail });

        await sendEmail({
            from: `'social-app' <${devConfig.EMAIL}>`,
            to: newEmail,
            subject: "Email updated successfully",
            html: `<p>Your email has been changed successfully.</p>`,
        });

        return res.status(200).json({ message: "Email updated successfully" });
    };
    public updateBasicInfo = async (req: Request, res: Response) => {
        const userId = req.user?._id;
        const { firstName, lastName, gender, bio } = req.body;

        const updateData: any = {};
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (gender) updateData.gender = gender;
        if (bio) updateData.bio = bio;

        if (Object.keys(updateData).length === 0)
            throw new BadRequestError("No fields provided to update");

        await this.userRepo.updated({ _id: userId }, updateData);

        return res.status(200).json({ message: "Profile updated successfully" });
    };
    public blockUser = async (req: Request, res: Response) => {
        const user = req.user;
        const { id } = req.params;
        const userExistance = await this.userRepo.exist({ _id: id });
        if (!userExistance) throw new NotFoundError("User not found");
        user?.blockedUsers.push("68ed413247d1091d97a0c1cb" as unknown as ObjectId);
        await this.userRepo.updated(
            { _id: user?._id },
            { $push: { blockedUsers: id } }
        );
        res.status(200).json({ message: "User blocked successfully" });
    }
}



export default new UserService;