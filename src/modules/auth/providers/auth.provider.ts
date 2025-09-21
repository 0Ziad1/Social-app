import { UserRepository } from "../../../model/user";
import { BadRequestError, NotFoundError } from "../../../utils/error";
import { VerifyAccountDTO } from "../auth.dto";

export const authProvider ={
   async checkOTP(verifyAccountDTO:VerifyAccountDTO){
        const userRepository = new UserRepository()
        const userExistance = await userRepository.exist({ email: verifyAccountDTO.email }, {});
        if (!userExistance) {
            throw new NotFoundError("email not found");
        }
        if (userExistance.otp != verifyAccountDTO.otp) {
            throw new BadRequestError("wrong otp");
        }
        if (userExistance.otpExpiryDate as any < Date.now()) {
            throw new BadRequestError("otp expired");
        }
        return userExistance;

   }
   
}