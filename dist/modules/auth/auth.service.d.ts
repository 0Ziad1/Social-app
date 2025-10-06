import { NextFunction, Request, Response } from "express";
declare class AuthService {
    private userRepository;
    private authRepository;
    constructor();
    register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    resendOtp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    loginConfirmation: (req: Request, res: Response) => Promise<void>;
    verifyAccount: (req: Request, res: Response) => Promise<void>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map