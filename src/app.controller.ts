import type {NextFunction, Request, Response, Express } from "express";
import authRouter from "./modules/auth/auth.controller"
import { connectDB } from "./DB/connection";
export  function bootstrap(app:Express,express:any) {
    app.use(express.json());
    app.use("/auth",authRouter);
    app.use((error:any,req:Request,res:Response,next:NextFunction)=>{
        if(!error){
            next();
        }
        res.status(error.statusCode).json({message : error.message})
    })
    connectDB();
} 