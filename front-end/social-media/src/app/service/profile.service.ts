import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { AuthenticationService } from './authentication.service';
import { User } from '../model/user';
import { Profile } from '../model/profile';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    profile!: Profile
    user!: User;

    getProfile(user: User) {
        this.user = user;
        return this.profile
    }
    updateProfile(body:any) {
        return this.restService.post("updateProfile", body).pipe(
            tap(data => {
                    return data;
            })
        )
    }

    async loadData() {
        await this.restService.get("http://localhost:8080/profile/" + this.user.id)
            .then(result => {
                this.profile = result as Profile
            })
    }
    constructor(private restService: RestService, 
                private authenticationService: AuthenticationService,
               ) {
    }

}
