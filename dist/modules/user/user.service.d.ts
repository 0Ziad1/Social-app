import { NextFunction, Request, Response } from "express";
declare class UserService {
    private userRepo;
    constructor();
    getProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=user.service.d.ts.map