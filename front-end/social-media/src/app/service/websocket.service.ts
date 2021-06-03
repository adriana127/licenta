import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { AuthenticationService } from './authentication/authentication.service';
import { User } from '../model/user';
import { TokenService } from './authentication/token.service';

import * as SockJS from 'sockjs-client';
import { Client, CompatClient, Message, Stomp, StompSubscription } from '@stomp/stompjs'
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewsFeedPost } from '../model/newsfeedpost';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
export enum SocketClientState {
    ATTEMPTING, CONNECTED
  }
@Injectable({
    providedIn: 'root'
})

export class WebSocketService {
    URL = "http://localhost:8080/socket";
    webSocket = new SockJS(this.URL)
    stompClient = Stomp.over(this.webSocket);
    private state: BehaviorSubject<SocketClientState>;
    private connect(): Observable<Client> {
        return new Observable<Client>(observer => {
          this.state.pipe(filter(state => state === SocketClientState.CONNECTED)).subscribe(() => {
            observer.next(this.stompClient);
          });
        });
      }
    subscribeToNotifications(topic:any, handler = WebSocketService.jsonHandler): Observable<any>  {
        return this.connect().pipe(first(), switchMap(client => {
            return new Observable<any>(observer => {
                const subscription: StompSubscription = client.subscribe(topic, message => {
                    observer.next(handler(message));
                  });
                  return () => client.unsubscribe(subscription.id);
                });
              }));
    }
    onPlainMessage(topic: string): Observable<string> {
        return this.subscribeToNotifications(topic, WebSocketService.textHandler);
      }
    static jsonHandler(message: Message): any {
        return JSON.parse(message.body);
      }
      
      static textHandler(message: Message): string {
        return message.body;
      }
    //   send(topic: string, payload: any): void {
    //     this.connect()
    //       .pipe(first())
    //       .subscribe(client => client.send(topic, {}, JSON.stringify(payload)));
    //   }
    // subscribeToPosts(posts: NewsFeedPost[]) {
    //         this.stompClient.subscribe("/topic/socket/newsfeed/" + this.authenticationService.getCurrentUser().id,
    //             notification => {
    //                 let post = (JSON.parse(notification.body))
    //                 post.photo = "data:image/jpeg;base64," + post.photo
    //                 posts.push({ post: Object.assign({}, post), liked: false, numberOfLikes: post.likes.length, tags: post.tags })
    //                 return posts
    //             })
    // }

    // connect() {
    //     const socket = new SockJS('http://localhost:8080/gkz-stomp-endpoint');
    //     this.stompClient = Stomp.over(socket);
      
    //     const _this = this;
    //     this.stompClient.connect({},()=> {
    //       _this.stompClient.subscribe('/topic/hi', function (hello) {
    //         _this.showGreeting(JSON.parse(hello.body).greeting);
    //       });
    //     });
    //   }
      
disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }
    constructor(private authenticationService: AuthenticationService,
        private token: TokenService) {
            this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
            this.stompClient.connect({}, () => {
                this.state.next(SocketClientState.CONNECTED);
              });
    }

}
