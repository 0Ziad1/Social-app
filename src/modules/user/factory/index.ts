import { RegisterDTO } from "../../auth/auth.dto";
import { SYS_ROLES, USER_AGENT } from "../../../utils/common/enum";
import { hashing } from "../../../utils/hashing";
import { generateExpiryDate, generateOtp } from "../../../utils/otp";
import { User } from "../entity";

export class AuthFactoryService {
    async register(registerDTO: RegisterDTO) {
        const user = new User();
        user.firstName = registerDTO.firstName;
        user.lastName = registerDTO.lastName;
        user.gender = registerDTO.gender;
        user.email = registerDTO.email;
        user.phone = registerDTO.phone;
        user.userAgent = USER_AGENT.local;
        user.credentialsUpdatedAt = Date.now() as unknown as Date;
        user.role = SYS_ROLES.user;
        user.otp = generateOtp() as unknown as string;
        user.otpExpiryDate = generateExpiryDate(15 * 60 * 1000)
        user.password = await hashing(registerDTO.password);
        user.isVerified = false;
        user.twoStepVerfication = false;
        user.blockedUsers = [];
        return user;
    }
}