import { User } from "./user";

export interface Profile {
    id:number,
    displayName:string,
    description:string,
    user:User,
    photo:any
  }