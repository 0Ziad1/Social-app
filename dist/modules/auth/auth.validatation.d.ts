import { z } from "zod";
import { GENDER } from "../../utils/enum";
export declare const registerSchema: z.ZodObject<{
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    email: string;
    gender: GENDER;
}, z.core.$strip>;
//# sourceMappingURL=auth.validatation.d.ts.map