import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profile';
import { User } from 'src/app/model/user';
import { FollowService } from 'src/app/service/follow.service';
import { ProfileService } from 'src/app/service/profile.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {
  loaded:boolean=false;
  suggestions:Profile[]=[]
  constructor(private profileService:ProfileService) { }

  async ngOnInit() {
    await this.reloadData()
  }
  async reloadData(){
    await this.profileService.loadData()
    await this.profileService.getSuggestions().then(data => {
      this.suggestions = data;
    }).catch(err => { console.log(err) })
    this.loaded=true
  }
  follow(user:User){
   this.profileService.follow(user).subscribe(data=>{});
   this.delay(5000)
   this.suggestions.filter(va=>va.user!=user)
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}
