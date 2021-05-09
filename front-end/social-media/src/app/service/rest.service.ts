import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,of, of as observableOf, throwError } from 'rxjs'; // since RxJs 6
import {Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestService {

public post(  url:string,body:any): Observable<any> {
    return this.http.post("http://localhost:8080/" + url, body).pipe(
      catchError((x=> this.handleError(x)))
    );
  
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 401 || error.status === 403) {
      return of(error.message); 
  }
    return throwError(
      'Something bad happened; please try again later.');
  }
  constructor(private http: HttpClient) { }


}
