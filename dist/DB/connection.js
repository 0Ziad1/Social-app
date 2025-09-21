"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const dev_env_1 = require("../config/dev.env");
async function connectDB() {
    console.log(dev_env_1.devConfig.DB_URL);
    await mongoose_1.default.connect(dev_env_1.devConfig.DB_URL).then(() => {
        console.log("DB connected successfully");
    }).catch(() => {
        console.log("failed to connect to DB");
    });
}
//# sourceMappingURL=connection.js.map