import { sendEmail } from "../mailer";

export  function generateOtp  () {
    const otp =  Math.floor(Math.random()*90000+10000) 
      return otp
}

export function generateExpiryDate(time:number){
    return Date.now() + time as unknown as Date;
}