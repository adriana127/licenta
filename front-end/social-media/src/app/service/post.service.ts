import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // since RxJs 6
import { first, map } from 'rxjs/operators';
import { Post } from '../model/post';
import { RestService } from './utils/rest.service';
import { Like } from '../model/like';
import { NewsFeedPost } from '../model/newsfeedpost';
import { AuthenticationService } from './authentication/authentication.service';
import { User } from '../model/user';
import { WebSocketService } from './utils/websocket.service';
import { PostComment } from '../model/comment';

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

  getNewsFeedPosts() {
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

  commentPost(postId: number,message:String) {
    return this.restService.post("addComment", { postId: postId, comment: { user: this.authenticationService.getCurrentUser(),message:message,createdOn:new Date() } });
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
  findAll(): Observable<Post[]> {
    return this.socketClient
      .subscribeToNotifications('/topic/posts/newsfeed/'+this.authenticationService.getCurrentUser().id)
      .pipe(first(), map(posts => posts.map(PostService.getPostListing)));
  }
  onPost(): any{
    return this.socketClient.subscribeToNotifications('/topic/posts/created/'+this.authenticationService.getCurrentUser().id).pipe(map(post => PostService.getPostListing(post)));
  }

  getComments(post:Post): Observable<PostComment[]> {
    return this.socketClient
      .subscribeToNotifications('/topic/comments/get/'+post.id)
      .pipe(first(), map(posts => posts.map(PostService.getPostListing)));
  }
  onPostComment(post:Post): any{
    return this.socketClient.subscribeToNotifications('/topic/comments/created/'+post.id).pipe(map(post => PostService.getPostListing(post)));
  }

  convertPostToNewsFeedPost(post:Post):NewsFeedPost{
    let isLiked = this.checkIfPostIsLikedByCurrentUser(post.likes, this.authenticationService.getCurrentUser().id)
    post.photo="data:image/jpeg;base64," + post.photo
    return { post: Object.assign({}, post), liked: isLiked, numberOfLikes: post.likes.length, tags: post.tags }
  }
  static getPostListing(post: any): any {
    const postedAt = new Date(post['createdOn']);
    return {...post, postedAt};
  }
  async loadData(user: User) {
    this.user = user
    this.newsfeedposts = []
    this.personalPosts = []

     
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
  constructor(private restService: RestService,
     private authenticationService: AuthenticationService,
     private socketClient: WebSocketService) {
  }

}
