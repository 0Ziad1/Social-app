import nodemailer from "nodemailer"
export async function sendEmail( email:string, sub:string, html:string ) {
  const transporter = nodemailer.createTransport({
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