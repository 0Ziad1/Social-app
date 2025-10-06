import { ObjectId } from "mongoose";
import { GENDER, SYS_ROLES, USER_AGENT } from "../../../utils/common/enum";

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
    public twoStepVerfication!:Boolean;
    public _id!:ObjectId;
}