import { Role } from "./role";

export interface User {
    id:number,
    email:string,
    password:string,
    username:string,
    roles:Role[],
    posts:any
    followers:any,
    following:any
  }