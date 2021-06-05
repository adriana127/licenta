import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, Message, Stomp, StompSubscription } from '@stomp/stompjs'
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
    
    subscribeToNotifications(topic: any, handler = WebSocketService.jsonHandler): Observable<any> {
        return this.connect().pipe(first(), switchMap(client => {
            return new Observable<any>(observer => {
                const subscription: StompSubscription = client.subscribe(topic, message => {
                    observer.next(handler(message));
                });
            });
        }));
    }

    static jsonHandler(message: Message): any {
        return JSON.parse(message.body);
    }



    disconnect() {
        if (this.stompClient != null) {
            this.stompClient.disconnect();
        }
    }
    constructor() {
        this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
        this.stompClient.connect({}, () => {
            this.state.next(SocketClientState.CONNECTED);
        });
    }

}
