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
import { INotification } from '../model/notification';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
 
  findAll(): Observable<INotification[]> {
    return this.socketClient
      .subscribeToNotifications('/topic/notifications/get/'+this.authenticationService.getCurrentUser().id)
      .pipe(first(), map(posts => posts.map(NotificationService.getPostListing)));
  }
  onNotification(): any{
    return this.socketClient.subscribeToNotifications('/topic/notification/created/'+this.authenticationService.getCurrentUser().id).pipe(map(post => NotificationService.getPostListing(post)));
  }
  static getPostListing(post: any): any {
    const postedAt = new Date(post['createdOn']);
    return {...post, postedAt};
  }
  constructor(private restService: RestService,
     private authenticationService: AuthenticationService,
     private socketClient: WebSocketService) {
  }

}
