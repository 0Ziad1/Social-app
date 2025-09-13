import type { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
export declare const isValid: (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validatation.middleware.d.ts.map