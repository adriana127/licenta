import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { NewsFeedPost } from 'src/app/model/newsfeedpost';
import { Post } from 'src/app/model/post';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from 'src/app/service/websocket.service';

import { CreatePostComponent } from '../create-post/create-post.component'
@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  constructor(private dialog: MatDialog,
     private postService: PostService,
     private authenticationService:AuthenticationService,
     private websocketService:WebSocketService) {
      this.posts=[]
    this.postService.findAll().pipe(map(posts => posts.sort(NewsFeedComponent.descendingByPostedAt)))
    .subscribe(posts => {
      posts.forEach(value=>{
      this.posts.push(this.postService.convertPostToNewsFeedPost(value))
      console.log(this.posts)

    })});
  }
  loaded:boolean=false;
  imageToShow: any = null;
  posts!: NewsFeedPost[]
  async ngOnInit(): Promise<void> {

    await this.reloadData()

  }
  static descendingByPostedAt(post1: Post, post2: Post): number {
    return new Date(post2.createdOn).getTime() - new Date(post1.createdOn).getTime();
  }
  async reloadData() {
    await this.postService.loadData(this.authenticationService.getCurrentUser())
  // this.posts=this.postService.getNewsFeedPosts()
    this.loaded=true
  }
  onCreate() {
    this.dialog.open(CreatePostComponent, {
      width: '600px',
      height: '700px'
    })
  }
  async onLike(event: NewsFeedPost) {
    this.like(event.post.id)
    this.postService.likePost(event.post.id).subscribe(async data=>{await this.reloadData()})
    
  }
  like(id:number){
    this.posts.forEach(value => {
      if (id === value.post.id)
        value.liked=true
    })
  }
  async onUnlike(event: NewsFeedPost) {
   // console.log(event)
    this.unlike(event.post.id)
    this.postService.unlikePost(event.post.id).subscribe(async (data: any)=>{
      console.log("unlike")
      await this.reloadData()})
    
  }
  unlike(id:number){
    this.posts.forEach(value => {
      if (id === value.post.id)
        value.liked=false
    })}
}

