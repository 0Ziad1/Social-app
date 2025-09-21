"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.devConfig = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    EMAIL: process.env.EMAIL,
    PASS: process.env.PASS,
};
//# sourceMappingURL=dev.env.js.map