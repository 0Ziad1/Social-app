import { ProjectionType, QueryOptions, RootFilterQuery } from "mongoose";
import { AbstractRepository } from "../../DB/abstract.repository";
import { IUser } from "../../utils/interface";
export declare class UserRepository extends AbstractRepository<IUser> {
    constructor();
    getAllUsers(filter: RootFilterQuery<IUser>, projection: ProjectionType<IUser>, options: QueryOptions<IUser>): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}
//# sourceMappingURL=user.repository.d.ts.map