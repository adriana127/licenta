import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profile';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loaded:boolean=false;
  user: User
  profile!: Profile
  profilePhoto!:String
  constructor(private authenticationService: AuthenticationService,
    private profileService: ProfileService) {
    this.user = authenticationService.getCurrentUser()

  }
  async ngOnInit() {
    await this.profileService.loadData()
    await this.profileService.getProfile(this.authenticationService.getCurrentUser()).then(data=>{
      this.profile=data;
    }).catch(err=>{console.log(err)})
    if(this.profile.photo!=null)
    this.profilePhoto="data:image/jpeg;base64," + this.profile.photo;
    else 
    this.profilePhoto="assets/resources/user.png";
    this.loaded=true;
  }
  logout(){
    this.authenticationService.logout()
  }

}
