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
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  posts!: Post[]
  newsfeedposts: NewsFeedPost[] = []
  personalPosts: NewsFeedPost[] = []
  user!: User

  public createPost(user: Post, image: File) {
    const formData: FormData = new FormData();
    formData.append('photo', image);
    formData.append('post', JSON.stringify(user));
    return this.restService.post("createPost", formData);
  }

  getAllPosts() {
    return this.posts;
  }

  getNewsFeedPosts(id: number) {
    return this.newsfeedposts;
  }

  getPersonalPosts() {
    return this.personalPosts;
  }

  likePost(postId: number) {
    return this.restService.post("like", { postId: postId, like: { user: this.authenticationService.getCurrentUser() } });
  }
  unlikePost(postId: number) {
    return this.restService.post("unlike", { postId: postId, like: { user: this.authenticationService.getCurrentUser() } });
  }
  getPostById(postId: number) {
    let post;
    this.posts.forEach(value => {
      if (postId === value.id)
        post = value
    })
    return post
  }

  checkIfPostIsLikedByCurrentUser(likes: Like[], userId: number) {
    let result = false;
    likes.forEach(value => {
      if (userId === value.user.id)
        result = true
    })
    return result
  }
  async loadData(user: User) {
    this.user = user
    this.newsfeedposts = []
    this.personalPosts = []

    await this.restService.get("http://localhost:8080/posts")
      .then(res => {
        this.posts = res as Post[]
      })
    await this.restService.get("http://localhost:8080/newsfeed/" + user.id)
      .then(res => {
        let posts = res as Post[]
        posts.forEach((post: Post) => {
          let isLiked = this.checkIfPostIsLikedByCurrentUser(post.likes, this.user.id)
          post.photo="data:image/jpeg;base64," + post.photo
          this.newsfeedposts.push({ post: Object.assign({}, post), liked: isLiked, numberOfLikes: post.likes.length, tags: post.tags })
        })
      })
    await this.restService.get("http://localhost:8080/personalPosts/" + user.id)
      .then(res => {
        let posts = res as Post[]
        posts.forEach((post: Post) => {
          let isLiked = this.checkIfPostIsLikedByCurrentUser(post.likes, this.user.id)
          post.photo="data:image/jpeg;base64," + post.photo
          this.personalPosts.push({ post: Object.assign({}, post), liked: isLiked, numberOfLikes: post.likes.length, tags: post.tags })
        })
      })
  }
  constructor(private restService: RestService, private authenticationService: AuthenticationService) {
  }

}
