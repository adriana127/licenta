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

@Injectable({
  providedIn: 'root'
})
export class ChatService {

selectedChat!:Chat
  constructor(private restService: RestService,
    private authenticationService: AuthenticationService,
    private socketClient: WebSocketService) {
 }

  public createChat(chat:Chat) {
    return this.restService.post("createChat", chat);
  }
public setSelectedChat(chat:Chat){
    this.selectedChat=chat
}
public getSelectedChat(){
    return this.selectedChat
}
  
}
