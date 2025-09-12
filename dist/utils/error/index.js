"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.BadRequestError = exports.AuthorityError = exports.ConflictError = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    errorDetails;
    constructor(message, statusCode, errorDetails) {
        super(message);
        this.statusCode = statusCode;
        this.errorDetails = errorDetails;
    }
}
exports.AppError = AppError;
class ConflictError extends AppError {
    message;
    errorDetails;
    constructor(message, errorDetails) {
        super(message, 409, errorDetails);
        this.message = message;
        this.errorDetails = errorDetails;
    }
}
exports.ConflictError = ConflictError;
class AuthorityError extends AppError {
    message;
    errorDetails;
    constructor(message, errorDetails) {
        super(message, 401, errorDetails);
        this.message = message;
        this.errorDetails = errorDetails;
    }
}
exports.AuthorityError = AuthorityError;
class BadRequestError extends AppError {
    message;
    errorDetails;
    constructor(message, errorDetails) {
        super(message, 400, errorDetails);
        this.message = message;
        this.errorDetails = errorDetails;
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends AppError {
    message;
    errorDetails;
    constructor(message, errorDetails) {
        super(message, 404, errorDetails);
        this.message = message;
        this.errorDetails = errorDetails;
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=index.js.map