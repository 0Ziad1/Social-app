import jwt, { SignOptions } from "jsonwebtoken"
import { devConfig } from "../../config/dev.env"
export const generateToken = (payload: object
    , secretKey: string = devConfig.SECRET_KEY as string,
    options?: SignOptions) => {
    return jwt.sign(payload, secretKey, options)
}
export const verifyToken = (token: string
    , secretOrPublicKey: string = devConfig.SECRET_KEY as string, options?: jwt.VerifyOptions) => {
    return jwt.verify(token, secretOrPublicKey, options);
}