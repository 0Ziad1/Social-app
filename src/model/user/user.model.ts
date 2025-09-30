import { model } from "mongoose";
import userSchema from "./user.schema"
import { IUser } from "../../utils/common/interface";
const User = model<IUser>("User",userSchema);
export default User;