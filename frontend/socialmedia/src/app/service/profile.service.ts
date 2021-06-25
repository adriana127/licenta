import { Injectable } from '@angular/core';
import { RestService } from './utils/rest.service';
import { AuthenticationService } from './authentication/authentication.service';
import { User } from '../model/user';
import { Profile } from '../model/profile';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    profile!: Profile
    user!: User;
    private currentProfileSubject!: BehaviorSubject<any>;
    rawPersonalProfile!:Profile

    async search(input:String){
        let suggestions;
        await this.restService.get("http://localhost:8080/search/" +input)
        .then(results=>{suggestions=results})
        return suggestions
    }
    async getProfile(user: User) {
        this.user = user;
        await this.restService.get("http://localhost:8080/profile/" + this.user.id)
            .then(result => {
                this.profile = result as Profile
            });
        return this.profile
    }
    async getProfiles() {
        return this.restService.get("http://localhost:8080/profiles/")

    }
    checkFollow(user: User) {
        return this.restService.post("checkFollow", { id: 0, follower: this.authenticationService.getCurrentUser(), followed: user });
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

    async getSuggestions() {
        let suggestions: Profile[] = []
        await this.restService.get("http://localhost:8080/suggestions/" + this.authenticationService.getCurrentUser().id)
            .then(result => {
                suggestions = result as Profile[]
            })
        return suggestions
    }

    async getFollowers(user: User) {
        let followers: Profile[] = []
        await this.restService.get("http://localhost:8080/followers/" + user.id)
            .then(result => {
                followers = result as Profile[]
            })
        return followers
    }

    async getFollwing(user: User) {
        let following: Profile[] = []
        await this.restService.get("http://localhost:8080/following/" + user.id)
            .then(result => {
                following = result as Profile[]
            })
        return following
    }

    follow(user: User) {
        return this.restService.post("follow", { id: 0, follower: this.authenticationService.getCurrentUser(), followed: user }).pipe(
            tap(data => {
                return data;
            })
        )
    }

    unfollow(follower: User, followed: User) {
        return this.restService.post("unfollow", { id: 0, follower: follower, followed: followed }).pipe(
            tap(data => {
                return data;
            })
        )
    }


    getPersonalProfile(): Profile {
        return this.currentProfileSubject.getValue();
      }

      setCurrentProfile(profile:Profile){
        localStorage.setItem('currentProfile', JSON.stringify(profile));
        this.currentProfileSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentProfile')!));
    }
    
    constructor(private restService: RestService,
                private authenticationService: AuthenticationService) {
        this.currentProfileSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentProfile')!));
    }
}
