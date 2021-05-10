import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, of as observableOf, throwError } from 'rxjs'; // since RxJs 6
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from '../model/post';
import { RestService } from './rest.service';
import { Like } from '../model/like';
import { NewsFeedPost } from '../model/newsfeedpost';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  getResult: any;
  posts!: Post[]
  newsfeedposts: NewsFeedPost[] = []
  likes: Like[] = []
  public createPost(user: Post, image: File) {
    const formData: FormData = new FormData();
    formData.append('photo', image);
    formData.append('post', JSON.stringify(user));
    console.log(image)
    return this.restService.post("createPost", formData);
  }

  getPost(id: number) {
    return this.getResult;
  }
  getAllPosts() {
    return this.posts;
  }
  getNewsFeedPosts(id: number) {
console.log(this.newsfeedposts)
    return this.newsfeedposts;
  }
  getAllLikes() {
    return this.likes;
  }
   likePost(postId: number) {
     return  this.restService.post("like", { post: this.getPostById(postId), user: this.authenticationService.getCurrentUser() });
  }
  getNumberOfLikesPerPost(postId: number) {
    return this.likes.filter(like => { like.post.id === postId }).length
  }
  getPostById(postId: number) {
    let post;
    this.posts.forEach(value => {
      if (postId === value.id)
        post = value
    })
    return post
  }
  getLikeById(userId: number,postId:number) {
    let like;
    this.likes.forEach(value => {
      if (userId === value.user.id&&value.post.id===postId)
      like = value
    })
    return like
  }
  checkIfPostIsLikedByCurrentUser(postId: number, userId: number) {
    return this.likes.filter(like => { like.post.id === postId && like.user.id === userId }).length > 0
  }
  async loadData() {
    this.newsfeedposts = []
    await this.restService.get("http://localhost:8080/likes")
      .then(result => {
        this.likes = result as Like[]
      })
      console.log(this.likes)
    await this.restService.get("http://localhost:8080/posts")
      .then(res => {
        this.posts = res as Post[]
        
      })

      this.posts.forEach((value: any) => {
        let isLiked = this.getLikeById(this.authenticationService.getCurrentUser().id,value.id) != null
        this.newsfeedposts.push({ post: Object.assign({}, value), liked: isLiked })
      })
      this.newsfeedposts.forEach(value => {
        value.post.photo = "data:image/jpeg;base64," + value.post.photo
      })

  }
  constructor(private restService: RestService, private authenticationService: AuthenticationService) {
  }

}
