import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from 'src/app/model/profile';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ProfileService } from '../../../service/profile.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {
  profile!:Profile;
  user!:User;
  constructor(private dialog:MatDialog,
              private authenticationService:AuthenticationService,
              private profileService:ProfileService) { }

  ngOnInit(): void {
  }
  async reloadData() {
    await this.profileService.loadData()
    this.profile = this.profileService.getProfile(this.authenticationService.getCurrentUser())
    this.user=this.authenticationService.getCurrentUser()
  }
  editProfile(){
    this.dialog.open(EditProfileComponent, {
      width: '600px',
      height: '700px'
    })
  }
}
