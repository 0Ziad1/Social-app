import { z } from "zod";
import { GENDER } from "../../utils/common/enum";
export declare const registerSchema: z.ZodObject<{
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    email: string;
    gender: GENDER;
}, z.core.$strip>;
//# sourceMappingURL=auth.validation.d.ts.map