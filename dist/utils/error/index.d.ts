declare class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
export declare class ConflictError extends AppError {
    message: string;
    constructor(message: string);
}
export declare class AuthorityError extends AppError {
    message: string;
    constructor(message: string);
}
export declare class BadRequestError extends AppError {
    message: string;
    constructor(message: string);
}
export declare class NotFoundError extends AppError {
    message: string;
    constructor(message: string);
}
export {};
//# sourceMappingURL=index.d.ts.map