import { Injectable } from '@angular/core';
import { RestService } from './utils/rest.service';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    users!: User[];

    async getByUsername(username: String) {
        let user;
        await this.restService.get("http://localhost:8080/user/" + username)
            .then(result => {
                user = result as User
            });
        return user
    }
    constructor(private restService: RestService) {
    }

}
