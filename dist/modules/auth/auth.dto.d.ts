import { GENDER } from "../../utils/enum";
export interface RegisterDTO {
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    email: string;
    gender: GENDER;
}
export interface ResendOtpDTO {
    email: string;
}
export interface LoginDTO {
    email: string;
    password: string;
}
export interface verifyAccountDTO {
    email: string;
    otp: string;
}
//# sourceMappingURL=auth.dto.d.ts.map