import { ObjectId } from "mongoose";
import { GENDER, SYS_ROLES, USER_AGENT } from "../../../utils/common/enum";
export declare class User {
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
    twoStepVerfication: Boolean;
    _id: ObjectId;
}
//# sourceMappingURL=index.d.ts.map