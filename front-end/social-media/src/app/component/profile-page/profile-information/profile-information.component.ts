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

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {
  profile!: Profile;
  user!: User;
  profilePhoto!: string;
  loaded: boolean = false;
  postsNumber!: number;
  followersNumber!: number;
  followingNumber!: number;
  isPersonalProfile: boolean = false

  constructor(private dialog: MatDialog,
    public route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private profileService: ProfileService,
    private postService: PostService,
    private userService: UserService,
    private router: Router) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  async ngOnInit() {
    await this.reloadData()
  }
  async reloadData() {
    await this.profileService.loadData()
    await this.userService.loadData()

    if (this.route.snapshot.queryParamMap.get('username') == this.authenticationService.getCurrentUser().username) {
      this.user = this.authenticationService.getCurrentUser()
      this.isPersonalProfile = true;
    }
    else
      this.user = this.userService.getByUsername(this.route.snapshot.queryParamMap.get('username')!) as unknown as User

    await this.profileService.getProfile(this.user).then(data => {
      this.profile = data;
    }).catch(err => { console.log(err) })

    if (this.profile.photo === null)
      this.profilePhoto = "../../assets/resources/user.png";
    else
      this.profilePhoto = "data:image/jpeg;base64," + this.profile.photo;

    await this.profileService.getFollowers(this.user).then(data => {
      this.followersNumber = data.length;
    }).catch(err => { console.log(err) })

    await this.profileService.getFollwing(this.user).then(data => {
      this.followingNumber = data.length;
    }).catch(err => { console.log(err) })
    
    this.postsNumber = this.postService.getPersonalPosts().length
    this.loaded = true;
  }
  editProfile() {
    this.dialog.open(EditProfileComponent, {
      width: '600px',
      height: '700px'
    })
  }
  follow() {

    this.profileService.follow(this.user).subscribe(
      data => {
      }, err => {
        alert(err.message)
      });
  }
}
