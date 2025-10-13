import { ObjectId, VirtualType } from "mongoose";
import { GENDER, SYS_ROLES, USER_AGENT } from "../enum";
import { JwtPayload } from "jsonwebtoken";


export interface IUser {
    firstName: string,
    lastName: string,
    phone: string,
    role: SYS_ROLES,
    password: string,
    email: string,
    credentialsUpdatedAt: Date,
    gender: GENDER,
    userAgent: USER_AGENT,
    fullName?: string,
    otp?: string,
    otpExpiryDate?: Date,
    isVerified: Boolean,
    _id: ObjectId;
    twoStepVerfication: Boolean;
    blockedUsers : ObjectId[],
}
export interface IPayload extends JwtPayload {
    id: string,
    role: string,
}
declare module "express" {
    interface Request {
        user?: IUser,
    }
}
export interface IAttachments {
    url: string,
    id: string,
}
export interface IReactions {
    userId: ObjectId,
    reaction: Number,
}
export interface IPost {
    userId: ObjectId,
    content: string,
    // attachments?:IAttachments[],
    _id?: ObjectId;
    reactions: IReactions[],
    frozen: Boolean,
}
export interface IComment {
    userId: ObjectId,
    postId: ObjectId,
    parentId: ObjectId,
    content: string,
    attachments: IAttachments,
    reactions: IReactions,
    mentions: ObjectId[],
    _id: ObjectId,
    frozen: Boolean,
}