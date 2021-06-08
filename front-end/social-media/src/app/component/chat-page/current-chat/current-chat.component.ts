import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/model/chat';

@Component({
  selector: 'app-current-chat',
  templateUrl: './current-chat.component.html',
  styleUrls: ['./current-chat.component.css']
})
export class CurrentChatComponent implements OnInit {
  isChatSelected:boolean=false
  constructor() { }

  ngOnInit(): void {
  }
  onChatSelected(chat:any){
    console.log(chat)
    this.isChatSelected=true
  }
}
