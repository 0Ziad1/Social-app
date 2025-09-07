import { NextFunction, Request, Response } from "express";
declare class UserService {
    private userRepository;
    private authRepository;
    constructor();
    register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    resendOtp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    verifyAccount: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map