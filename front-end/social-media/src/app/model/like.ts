import { Post } from "./post";
import { User } from "./user";

export interface Like {
    id:number,
    user:User,
    post:Post
  }