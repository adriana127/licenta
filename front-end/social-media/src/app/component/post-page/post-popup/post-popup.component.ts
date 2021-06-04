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
    private profileService: ProfileService,
    private authenticationService: AuthenticationService) {
    this.post = data.dataKey
    this.tags = this.post.tags

    this.comments=[]
    this.postService.getComments(this.post.post).pipe(map(comments => comments.sort(PostPopupComponent.descendingByPostedAt)))
    .subscribe(posts => {
      posts.forEach(async comment=>{
      await this.profileService.getProfile(comment.user).then(data=>{
        this.aux=data;
      }).catch(err=>{console.log(err)})
      if(this.aux.photo!=null)
      this.aux.photo="data:image/jpeg;base64," + this.aux.photo;
      else 
      this.aux.photo="assets/resources/user.png";
      this.comments.push({message:comment,profile:this.aux})
    })
  
  });
    this.postService
    .onPostComment(this.post.post)
    .subscribe(async (comment: PostComment) => {
      await this.profileService.getProfile(comment.user).then(data=>{
        this.aux=data;
      }).catch(err=>{console.log(err)})
      if(this.aux.photo!=null)
      this.aux.photo="data:image/jpeg;base64," + this.aux.photo;
      else 
      this.aux.photo="assets/resources/user.png";
      this.comments.push({message:comment,profile:this.aux})
      this.comments.sort(PostPopupComponent.descendingByPostedAt);
    });
  }
  static descendingByPostedAt(comment1: PostComment, comment2: PostComment): number {
    return new Date(comment2.createdOn).getTime() - new Date(comment1.createdOn).getTime();
  }
  
  async ngOnInit() {
    await this.postService.getPostById(this.post.post.id).then(result => {
      let post=result as Post
      let isLiked = this.postService.checkIfPostIsLikedByCurrentUser(post.likes, this.authenticationService.getCurrentUser().id)
      post.photo="data:image/jpeg;base64," + post.photo
      this.post={ post: Object.assign({}, post), liked: isLiked, numberOfLikes: post.likes.length, numberOfComments: post.comments.length, tags: post.tags }
    })
    await this.profileService.loadData()
    await this.profileService.getProfile(this.authenticationService.getCurrentUser()).then(data => {
      this.profile = data;
    }).catch(err => { console.log(err) })
    if (this.profile.photo != null)
      this.profile.photo = "data:image/jpeg;base64," + this.profile.photo;
    else
      this.profile.photo = "assets/resources/user.png";

    await this.profileService.getProfile(this.post.post.user).then(data => {
      this.creatorProfile = data;
    }).catch(err => { console.log(err) })
    if (this.creatorProfile.photo != null)
      this.creatorProfile.photo = "data:image/jpeg;base64," + this.creatorProfile.photo;
    else
      this.creatorProfile.photo = "assets/resources/user.png";

    this.loaded = true
  }
 
  async onLike(event: NewsFeedPost) {
    this.like(event.post.id)
    this.postService.likePost(event.post.id).subscribe(async data => { })

  }
  like(id: number) {

    this.post.liked = true
    this.post.numberOfLikes += 1

  }
  async onUnlike(event: NewsFeedPost) {
    this.unlike(event.post.id)
    this.postService.unlikePost(event.post.id).subscribe(async (data: any) => { })
  }
  unlike(id: number) {
    this.post.liked = false
    this.post.numberOfLikes -= 1
  }
  async createComment() {
    this.postService.commentPost(this.post.post.id, this.inputValue).subscribe(async (data: any) => { this.inputValue = "" })
  }
}
