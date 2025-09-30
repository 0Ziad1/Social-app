import {config} from "dotenv"
config();
export const devConfig={
PORT : process.env.PORT,
DB_URL : process.env.DB_URL as string,
EMAIL:process.env.EMAIL,
PASS:process.env.PASS,
SECRET_KEY : process.env.SECRET_Key,
}