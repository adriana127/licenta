import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs'; // since RxJs 6
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  public post(url: string, body: any): Observable<any> {
    console.log(body)
    return this.http.post("http://localhost:8080/" + url, body).pipe(
      catchError((x => this.handleError(x)))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401 || error.status === 403) {
      return of(error.message);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  public get(url: string) {
    return this.http.get(url).toPromise();
  }
  constructor(private http: HttpClient) { }
}
