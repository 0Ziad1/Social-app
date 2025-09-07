"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = generateOtp;
exports.generateExpiryDate = generateExpiryDate;
function generateOtp() {
    const otp = Math.floor(Math.random() * 90000 + 10000);
    return otp;
}
function generateExpiryDate(time) {
    return Date.now() + time;
}
//# sourceMappingURL=index.js.map