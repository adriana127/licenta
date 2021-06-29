import { Post } from "./post";
import { Profile } from "./profile";

export interface NewsFeedPost {
    post:Post,
    liked:boolean,
    numberOfLikes:number,
    numberOfComments:number,
    profile:Profile,
    tags:any
  }