"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("../../utils/common/enum");
const dev_env_1 = require("../../config/dev.env");
const mailer_1 = require("../../utils/mailer");
const schema = new mongoose_1.Schema({
    isVerified: {
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 50,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 50,
        trim: true
    },
    credentialsUpdatedAt: {
        type: Date,
        default: Date.now()
    },
    email: {
        type: String,
        unique: true,
    },
    userAgent: {
        type: String,
        enum: enum_1.USER_AGENT,
        default: enum_1.USER_AGENT.local,
        lowercase: true
    },
    password: {
        type: String,
        required: function () {
            if (this.userAgent == enum_1.USER_AGENT.google) {
                return false;
            }
            return true;
        }
    },
    gender: {
        type: String,
        enum: enum_1.GENDER,
        required: true,
        lowercase: true
    },
    phone: {
        type: String,
        length: 11
    },
    role: {
        type: String,
        enum: enum_1.SYS_ROLES,
        default: enum_1.SYS_ROLES.user
    },
    otp: {
        type: String,
    },
    otpExpiryDate: {
        type: Date,
        default: Date.now()
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
schema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
});
schema.pre("save", { document: true, query: false }, async function () {
    if (this.isNew == true && this.userAgent != enum_1.USER_AGENT.google) {
        await (0, mailer_1.sendEmail)({
            from: `'social-app' <${dev_env_1.devConfig.EMAIL}>`,
            to: this.email,
            subject: "Verify your account",
            html: `<h1>Your OTP is ${this.otp}</h1>`,
        });
    }
});
exports.default = schema;
//# sourceMappingURL=user.schema.js.map