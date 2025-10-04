import type {NextFunction, Request, Response, Express } from "express";
import authRouter from "./modules/auth/auth.controller"
import  { AppError } from "./utils/error/index"
import { connectDB } from "./DB/connection";
import userRouter from "./modules/user/user.controller"
import postRouter from "./modules/post/post.controller"
import commentRouter from "./modules/comment/comment.controller"
export  function bootstrap(app:Express,express:any) {
    app.use(express.json());
    app.use("/auth",authRouter);
    app.use("/user",userRouter);
    app.use("/post",postRouter);
    app.use("/comment",commentRouter)
    app.use((error:AppError,req:Request,res:Response,next:NextFunction)=>{
        if(!error){
            next();
        }
        res.status(error.statusCode||500 ).json({message : error.message,errorDetails:error.errorDetails,stack:error.stack})
    })
    app.use("/:dummy",(req:Request,res:Response,next:NextFunction)=>{
        res.status(404).json({message:"invalid url"})
    })
    connectDB();
} 