import { Model, MongooseBaseQueryOptions, ProjectionType, QueryOptions, RootFilterQuery } from "mongoose";
export declare abstract class AbstractRepository<T> {
    protected model: Model<T>;
    constructor(model: Model<T>);
    create(item: T): Promise<(import("mongoose").Document<unknown, {}, T, {}, {}> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | (import("mongoose").Document<unknown, {}, T, {}, {}> & {
        _id?: unknown;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    getOne(filter: RootFilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions): Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, {}> & (import("mongoose").Require_id<T> extends infer T_1 ? T_1 extends import("mongoose").Require_id<T> ? T_1 extends {
        __v?: infer U;
    } ? T_1 : T_1 & {
        __v: number;
    } : never : never)> | null>;
    exist(filter: RootFilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions): Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, {}> & (import("mongoose").Require_id<T> extends infer T_1 ? T_1 extends import("mongoose").Require_id<T> ? T_1 extends {
        __v?: infer U;
    } ? T_1 : T_1 & {
        __v: number;
    } : never : never)> | null>;
    updated(filter: RootFilterQuery<T>, item: Partial<T>, options?: any): Promise<void>;
    delete(filter: RootFilterQuery<T>, options: MongooseBaseQueryOptions<T>): Promise<void>;
}
//# sourceMappingURL=abstract.repository.d.ts.map