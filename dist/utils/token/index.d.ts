import jwt, { SignOptions } from "jsonwebtoken";
export declare const generateToken: (payload: object, secretKey?: string, options?: SignOptions) => string;
export declare const verifyToken: (token: string, secretOrPublicKey?: string, options?: jwt.VerifyOptions) => string | jwt.JwtPayload | jwt.Jwt;
//# sourceMappingURL=index.d.ts.map