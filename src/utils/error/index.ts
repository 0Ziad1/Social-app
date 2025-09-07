class AppError extends Error{
    constructor(message :string ,public statusCode :number){
        super(message);
    }
}
export class ConflictError extends AppError{
    constructor(public message :string){
         super(message,409);
    }
}
export class AuthorityError extends AppError{
    constructor(public message :string){
         super(message,401);
    }
}
export class BadRequestError extends AppError{
    constructor(public message :string){
         super(message,400);
    }
}
export class NotFoundError extends AppError{
    constructor(public message :string){
         super(message,404);
    }
}