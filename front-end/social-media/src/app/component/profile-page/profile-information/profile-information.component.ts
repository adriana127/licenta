import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from 'src/app/model/profile';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { PostService } from 'src/app/service/post.service';
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
  postsNumber!:number;
  followersNumber!:number;
  followingNumber!:number;

  constructor(private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private profileService: ProfileService,
    private postService:PostService) { }

  async ngOnInit() {
    await this.reloadData()
  }
  async reloadData() {
    await this.profileService.loadData(this.authenticationService.getCurrentUser())
    this.user = this.authenticationService.getCurrentUser()
    this.profile = this.profileService.getProfile()
    if (this.profile.photo === null)
    this.profilePhoto="../../assets/resources/user.png";
    else
      this.profilePhoto = "data:image/jpeg;base64," + this.profile.photo;
    this.postsNumber=this.postService.getPersonalPosts().length
    this.followersNumber=this.authenticationService.getCurrentUser().followers.length
    this.followingNumber=this.authenticationService.getCurrentUser().following.length

    this.loaded = true;
  }
  editProfile() {
    this.dialog.open(EditProfileComponent, {
      width: '600px',
      height: '700px'
    })
  }
}
