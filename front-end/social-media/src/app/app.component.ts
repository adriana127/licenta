import { Component, OnInit } from '@angular/core';
import { ProfileService } from './service/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private profileService:ProfileService){

  }
   ngOnInit() {
    this.profileService.getPersonalProfile().photo=this.profileService.fixPhoto(this.profileService.getPersonalProfile())
  }
  title = 'social-media';
}
