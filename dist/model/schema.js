"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("../utils/enum");
const schema = new mongoose_1.Schema({
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
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
schema.virtual("fullName").set(function () {
    return this.lastName + " " + this.lastName;
});
//# sourceMappingURL=schema.js.map