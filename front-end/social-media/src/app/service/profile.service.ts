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

    getProfile() {
        return this.profile
    }
    updateProfile(profile: Profile, photo: any) {
        if (photo != undefined) {
            const formData: FormData = new FormData();
            formData.append('photo', photo);
            formData.append('profile', JSON.stringify(profile));

            return this.restService.post("updateProfile", formData).pipe(
                tap(data => {
                    return data;
                })
            )
        }
        else {
            return this.restService.post("updateProfile", profile).pipe(
                tap(data => {
                    return data;
                })
            )
        }
    }

    async loadData(user: User) {
        this.user = user;
        await this.restService.get("http://localhost:8080/profile/" + this.user.id)
            .then(result => {
                this.profile = result as Profile
            })
    }
    constructor(private restService: RestService
    ) {
    }

}
