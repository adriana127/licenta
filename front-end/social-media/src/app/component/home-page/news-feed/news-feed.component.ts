import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { NewsFeedPost } from 'src/app/model/newsfeedpost';
import { Post } from 'src/app/model/post';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { PostService } from 'src/app/service/post.service';
import { WebSocketService } from 'src/app/service/utils/websocket.service';
import { PostPopupComponent } from '../../post-page/post-popup/post-popup.component';

import { CreatePostComponent } from '../create-post/create-post.component'
@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent {
  loaded:boolean=false;
  imageToShow: any = null;
  posts: NewsFeedPost[]=[]

  constructor(private dialog: MatDialog,
              private postService: PostService){
     this.postService.findAll()
    .pipe(map(posts => posts.sort(NewsFeedComponent.descendingByPostedAt)))
    .subscribe(posts => {
      posts.forEach(value=>{
      this.posts.push(this.postService.convertPostToNewsFeedPost(value))})
      this.loaded=true
    });

    this.postService
    .onPost()
    .subscribe((post: Post) => {
      this.posts.push(this.postService.convertPostToNewsFeedPost(post));
      this.posts.sort(NewsFeedComponent.descendingByNewsAt);
    });
  }

  static descendingByPostedAt(post1: Post, post2: Post): number {
    return new Date(post2.createdOn).getTime() - new Date(post1.createdOn).getTime();
  }
  static descendingByNewsAt(post1: NewsFeedPost, post2: NewsFeedPost): number {
    return new Date(post2.post.createdOn).getTime() - new Date(post1.post.createdOn).getTime();
  }

  createPost() {
    this.dialog.open(CreatePostComponent, {
      width: '600px',
      height: '700px'
    })
  }
  popupPost(post:NewsFeedPost) {
    this.dialog.open(PostPopupComponent, {
      width: '900px',
      height: '780px',
      data: {
        dataKey: post
      }
    })
  }
  async onLike(event: NewsFeedPost) {
    this.postService.likePost(event.post.id)
    .subscribe(()=>{
      event.liked=true
      event.numberOfLikes+=1
    })
  }

  async onUnlike(event: NewsFeedPost) {
    this.postService.unlikePost(event.post.id)
    .subscribe(()=>{
      event.liked=false
      event.numberOfLikes-=1
    })
  }
}

