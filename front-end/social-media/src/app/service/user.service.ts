import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { AuthenticationService } from './authentication.service';
import { User } from '../model/user';


@Injectable({
    providedIn: 'root'
})

export class UserService {
    users!: User[];

    getAllUsers() {
        return this.users
    }
   getByUsername(username:String){
       let userFound
       this.users.forEach(user => {
           if(user.username==username)
                userFound= user;
       });
       return userFound;
   }

    async loadData() {
        await this.restService.get("http://localhost:8080/users/")
            .then(result => {
                this.users = result as User[]
            })
    }
    constructor(private restService: RestService, 
                private authenticationService: AuthenticationService,
               ) {
    }

}
