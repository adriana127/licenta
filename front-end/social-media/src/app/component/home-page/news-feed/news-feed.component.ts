import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NewsFeedPost } from 'src/app/model/newsfeedpost';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';

import { CreatePostComponent } from '../create-post/create-post.component'
@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  constructor(private dialog: MatDialog, private postService: PostService) {
  }
  loaded:boolean=false;
  imageToShow: any = null;
  posts!: NewsFeedPost[]
  async ngOnInit(): Promise<void> {
    await this.reloadData()
  }
  async reloadData() {
    await this.postService.loadData()
    this.posts = this.postService.getNewsFeedPosts(10)
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

