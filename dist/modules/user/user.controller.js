"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const user_service_1 = __importDefault(require("./user.service"));
const router = (0, express_1.Router)();
router.get("/2FA/request", (0, auth_middleware_1.isAuthanticated)(), user_service_1.default.requestTwoStepVerfication);
router.get("/:id", user_service_1.default.getProfile);
router.patch("/2FA/enable", (0, auth_middleware_1.isAuthanticated)(), user_service_1.default.enableTwoStepVerfication);
router.patch("/update-password", user_service_1.default.updatePassword);
router.patch("/update-basic-info", (0, auth_middleware_1.isAuthanticated)(), user_service_1.default.updateBasicInfo);
router.patch("/update-email", (0, auth_middleware_1.isAuthanticated)(), user_service_1.default.updateEmail);
exports.default = router;
//# sourceMappingURL=user.controller.js.map