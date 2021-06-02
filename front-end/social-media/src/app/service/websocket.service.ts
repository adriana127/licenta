import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { AuthenticationService } from './authentication/authentication.service';
import { User } from '../model/user';
import { TokenService } from './authentication/token.service';

import  * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class WebSocketService {
    URL="http://localhost:8080/socket";
    webSocket=new SockJS(this.URL)
    stompClient=Stomp.over(this.webSocket);

    subscribeToNotifications(snackBar:any){
        this.stompClient.connect({},()=>{
            this.stompClient.subscribe("/topic/socket/follow/"+this.authenticationService.getCurrentUser().id,
                                notification=>{
            let message=notification.body
            snackBar.open(message,'Close',{
            })
          })
        })
      }
    constructor(private authenticationService:AuthenticationService,
                 private token: TokenService
               ) {
    }

}
