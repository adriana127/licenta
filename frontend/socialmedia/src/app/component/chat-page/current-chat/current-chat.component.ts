import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Chat } from 'src/app/model/chat';
import { ChatMessage } from 'src/app/model/message';
import { Profile } from 'src/app/model/profile';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { ChatService } from 'src/app/service/chat.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-current-chat',
  templateUrl: './current-chat.component.html',
  styleUrls: ['./current-chat.component.css']
})
export class CurrentChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  isChatSelected: boolean = false
  chatSelected!: Chat
  constructor(private chatService: ChatService,
    private authenticationService: AuthenticationService,
    private profileService: ProfileService) { }
  inputValue: string = ""
  requestNumber: number = 0
  messages: ChatMessage[] = []
  checkMessages: boolean = false
  ngOnInit(): void {
    this.scrollToBottom();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  static ascendingByPostedAt(message1: ChatMessage, message2: ChatMessage): number {
    return new Date(message1.createdOn).getTime() - new Date(message2.createdOn).getTime();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  isSentByCurrentUser(profile:Profile){
    return this.authenticationService.getCurrentUser().id==profile.user.id
  }
  onChatSelected(chat: Chat) {
    this.messages = []
    this.checkMessages = false
    this.chatSelected = chat
    this.isChatSelected = true
    this.chatService.getMessages(this.requestNumber, this.chatSelected)
      .pipe(map(messages => messages.sort(CurrentChatComponent.ascendingByPostedAt)))
      .subscribe(messages => {
        messages.forEach(value => {
          this.messages.push(value)
        })
        if (this.messages.length > 0)
          this.checkMessages = true
        this.scrollToBottom();
      });

    this.chatService
      .onMessageCreated()
      .subscribe((message: ChatMessage) => {
        this.messages.push(message)
        this.scrollToBottom();
      });
  }
  async createMessage() {
    let sender: Profile;
    await this.profileService.getProfile(this.authenticationService.getCurrentUser()).then(profile => {
      sender = profile;
    })
    this.chatService.sendMessage({ id: 0, message: this.inputValue, sender: sender!, chat: this.chatSelected, createdOn: new Date(), state: false })
      .subscribe(() => {
        this.inputValue="" 
      })
  }

  loadMoreMessages() {
    this.requestNumber += 1
    this.chatService.getMessages(this.requestNumber, this.chatSelected)
      .subscribe(messages => {
        messages.forEach(value => {
          this.messages.push(value)
        })
        this.messages = this.messages.sort(CurrentChatComponent.ascendingByPostedAt)
        if (this.messages.length > 0)
          this.checkMessages = true
        this.scrollToBottom();
      });

  }
}
