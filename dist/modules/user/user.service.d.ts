import { NextFunction, Request, Response } from "express";
declare class UserService {
    private userRepo;
    constructor();
    getProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    requestTwoStepVerfication: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    enableTwoStepVerfication: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updatePassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateEmail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateBasicInfo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=user.service.d.ts.map