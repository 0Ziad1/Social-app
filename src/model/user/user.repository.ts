import { ProjectionType, QueryOptions, RootFilterQuery } from "mongoose";
import { AbstractRepository } from "../../DB/abstract.repository";
import { IUser } from "../../utils/interface";
import User from "./user.model";

export class UserRepository extends AbstractRepository<IUser>{
    constructor(){
        super(User)
    }
    async getAllUsers(filter:RootFilterQuery<IUser>,projection:ProjectionType<IUser>,options:QueryOptions<IUser>){
       return await User.find(filter,projection,options);
    }
} 