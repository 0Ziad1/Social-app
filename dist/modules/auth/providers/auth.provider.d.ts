import { VerifyAccountDTO } from "../auth.dto";
export declare const authProvider: {
    checkOTP(verifyAccountDTO: VerifyAccountDTO): Promise<import("mongoose").Document<unknown, {}, import("../../../utils/interface").IUser, {}, {}> & import("../../../utils/interface").IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
};
//# sourceMappingURL=auth.provider.d.ts.map