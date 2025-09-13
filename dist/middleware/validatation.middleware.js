"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
const error_1 = require("../utils/error");
const isValid = (schema) => {
    return (req, res, next) => {
        let data = { ...req.body, ...req.params, ...req.query };
        const result = schema.safeParse(data);
        if (result.success == false) {
            const errorMessage = result.error.issues.map((issue) => ({
                path: issue.path[0],
                message: issue.message
            }));
            throw new error_1.BadRequestError("Validation error", errorMessage);
        }
        next();
    };
};
exports.isValid = isValid;
//# sourceMappingURL=validatation.middleware.js.map