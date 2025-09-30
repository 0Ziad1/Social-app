import { VerifyAccountDTO } from "../auth.dto";
export declare const authProvider: {
    checkOTP(verifyAccountDTO: VerifyAccountDTO): Promise<import("mongoose").Document<unknown, {}, import("../../../utils/common/interface").IUser, {}, {}> & import("../../../utils/common/interface").IUser & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
};
//# sourceMappingURL=auth.provider.d.ts.map