import bcrypt from "bcrypt"
export function hashing(password:string){
 return bcrypt.hashSync(password,10);
}

export function comparePassword(password:string,hashedPassword:string){
 return bcrypt.compareSync(password,hashedPassword)
}