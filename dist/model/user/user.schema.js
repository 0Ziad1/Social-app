"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
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
    twoStepVerfication: {
        type: Boolean,
        default: false,
        required: true,
    },
    blockedUsers: [{
            type: mongoose_1.default.Types.ObjectId,
        }]
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