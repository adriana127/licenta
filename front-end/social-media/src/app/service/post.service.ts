import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // since RxJs 6
import { first, map, tap } from 'rxjs/operators';
import { Post } from '../model/post';
import { RestService } from './utils/rest.service';
import { Like } from '../model/like';
import { NewsFeedPost } from '../model/newsfeedpost';
import { AuthenticationService } from './authentication/authentication.service';
import { User } from '../model/user';
import { WebSocketService } from './utils/websocket.service';
import { PostComment } from '../model/comment';
import { ChatMessage } from '../model/message';
import { ProfileService } from './profile.service';
import { Profile } from '../model/profile';

@Injectable({
  providedIn: 'root'
})
export class PostService {



  posts!: Post[]
  newsfeedposts: NewsFeedPost[] = []
  personalPosts: NewsFeedPost[] = []
  user!: User
  profiles!:Profile[]
  numberOfPosts=0
  selectedPost!:NewsFeedPost

  constructor(private restService: RestService,
    private profileService:ProfileService,
    private authenticationService: AuthenticationService,
    private socketClient: WebSocketService) {
     
 }

  public createPost(user: Post, image: File) {
    const formData: FormData = new FormData();
    formData.append('photo', image);
    formData.append('post', JSON.stringify(user));
    return this.restService.post("createPost", formData);
  }
  getSelectedPost(){
    return this.selectedPost;
  }
  setSelectedPost(post:NewsFeedPost){
    this.selectedPost=post;
  }
  updatePost(post: Post) { 
    post.photo=null
    return this.restService.post("updatePost", post);
  }
  setNumberOfPosts(length: number) {
    this.numberOfPosts=length;
  }
  getNumberOfPosts() {
   return this.numberOfPosts
  }
  getPersonalPosts(user:User) {
    this.user = user
    this.personalPosts = []
    return this.restService.get("http://localhost:8080/personalPosts/" + user.id)
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
  deleteComment(postId: number,comment:any) {
    return this.restService.post("deleteComment", { postId: postId, comment: {id:comment.id,message:comment.message.message, user: comment.user,createdOn:comment.createdOn } });
  }
  deletePost(post: Post) {
    console.log(post)
    return this.restService.post("deletePost", post)
  }
  getPostById(postId: number) {
    return this.restService.get("http://localhost:8080/post/" + postId)
  }

  checkIfPostIsLikedByCurrentUser(likes: Like[], userId: number) {
    let result = false;
    likes.forEach(value => {
      if (userId === value.user.id)
        result = true
    })
    return result
  }

  convertPostToNewsFeedPost(post:Post):NewsFeedPost{
    
    let isLiked = this.checkIfPostIsLikedByCurrentUser(post.likes, this.authenticationService.getCurrentUser().id)
    let profile=this.profiles.find(profile=>profile.user.id===post.user.id)
    return { post: Object.assign({}, post), liked: isLiked, numberOfLikes: post.likes.length, numberOfComments: post.comments.length,profile:profile!, tags: post.tags }
  }

  findAll(numberOfRequest:number) {
    return this.restService.get('http://localhost:8080/posts/newsfeed/'+this.authenticationService.getCurrentUser().id+"/"+numberOfRequest)
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

  static getPostListing(post: any): any {
    const postedAt = new Date(post['createdOn']);
    return {...post, postedAt};
  }

  async loadData() {
    this.profiles=[]
    await this.profileService.getProfiles()
    .then(data=>{
      this.profiles=data as Profile[]
    }).catch();
    console.log(this.profiles)
    
  }
}
