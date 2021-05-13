import { NumberInput } from "@angular/cdk/coercion";
import { Post } from "./post";

export interface NewsFeedPost {
    post:Post,
    liked:boolean,
    numberOfLikes:number
  }