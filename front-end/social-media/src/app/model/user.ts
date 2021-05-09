import { Role } from "./role";
import { UserDetails } from "./userdetails";

export interface User {
    id:number,
    email:string,
    password:string,
    username:string,
    role:Role,
    followers:any,
    following:any
  }