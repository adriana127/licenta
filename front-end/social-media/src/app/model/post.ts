import { User } from "./user";

export interface Post {
    id:number,
    user:User,
    createdOn:Date,
    description:string,
    likes:any[],
    comments:any[],
    tags:any[],
    photo:any
  }