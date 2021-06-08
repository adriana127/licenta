import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenService {
  public currentToken: Observable<string>
  private currentTokenSubject!: BehaviorSubject<any>;

  constructor() {
    this.currentTokenSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('accessToken')!));
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  getToken(): string {
    return this.currentTokenSubject.value;
  }

  setToken(newToken: string) {
    localStorage.setItem('accessToken', JSON.stringify(newToken));
    this.currentTokenSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('accessToken')!));
    this.currentToken = this.currentTokenSubject.asObservable();
  }
}