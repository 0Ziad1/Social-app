import { NextFunction, Request, Response } from "express";
import { LoginDTO, RegisterDTO, ResendOtpDTO, verifyAccountDTO } from "./auth.dto";
import User from "../../model/user/user.model";
import { AuthorityError, BadRequestError, ConflictError, NotFoundError } from "../../utils/error";
import { UserRepository } from "../../model/user/user.repository";
import { AuthFactoryService } from "../../model/user/factory";
import { sendEmail } from "../../utils/mailer";
import { generateExpiryDate, generateOtp } from "../../utils/otp";
import { comparePassword } from "../../utils/hashing";


class UserService {
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
        await sendEmail(user.email, "verify your account", `<p>your otp is ${user.otp}</p>`);
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
        await sendEmail(userExistance.email, "verify your account", `<p>your otp is ${userExistance.otp}</p>`);
        res.status(200).json({ message: "otp resent successfully" });
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        const loginDTO: LoginDTO = req.body;
        const userExistance = await this.userRepository.exist({ email: loginDTO.email });
        if (!userExistance) {
            throw new NotFoundError("email not found");
        }
        const match = comparePassword(loginDTO.password, userExistance.password);
        if (!match) {
            throw new AuthorityError("invalid credintials");
        }
        if (userExistance.isVerified == false) {
            throw new BadRequestError("verify your account first")
        }
        res.status(200).json({ message: "logged in successfully" });
    }

    verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
        const verifyAccountDTO: verifyAccountDTO = req.body;
        const userExistance = await this.userRepository.exist({ email: verifyAccountDTO.email },{});
        if (!userExistance) {
            throw new NotFoundError("email not found");
        }
        if(userExistance.otp != verifyAccountDTO.otp)
        {
            throw new BadRequestError("wrong otp");
        }
        if(userExistance.otpExpiryDate as any < Date.now())
        {
            throw new BadRequestError("otp expired");
        }
        this.userRepository.updated({_id:userExistance._id},{isVerified:true})
        await userExistance.save()
        res.status(200).json({message:"account verified successfully"})
    }
}
export default new UserService();