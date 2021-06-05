import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profile } from 'src/app/model/profile';
import { Suggestion } from 'src/app/model/suggestion';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-follow-details',
  templateUrl: './follow-details.component.html',
  styleUrls: ['./follow-details.component.css']
})
export class FollowDetailsComponent implements OnInit {
  loaded:boolean=false;
  suggestions:Suggestion[]=[]
  isFollowersList:boolean=false

  constructor(private profileService:ProfileService,
            @Inject(MAT_DIALOG_DATA) public data: any,
            private authenticationService:AuthenticationService) { 
             
            }

  ngOnInit() {
    this.data.dataKey.profiles.forEach((profile: Profile) => {
          this.suggestions.push({profile:profile,disabled:false})
        });
        this.isFollowersList=this.data.dataKey.followers
        this.loaded=true
  }
 
  async follow(user:User){
   this.profileService.follow(user).subscribe(data=>{});
   this.suggestions.forEach(value => {
    if(value.profile.user.id===user.id)
      value.disabled=false;
  });

  }
  async unfollow(user:User){
    this.profileService.unfollow(this.authenticationService.getCurrentUser(),user).subscribe(
      () => {this.suggestions.forEach(value => {
     if(value.profile.user.id===user.id)
       value.disabled=true;
   });
      }, err => {
        alert(err.message)
      });}
      async removeFollower(user:User){
        this.profileService.unfollow(user,this.authenticationService.getCurrentUser()).subscribe(
          () => {this.suggestions.forEach(value => {
         if(value.profile.user.id===user.id)
           value.disabled=true;
       });
          }, err => {
            alert(err.message)
          });
        }

}