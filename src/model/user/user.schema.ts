import { Schema } from "mongoose";
import { IUser } from "../../utils/interface";
import { GENDER, SYS_ROLES, USER_AGENT } from "../../utils/enum";
const schema = new Schema<IUser>({
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
        enum: USER_AGENT,
        default: USER_AGENT.local,
        lowercase: true
    },
    password: {
        type: String,
        required: function () {
            if (this.userAgent == USER_AGENT.google) {
                return false;
            }
            return true;
        }
    },
    gender: {
        type: String,
        enum: GENDER,
        required: true,
        lowercase: true
    },
    phone: {
        type: String,
        length: 11
    },
    role: {
        type: String,
        enum: SYS_ROLES,
        default: SYS_ROLES.user
    },
    otp: {
        type: String,
    },
    otpExpiryDate: {
        type: Date,
        default: Date.now()
    },

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
schema.virtual("fullName").set(function () {
    return this.firstName + " " + this.lastName;
})
export default schema;