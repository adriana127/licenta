import { Component, OnInit } from '@angular/core';
import  * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { TokenService } from 'src/app/service/token.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,
    private authenticationService:AuthenticationService,
    private token: TokenService) { this.subscribeToNotifications() }

  ngOnInit(): void {
   
  }
  
  subscribeToNotifications(){
    const URL="http://localhost:8080/socket";
    const webSocket=new SockJS(URL,{ headers: {Authorization: `Bearer ${this.token.getToken()}` }})
    const stompClient=Stomp.over(webSocket);
    var headers = {
      Authorization : 'Bearer ' + this.token.getToken()
     };
     console.log(headers)
     stompClient.connectHeaders=headers
    stompClient.connect({},()=>{
      stompClient.subscribe("/topic/socket/follow/"+this.authenticationService.getCurrentUser().id,
                            notification=>{
        let message=notification.body
        this.snackBar.open(message,'Close',{
        })
      })
    })
  }
}
