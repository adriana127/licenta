import { User } from "./user";

export interface UserDetails {
    id:number,
    displayName:string,
    description:string,
    user:User,
    photo:any
  }