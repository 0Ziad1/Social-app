"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
const enum_1 = require("../../utils/enum");
exports.registerSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(3).max(20).trim(),
    lastName: zod_1.z.string().min(3).max(20).trim(),
    phone: zod_1.z.string().length(11),
    email: zod_1.z.email(),
    gender: zod_1.z.enum(enum_1.GENDER),
    password: zod_1.z.string().min(6)
});
//# sourceMappingURL=auth.validatation.js.map