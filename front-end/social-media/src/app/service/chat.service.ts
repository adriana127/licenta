import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // since RxJs 6
import { first, map } from 'rxjs/operators';
import { Post } from '../model/post';
import { RestService } from './utils/rest.service';
import { Like } from '../model/like';
import { NewsFeedPost } from '../model/newsfeedpost';
import { AuthenticationService } from './authentication/authentication.service';
import { User } from '../model/user';
import { WebSocketService } from './utils/websocket.service';
import { PostComment } from '../model/comment';
import { Chat } from '../model/chat';
import { ProfileService } from './profile.service';
import { ChatMessage } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  selectedChat!: Chat
  constructor(private restService: RestService,
    private authenticationService: AuthenticationService,
    private socketClient: WebSocketService,
    private profileService: ProfileService) {
  }

  onMessageCreated(): any {
    return this.socketClient.subscribeToNotifications('/topic/chatMessages/created/' + this.authenticationService.getCurrentUser().id).pipe();
  }

  sendMessage(message: ChatMessage) {
    return this.restService.post("createChatMessage", message);
  }

  convertChat(chat: Chat) {
    if (chat.user1.user.id != this.authenticationService.getCurrentUser().id) {
      let user = Object.assign({}, chat.user1)
      chat.user1 = chat.user2
      chat.user2 = user
    }
    chat.user2.photo = this.profileService.fixPhoto(chat.user2)
  }

  convertMessage(message: ChatMessage) {
    message.sender.photo = this.profileService.fixPhoto(message.sender)
  }

  getMessages(numberOfRequest: number, chat: Chat): Observable<ChatMessage[]> {
    return this.socketClient
      .subscribeToNotifications('/topic/chatMessages/get/' + chat.id + "/" + numberOfRequest);
  }

  getChats(numberOfRequest: number,profileId:number): Observable<Chat[]> {
    return this.socketClient
      .subscribeToNotifications('/topic/chat/' +profileId+ "/" + numberOfRequest);
  }

  getLastMessage(chat:Chat){
    console.log(chat.id)
    return this.restService.get("http://localhost:8080/chat/getLastMessage/" + chat.id)
  }

  public createChat(chat: Chat) {
    return this.restService.post("createChat", chat);
  }

  public updateChat(chat: Chat) {
    return this.restService.post("updateChat", chat);
  }

  public setSelectedChat(chat: Chat) {
    this.selectedChat = chat
  }

  public getSelectedChat() {
    return this.selectedChat
  }

}
