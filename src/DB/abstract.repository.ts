import { Model, MongooseBaseQueryOptions, MongooseUpdateQueryOptions, ProjectionType, QueryOptions, RootFilterQuery } from "mongoose";
export abstract class AbstractRepository<T> {
    constructor(protected model: Model<T>) { }
    async create(item:T){
       const document = await this.model.create(item);
       return await document.save();
    }
    async getOne(filter: RootFilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions) {
        return await this.model.findOne(filter, projection, options)
    }
    async exist(filter: RootFilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions) {
        return await this.model.findOne(filter, projection, options)
    }
    async updated(filter: RootFilterQuery<T>, item: Partial<T>, options?:any) {
        await this.model.updateOne(filter, item, options);
    }
    async delete(filter:RootFilterQuery<T>,options:MongooseBaseQueryOptions<T>){
        await this.model.deleteOne(filter,options);
    }
}