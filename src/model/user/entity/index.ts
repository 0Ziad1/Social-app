import { GENDER, SYS_ROLES, USER_AGENT } from "../../../utils/enum";

export class User {
    public firstName!: string;
    public lastName!: string;
    public phone!: string;
    public role!: SYS_ROLES;
    public password!: string;
    public email!: string;
    public credentialsUpdatedAt!: Date;
    public gender!: GENDER;
    public userAgent!: USER_AGENT;
    public fullName?: string;
    public otp?:string;
    public otpExpiryDate?:Date;
    public isVerified!:Boolean;
}