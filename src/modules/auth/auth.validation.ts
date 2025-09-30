import {z} from "zod"
import { RegisterDTO } from "./auth.dto"
import { GENDER } from "../../utils/common/enum"
export const registerSchema = z.object<RegisterDTO>({
 firstName:z.string().min(3).max(20).trim() as unknown as string,
 lastName:z.string().min(3).max(20).trim() as unknown as string,
 phone:z.string().length(11) as unknown as string,
 email:z.email() as unknown as string,
 gender:z.enum(GENDER) as unknown as GENDER,
 password:z.string().min(6) as unknown as string
})