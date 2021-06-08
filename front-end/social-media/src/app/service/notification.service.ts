import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // since RxJs 6
import { RestService } from './utils/rest.service';
import { AuthenticationService } from './authentication/authentication.service';
import { WebSocketService } from './utils/websocket.service';
import { INotification } from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
 
  findAll(numberOfRequests:number): Observable<INotification[]> {
    return this.socketClient
      .subscribeToNotifications('/topic/notifications/get/'+this.authenticationService.getCurrentUser().id+"/"+numberOfRequests)
      .pipe();
  }
  
  findNew(): Observable<INotification[]> {
    return this.socketClient
      .subscribeToNotifications('/topic/notifications/new/'+this.authenticationService.getCurrentUser().id)
      .pipe();
  }

  onNotification(): any{
    return this.socketClient.subscribeToNotifications('/topic/notification/created/'+this.authenticationService.getCurrentUser().id).pipe();
  }

  openNotifications(notifications:INotification[]) {
    return this.restService.post("openNotifications", notifications);
  }
  constructor(private restService: RestService,
     private authenticationService: AuthenticationService,
     private socketClient: WebSocketService) {
  }

}
