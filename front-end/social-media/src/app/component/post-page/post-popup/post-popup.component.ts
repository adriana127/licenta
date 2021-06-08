import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profile';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { NewsFeedPost } from 'src/app/model/newsfeedpost';
import { User } from 'src/app/model/user';
import { PostService } from 'src/app/service/post.service';
import { ProfileService } from 'src/app/service/profile.service';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { map } from 'rxjs/operators';
import { PostComment } from 'src/app/model/comment';
import { Post } from 'src/app/model/post';
@Component({
  selector: 'app-post-popup',
  templateUrl: './post-popup.component.html',
  styleUrls: ['./post-popup.component.css']
})
export class PostPopupComponent implements OnInit {
  inputValue: String = ""
  tags: User[]
  profile!: Profile;
  creatorProfile!: Profile
  post: NewsFeedPost
  loaded: boolean = false
  comments:any[]
  aux:any
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostService,
    private profileService: ProfileService) {
    this.post = data.dataKey
    this.tags = this.post.tags

    this.comments=[]
    this.postService.getComments(this.post.post).pipe(map(comments => comments.sort(PostPopupComponent.descendingByPostedAt)))
    .subscribe(posts => {
      posts.forEach(async comment=>{
      await this.profileService.getProfile(comment.user).then(data=>{
        this.aux=data;
      }).catch(err=>{console.log(err)})
      this.comments.push({message:comment,profile:this.aux})
    })
  
  });
    this.postService
    .onPostComment(this.post.post)
    .subscribe(async (comment: PostComment) => {
      await this.profileService.getProfile(comment.user).then(data=>{
        this.aux=data;
      }).catch(err=>{console.log(err)})
      this.comments.push({message:comment,profile:this.aux})
      this.comments.sort(PostPopupComponent.descendingByPostedAt);
      this.post.numberOfComments+=1;
    });
  }
  static descendingByPostedAt(comment1: PostComment, comment2: PostComment): number {
    return new Date(comment2.createdOn).getTime() - new Date(comment1.createdOn).getTime();
  }
  
  async ngOnInit() {
    this.profile = this.profileService.getPersonalProfile();

    await this.profileService.getProfile(this.post.post.user)
        .then(data => {
          this.creatorProfile = data;
        }).catch(err => { 
          console.log(err) })
          
    await this.postService.getPostById(this.post.post.id)
    .then(result => {
      this.post=this.postService.convertPostToNewsFeedPost(result as Post)
    })

    this.loaded = true
  }
 
  onLike(event: NewsFeedPost) {
    this.postService.likePost(event.post.id)
    .subscribe(() => {
      event.liked = true
      event.numberOfLikes += 1
     })
  }
 
  onUnlike(event: NewsFeedPost) {
    this.postService.unlikePost(event.post.id)
    .subscribe(() => {
      event.liked = false
      event.numberOfLikes -= 1
     })
  }

  createComment() {
    this.postService.commentPost(this.post.post.id, this.inputValue)
    .subscribe(() => { 
      this.inputValue = "" 
    })
  }
}
