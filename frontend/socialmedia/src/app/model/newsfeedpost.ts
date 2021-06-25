import { Post } from "./post";

export interface NewsFeedPost {
    post:Post,
    liked:boolean,
    numberOfLikes:number,
    numberOfComments:number,

    tags:any
  }