import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { AuthenticationService } from './authentication.service';
import { User } from '../model/user';
import { Profile } from '../model/profile';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class FollowService {
   

    async loadData() {
        
    }
    constructor(private restService: RestService, private authenticationService:AuthenticationService
    ) {
    }

}