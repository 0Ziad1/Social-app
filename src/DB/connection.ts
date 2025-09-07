import mongoose from "mongoose"
export async function connectDB (){
    await mongoose.connect("mongodb://127.0.0.1:27017/social-app").then(()=>{
        console.log("DB connected successfully");
    }).catch(()=>{
        console.log("failed to connect to DB");
    });
}