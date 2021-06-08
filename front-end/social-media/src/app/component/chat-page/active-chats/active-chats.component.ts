import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chat } from 'src/app/model/chat';
import { Profile } from 'src/app/model/profile';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { ChatService } from 'src/app/service/chat.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-active-chats',
  templateUrl: './active-chats.component.html',
  styleUrls: ['./active-chats.component.css']
})
export class ActiveChatsComponent implements OnInit {
  searchControl = new FormControl();
  options:Profile[]=[]
  chats:Chat[]=[]
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  constructor(private profileService: ProfileService,
    private chatService:ChatService,) { 
  }

  ngOnInit(): void {
  }
  async createChat(profile:Profile){
    let currentProfile=Object.assign({}, this.profileService.getPersonalProfile());
    if(currentProfile.photo=="assets/resources/user.png")
    currentProfile.photo=null
    if(profile.photo=="assets/resources/user.png")
    profile.photo=null
    await 
    this.chatService.createChat({id:0,user1:currentProfile!,user2:profile})
    .subscribe((data)=>{
      console.log(data)
      this.open.emit(data)
    })
    this.searchControl.setValue(null)
  }
  async onSearchChange(){
    if(this.searchControl.value.length>0)
      await this.profileService.search(this.searchControl.value)
      .then(results=>{
        this.options=results as unknown as Profile[]
        this.options.forEach(profile=>{
          profile.photo=this.profileService.fixPhoto(profile)
        })
      })
    else this.options=[]
  }

}
