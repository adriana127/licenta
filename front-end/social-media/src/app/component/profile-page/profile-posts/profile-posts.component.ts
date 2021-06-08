import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NewsFeedPost } from 'src/app/model/newsfeedpost';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import { PostPopupComponent } from '../../post-page/post-popup/post-popup.component';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit {
  loaded:boolean=false;
  imageToShow: any = null;
  posts!: NewsFeedPost[]
  user!:User
  
  constructor(private postService: PostService,
    private dialog: MatDialog,
    public route: ActivatedRoute,
    private authenticationService:AuthenticationService,
    private userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
     if (this.route.snapshot.queryParamMap.get('username') == null)
      this.user = this.authenticationService.getCurrentUser()
    else
      await this.userService.getByUsername(this.route.snapshot.queryParamMap.get('username')!)
      .then(result=>{
        this.user=result as unknown as User;
      }).catch()
    await this.postService.loadData(this.user)
    this.posts = this.postService.getPersonalPosts()
    this.loaded=true;
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
}
