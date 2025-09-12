export declare class AppError extends Error {
    statusCode: number;
    errorDetails?: Record<string, any>[] | undefined;
    constructor(message: string, statusCode: number, errorDetails?: Record<string, any>[] | undefined);
}
export declare class ConflictError extends AppError {
    message: string;
    errorDetails?: Record<string, any>[] | undefined;
    constructor(message: string, errorDetails?: Record<string, any>[] | undefined);
}
export declare class AuthorityError extends AppError {
    message: string;
    errorDetails?: Record<string, any>[] | undefined;
    constructor(message: string, errorDetails?: Record<string, any>[] | undefined);
}
export declare class BadRequestError extends AppError {
    message: string;
    errorDetails?: Record<string, any>[] | undefined;
    constructor(message: string, errorDetails?: Record<string, any>[] | undefined);
}
export declare class NotFoundError extends AppError {
    message: string;
    errorDetails?: Record<string, any>[] | undefined;
    constructor(message: string, errorDetails?: Record<string, any>[] | undefined);
}
//# sourceMappingURL=index.d.ts.map