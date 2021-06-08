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

    fixPhoto(profile: Profile) {
        if (profile.photo != null)
            profile.photo = "data:image/jpeg;base64," + profile.photo
        else
            profile.photo = "assets/resources/user.png"
        return profile.photo
    }
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
        this.profile.photo=this.fixPhoto(this.profile)
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
        suggestions.forEach(value => {
            if (value.photo != null)
                value.photo = "data:image/jpeg;base64," + value.photo
            else
                value.photo = "assets/resources/user.png"
        })
        return suggestions
    }

    async getFollowers(user: User) {
        let followers: Profile[] = []
        await this.restService.get("http://localhost:8080/followers/" + user.id)
            .then(result => {
                followers = result as Profile[]
            })
        followers.forEach(value => {
            if (value.photo != null)
                value.photo = "data:image/jpeg;base64," + value.photo
            else
                value.photo = "assets/resources/user.png"
        })
        return followers
    }

    async getFollwing(user: User) {
        let following: Profile[] = []
        await this.restService.get("http://localhost:8080/following/" + user.id)
            .then(result => {
                following = result as Profile[]
            })
        following.forEach(value => {
            if (value.photo != null)
                value.photo = "data:image/jpeg;base64," + value.photo
            else
                value.photo = "assets/resources/user.png"
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
