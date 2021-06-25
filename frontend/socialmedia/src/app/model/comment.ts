import { User } from "./user";

export interface PostComment {
    id:number,
    user:User,
    message:String,
    createdOn:Date,

  }