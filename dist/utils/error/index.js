"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.BadRequestError = exports.AuthorityError = exports.ConflictError = void 0;
class AppError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
class ConflictError extends AppError {
    message;
    constructor(message) {
        super(message, 409);
        this.message = message;
    }
}
exports.ConflictError = ConflictError;
class AuthorityError extends AppError {
    message;
    constructor(message) {
        super(message, 401);
        this.message = message;
    }
}
exports.AuthorityError = AuthorityError;
class BadRequestError extends AppError {
    message;
    constructor(message) {
        super(message, 400);
        this.message = message;
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends AppError {
    message;
    constructor(message) {
        super(message, 404);
        this.message = message;
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=index.js.map