import mongoose, { Schema } from "mongoose";
import { IUser } from "../../utils/common/interface";
declare const schema: mongoose.Schema<IUser, mongoose.Model<IUser, any, any, any, mongoose.Document<unknown, any, IUser, any, {}> & IUser & Required<{
    _id: Schema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IUser, mongoose.Document<unknown, {}, mongoose.FlatRecord<IUser>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<IUser> & Required<{
    _id: Schema.Types.ObjectId;
}> & {
    __v: number;
}>;
export default schema;
//# sourceMappingURL=user.schema.d.ts.map