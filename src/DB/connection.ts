import mongoose from "mongoose"
import { env } from "process";
import { devConfig } from "../config/dev.env";
export async function connectDB (){    
    console.log(devConfig.DB_URL);
    
    await mongoose.connect(devConfig.DB_URL).then(()=>{
        console.log("DB connected successfully");
    }).catch(()=>{
        console.log("failed to connect to DB");
    });
}