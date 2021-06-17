import { User } from "./user";

export interface IStory {
    id:number,
    user:User,
    createdOn:Date,
    followers:any[],
    photo:any
  }