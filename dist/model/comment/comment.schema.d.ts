import mongoose, { Schema } from "mongoose";
import { IComment } from "../../utils/common/interface";
declare const schema: mongoose.Schema<IComment, mongoose.Model<IComment, any, any, any, mongoose.Document<unknown, any, IComment, any, {}> & IComment & Required<{
    _id: Schema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IComment, mongoose.Document<unknown, {}, mongoose.FlatRecord<IComment>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<IComment> & Required<{
    _id: Schema.Types.ObjectId;
}> & {
    __v: number;
}>;
export default schema;
//# sourceMappingURL=comment.schema.d.ts.map