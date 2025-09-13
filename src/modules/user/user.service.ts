import { NextFunction, Request, Response } from "express";
import { AuthFactoryService, UserRepository } from "../../model/user";
import { NotFoundError } from "../../utils/error";
class UserService {
    private userRepo = new UserRepository();
    constructor() { };
    getProfile = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.userRepo.getOne({ _id: req.params.id });
        if (!user) {
            throw new NotFoundError("User not found");
        }
        res
            .status(200)
            .json({
                message: "done successfully", success: true, data: user
            });
    }

}
export default new UserService;