import nodemailer from "nodemailer"
import { devConfig } from "../../config/dev.env";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
export const sendEmail =async(mailOptions:MailOptions)=>{
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user:devConfig.EMAIL ,
      pass:devConfig.PASS,
    },
  });
  await transporter.sendMail(mailOptions);
}