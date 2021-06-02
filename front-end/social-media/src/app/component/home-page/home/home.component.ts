import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebSocketService } from 'src/app/service/websocket.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,private websocketService:WebSocketService
    ) { this.websocketService.subscribeToNotifications(this.snackBar) }

  ngOnInit(): void {
   
  }
  
  
}
