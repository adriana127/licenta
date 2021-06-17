import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Chat } from 'src/app/model/chat';
import { DisplayChat } from 'src/app/model/displaychat';
import { ChatMessage } from 'src/app/model/message';
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
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  searchControl = new FormControl();
  options: Profile[] = []
  chats: DisplayChat[] = []
  requestNumber: number = 0
  loaded: boolean = false
  inputValue: string = ""
  canLoadMoreChats: boolean = true
  
  constructor(private profileService: ProfileService,
    private chatService: ChatService,
    private authenticationService: AuthenticationService) {
  }

  async ngOnInit(): Promise<void> {
    this.chatService
      .onMessageCreated()
      .subscribe(async (message: ChatMessage) => {
        if (message!.sender.user.id == this.authenticationService.getCurrentUser().id)
          message!.state = true
        this.chats.find(chat => chat.chat.id === message.chat.id)!.message = message
        this.chats = this.chats.sort(ActiveChatsComponent.ascendingByLastMessage)
      });

    this.chatService.getChats(this.requestNumber, this.profileService.getPersonalProfile().id)
      .subscribe(chats => {
        chats.forEach(async value => {
          let message: ChatMessage
          await this.chatService.getLastMessage(value).then(data => {
            message = data as ChatMessage
          })
          if (message!.sender.user.id == this.authenticationService.getCurrentUser().id)
            message!.state = true
          this.chatService.convertChat(value)
          this.chats.push({ chat: value, message: message! })
          this.chats = this.chats.sort(ActiveChatsComponent.ascendingByLastMessage)
          this.canLoadMoreChats = this.chats.length % 5 == 0
        })
      });
    this.loaded = true
  }

  static ascendingByLastMessage(message1: DisplayChat, message2: DisplayChat): number {
    return new Date(message2.message.createdOn).getTime() - new Date(message1.message.createdOn).getTime();
  }
  loadMoreChats() {
    this.requestNumber += 1
    this.chatService.getChats(this.requestNumber, this.profileService.getPersonalProfile().id)
      .subscribe(chats => {
        chats.forEach(async value => {
          let message: ChatMessage
          await this.chatService.getLastMessage(value).then(data => {
            message = data as ChatMessage
          })
          if (message!.sender.user.id == this.authenticationService.getCurrentUser().id)
            message!.state = true
          this.chatService.convertChat(value)
          this.chats.push({ chat: value, message: message! })
          this.canLoadMoreChats = this.chats.length % 5 == 0
        })
      });
  }
  createChat(profile: Profile, message: ChatMessage | undefined) {
    this.inputValue = ""
    this.chatService.createChat({ id: 0, user1: this.profileService.getPersonalProfile(), user2: profile })
      .subscribe((data) => {
        this.openChat(data, message)
        this.chatService.checkChat(data).then(result => {
          if (!result && this.chats.filter(chat => chat.chat.id == data.id).length == 0)
            this.chats.push({ chat: data, message: { id: 0, message: "No messages.", sender: this.profileService.getPersonalProfile(), chat: Object.assign({}, data), createdOn: new Date(), state: true } })
          this.chatService.convertChat(data)
          this.chats = this.chats.sort(ActiveChatsComponent.ascendingByLastMessage)
        })
      })
    this.searchControl.setValue(null)
  }

  openChat(chat: Chat, message: ChatMessage | undefined) {
    this.open.emit(JSON.parse(JSON.stringify(chat)))
    if (message)
      if (message.sender.user.id != this.authenticationService.getCurrentUser().id)
        this.chatService.openChat(chat).then(() => {
          message.state = true
        }).catch(
        )
  }

  async onSearchChange() {
    if (this.searchControl.value.length > 0)
      await this.profileService.search(this.searchControl.value)
        .then(results => {
          this.options = results as unknown as Profile[]
          this.options.forEach(profile => {
          })
        })
    else this.options = []
  }

}
