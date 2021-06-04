import { Post } from "./post";
import { User } from "./user";

export interface INotification {
    id:number,
    isNew:boolean,
message:String,
createdOn:Date

    sender:User,
    receiver:User,
    post:Post,
  }