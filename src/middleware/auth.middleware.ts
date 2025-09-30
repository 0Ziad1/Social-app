import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/token"
import { IPayload } from "../utils/common/interface";
import { AuthorityError, NotFoundError } from "../utils/error";
import { UserRepository } from "../model/user";

export const isAuthanticated = () => {
    return async(req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization as string;
        const payload = verifyToken(token, undefined, {}) as IPayload;
        if (!payload) {
            throw new AuthorityError("invalid Token");
        }
        const userRepository = new UserRepository();
        const userExistance = await userRepository.exist({ _id: payload.id });
        if (!userExistance) {
            throw new NotFoundError("user not found");
        }
       req.user = userExistance;
       next();
    }
}