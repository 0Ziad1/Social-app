import type {NextFunction, Request, Response, Express } from "express";
import authRouter from "./modules/auth/auth.controller"
import  { AppError } from "./utils/error/index"
import { connectDB } from "./DB/connection";
export  function bootstrap(app:Express,express:any) {
    app.use(express.json());
    app.use("/auth",authRouter);
    app.use((error:AppError,req:Request,res:Response,next:NextFunction)=>{
        if(!error){
            next();
        }
        res.status(error.statusCode).json({message : error.message,errorDetails:error.errorDetails})
    })
    app.use("/:dummy",(req:Request,res:Response,next:NextFunction)=>{
        res.status(404).json({message:"invalid url"})
    })
    connectDB();
} 