import { model } from "mongoose";
import userSchema from "./user.schema"
import { IUser } from "../../utils/interface";
const User = model<IUser>("user",userSchema);
export default User;