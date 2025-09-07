import { GENDER, SYS_ROLES, USER_AGENT } from "../enum";
export interface IUser {
    firstName: string;
    lastName: string;
    phone: string;
    role: SYS_ROLES;
    password: string;
    email: string;
    credentialsUpdatedAt: Date;
    gender: GENDER;
    userAgent: USER_AGENT;
    fullName?: string;
    otp?: string;
    otpExpiryDate?: Date;
    isVerified: Boolean;
}
//# sourceMappingURL=index.d.ts.map