import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/model/profile';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import { ProfileService } from '../../../service/profile.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { FollowDetailsComponent } from '../follow-details/follow-details.component';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {
  profile!: Profile;
  loaded: boolean = false;
  postsNumber!: number;
  followers!:Profile[]
  following!:Profile[]
  isPersonalProfile: boolean = false
  followed:boolean=false;

  constructor(private dialog: MatDialog,
    public route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private profileService: ProfileService,
    public postService: PostService,
    private userService: UserService,
    private router: Router) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  async ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('username') == this.authenticationService.getCurrentUser().username) {
        this.profile = this.profileService.getPersonalProfile();
        this.isPersonalProfile = true;
    }
    else
      await this.userService.getByUsername(this.route.snapshot.queryParamMap.get('username')!)
      .then(async result=>{
        await this.profileService.getProfile(result as unknown as User).then(profile=>{this.profile=profile});
          this.profileService.checkFollow(result as unknown as User).subscribe(data=>{
            if(data)
              this.followed=true
            })
        }).catch()

    await this.profileService.getFollowers(this.profile.user)
    .then(data => {
      this.followers=data
    }).catch(err => { console.log(err) })

    await this.profileService.getFollwing(this.profile.user)
    .then(data => {
      this.following=data
    }).catch(err => { console.log(err) })
    this.loaded = true;
  }

  editProfile() {
    this.dialog.open(EditProfileComponent, {
      width: '600px',
      height: '700px'
    })
  }

  followDetails(value:boolean) {
    let details
    if(value)
      details={profiles:this.followers,followers:true}
    else
      details={profiles:this.following,followers:false}
    this.dialog.open(FollowDetailsComponent,{
      width: '600px',
      height: '700px',
      data: {dataKey: details}
    })
  }

  follow() {
    this.profileService.follow(this.profile.user)
    .subscribe(() => {
        this.followed=true;
      }, err => {
        alert(err.message)
      });
  }

  unfollow() {
    this.profileService.unfollow(this.authenticationService.getCurrentUser(),this.profile.user)
    .subscribe(() => {
        this.followed=false;
      }, err => {
        alert(err.message)
      });
  }
}
