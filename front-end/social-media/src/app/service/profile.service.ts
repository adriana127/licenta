import { Injectable } from '@angular/core';
import { RestService } from './utils/rest.service';
import { AuthenticationService } from './authentication/authentication.service';
import { User } from '../model/user';
import { Profile } from '../model/profile';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    profile!: Profile
    user!: User;
    profiles!:Profile[]

    async getProfile(user:User) {
        this.user = user;
        await this.restService.get("http://localhost:8080/profile/" + this.user.id)
            .then(result => {
                this.profile = result as Profile
            })
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

    async getSuggestions() {
        let suggestions:Profile[]=[]
        await this.restService.get("http://localhost:8080/suggestions/" +this.authenticationService.getCurrentUser().id)
            .then(result=> {
                suggestions=result as Profile[]
            })
        suggestions.forEach(value=>{
                if(value.photo!=null)
                value.photo="data:image/jpeg;base64," + value.photo
                else 
                value.photo="assets/resources/user.png"
        })
        return suggestions
    }

    async getFollowers(user:User) {
        let followers:Profile[]=[]
        await this.restService.get("http://localhost:8080/followers/" +user.id)
            .then(result=> {
                followers=result as Profile[]
            })
            followers.forEach(value=>{
                if(value.photo!=null)
                value.photo="data:image/jpeg;base64," + value.photo
                else 
                value.photo="assets/resources/user.png"
        })
        return followers
    }

    async getFollwing(user:User) {
        let following:Profile[]=[]
        await this.restService.get("http://localhost:8080/following/" +user.id)
            .then(result=> {
                following=result as Profile[]
            })
            following.forEach(value=>{
                if(value.photo!=null)
                value.photo="data:image/jpeg;base64," + value.photo
                else 
                value.photo="assets/resources/user.png"
        })
        return following
    }

    follow(user:User){
        return this.restService.post("follow", {id:0,follower:this.authenticationService.getCurrentUser(),followed: user}).pipe(
            tap(data => {
                return data;
            })
        )
    }

    unfollow(user:User){
        return this.restService.post("unfollow", {id:0,follower:this.authenticationService.getCurrentUser(),followed: user}).pipe(
            tap(data => {
                return data;
            })
        )
    }

    async loadData() {
        this.profiles=[]
        
        await this.restService.get("http://localhost:8080/profiles")
            .then(res => {
                this.profiles = res as Profile[]
            })
            this.profiles.forEach(value=>{
                if(value.photo!=null)
                value.photo="data:image/jpeg;base64," + value.photo
                else 
                value.photo="assets/resources/user.png"
            })
    }

    constructor(private restService: RestService,
        private authenticationService:AuthenticationService) {}
}
