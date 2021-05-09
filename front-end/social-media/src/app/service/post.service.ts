import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,of, of as observableOf, throwError } from 'rxjs'; // since RxJs 6
import {Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from '../model/post';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})

export class PostService {

public createPost(user:Post,image:File){

    const formData:FormData = new FormData();

   formData.append('photo', image);
   formData.append('post',JSON.stringify(user));
   console.log(image)
   return this.restService.post("createPost",formData);

  }
  constructor(private http: HttpClient,private restService:RestService) { }


}
