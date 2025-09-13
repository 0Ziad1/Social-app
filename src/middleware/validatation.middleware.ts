import type { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { BadRequestError } from "../utils/error";

export  const isValid = (schema:ZodType)=>{
    return(req:Request,res:Response,next:NextFunction)=>{
        let data = {...req.body,...req.params,...req.query};
        const result = schema.safeParse(data);
        if(result.success==false){
        const errorMessage = result.error.issues.map((issue)=>({
            path:issue.path[0],
            message:issue.message }))
            throw new BadRequestError("Validation error",errorMessage)
        }
        next();
    }}