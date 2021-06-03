import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { RestService } from '../rest.service';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUser: Observable<User>
  private currentUserSubject!: BehaviorSubject<any>;
  check: boolean = false;

  constructor(
    private router: Router,
    private restRequestService: RestService,
    private tokenService: TokenService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getCurrentUser(): User {
    return this.currentUserSubject.getValue();
  }
  setCurrentUser(user:User){
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
  }

  login(body: any): Observable<any> {
    return this.restRequestService.post("auth", body).pipe(
      tap(data => {
        if (data.accessToken) {
          this.tokenService.setToken(data.accessToken);
         this.setCurrentUser(data.user);
          this.router.navigateByUrl("/home");
          return data;
        }
      })
    )
  }
  
  register(body: any): Observable<any> {
    return this.restRequestService.post("register", body).pipe(
      tap(data => {
        
      })
    )
  }
  
  isLogged(): boolean {
    return this.tokenService.getToken() != "";
  }

  logout() {
    this.tokenService.setToken("");
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}