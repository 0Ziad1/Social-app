import { NextFunction, Request, Response } from "express";
import { devConfig } from "../../config/dev.env";
import { AuthFactoryService, UserRepository } from "../../model/user";
import { AuthorityError, BadRequestError, ConflictError, NotFoundError } from "../../utils/error";
import { comparePassword } from "../../utils/hashing";
import { sendEmail } from "../../utils/mailer";
import { generateExpiryDate, generateOtp } from "../../utils/otp";
import { generateToken } from "../../utils/token";
import { LoginConfirmationDTO, LoginDTO, RegisterDTO, ResendOtpDTO, VerifyAccountDTO } from "./auth.dto";
import { authProvider } from "./providers/auth.provider";
import { email } from "zod";

class AuthService {
    private userRepository = new UserRepository()
    private authRepository = new AuthFactoryService();
    constructor() {
    }
    register = async (req: Request, res: Response, next: NextFunction) => {
        const registerDTO: RegisterDTO = req.body;
        const userExistance = await this.userRepository.exist({ email: registerDTO.email });
        if (userExistance) {
            throw new ConflictError("User already Exist");
        }
        const user = await this.authRepository.register(registerDTO);
        const createdUser = await this.userRepository.create(user);
        res.
            status(200).
            json({ message: "User created successfully", success: true, data: createdUser });
    }
    resendOtp = async (req: Request, res: Response, next: NextFunction) => {
        const resendOtpDTO: ResendOtpDTO = req.body;
        const userExistance = await this.userRepository.exist({ email: resendOtpDTO.email });
        if (!userExistance) {
            throw new NotFoundError("email not found");
        }
        const otp = generateOtp();
        const otpExpiryDate = generateExpiryDate(15 * 60 * 1000);
        userExistance.otp = otp as unknown as string;
        userExistance.otpExpiryDate = otpExpiryDate;
        await userExistance.save()
        await sendEmail({
            from: `'social-app' <${devConfig.EMAIL}>`,
            to: userExistance.email,
            subject: "verify your account",
            html: `<h1>your otp is ${userExistance.otp}</h1>`
        });
        res.status(200).json({ message: "otp resent successfully" });
    }

    login = async (req: Request, res: Response) => {
        const loginDTO: LoginDTO = req.body;
        const userExistance = await this.userRepository.exist({ email: loginDTO.email });
        if (!userExistance) {
            throw new NotFoundError("email not found");
        }
        const match = await comparePassword(loginDTO.password, userExistance.password);
        if (!match) {
            throw new AuthorityError("invalid credintials");
        }
        if (userExistance.isVerified == false) {
            throw new BadRequestError("verify your account first")
        }
        if (userExistance.twoStepVerfication == true) {
            const otp = generateOtp();
            const otpExpiryDate = generateExpiryDate(15 * 60 * 1000);
            await this.userRepository.updated({ email: userExistance.email }, { otp, otpExpiryDate })
            await sendEmail(
                {
                    from: `'social-app' <${devConfig.EMAIL}>`,
                    to: userExistance.email as string,
                    subject: "Your otp is",
                    html: `<h1>Your OTP is ${otp}</h1>`,
                })
            res.sendStatus(204);
        }
        const accessToken = generateToken({ id: userExistance._id, role: userExistance.role }, undefined, { expiresIn: 15 * 60 * 1000 });
        res.status(200).json({ message: "logged in successfully", data: accessToken });
    }
    loginConfirmation = async (req: Request, res: Response) => {
        const loginConfirmationDTO: LoginConfirmationDTO = req.body;
        const user = await this.userRepository.exist({ email: req.user?.email });
        if (user?.otp != loginConfirmationDTO.otp) throw new BadRequestError("Wrong otp");
        if (user?.otpExpiryDate as any < Date.now()) throw new BadRequestError("Otp Expired");
        const accessToken = generateToken({ id: req.user?._id, role: req.user?.role }
            , undefined, { expiresIn: 15 * 60 * 1000 });
        res.status(200).json({ message: "logged in successfully", data: accessToken });
    }

    verifyAccount = async (req: Request, res: Response) => {
        const verifyAccountDTO: VerifyAccountDTO = req.body;
        const userExistance = await authProvider.checkOTP(verifyAccountDTO);
        this.userRepository.updated({ _id: userExistance._id }, {
            isVerified: true,
            $unset: { otp: 1, otpExpiryDate: 1 }
        })
        await userExistance.save()
        res.sendStatus(204);
    }
}
export default new AuthService();