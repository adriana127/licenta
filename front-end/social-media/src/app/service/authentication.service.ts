import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,of, of as observableOf, throwError } from 'rxjs'; // since RxJs 6
import {Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from '../model/post';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

 login(body : any) : Observable<any> {
    return this.restService.post("login", body).pipe(
      tap(data => {
        alert(data.message)
      })
    )
  }
  register(body : any) : Observable<any> {
    return this.restService.post("register", body).pipe(
      tap(data => {
        alert(data.message)
      })
    )
  }
  constructor(private http: HttpClient,private restService:RestService) { }


}
