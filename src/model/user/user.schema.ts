import { Schema } from "mongoose";
import { IUser } from "../../utils/common/interface";
import { GENDER, SYS_ROLES, USER_AGENT } from "../../utils/common/enum";
import { devConfig } from "../../config/dev.env";
import { sendEmail } from "../../utils/mailer";
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
schema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
})
schema.pre("save",{document:true,query:false} ,async function () {
  if (this.isNew == true  && this.userAgent != USER_AGENT.google) {
    await sendEmail({
      from: `'social-app' <${devConfig.EMAIL}>`,
      to: this.email as string,
      subject: "Verify your account",
      html: `<h1>Your OTP is ${this.otp}</h1>`,
    });
  }
})
export default schema;