"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendEmail(email, sub, html) {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "Ziadmogadam@gmail.com",
            pass: "bwojdodvpegfxqsc",
        },
    });
    await transporter.sendMail({
        from: "'social-app'<Ziadmogadam@gmail.com>",
        to: email,
        subject: sub,
        html: html,
    });
}
//# sourceMappingURL=index.js.map