"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const auth_controller_1 = __importDefault(require("./modules/auth/auth.controller"));
const connection_1 = require("./DB/connection");
function bootstrap(app, express) {
    app.use(express.json());
    app.use("/auth", auth_controller_1.default);
    app.use((error, req, res, next) => {
        if (!error) {
            next();
        }
        res.status(error.statusCode).json({ message: error.message, errorDetails: error.errorDetails });
    });
    app.use("/:dummy", (req, res, next) => {
        res.status(404).json({ message: "invalid url" });
    });
    (0, connection_1.connectDB)();
}
//# sourceMappingURL=app.controller.js.map