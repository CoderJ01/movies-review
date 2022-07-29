import { Injectable } from '@angular/core';
import User from 'src/app/interfaces/user'
import { Subject } from 'rxjs';

// mark our Login service class as available for dependency injection with @Injectable annotation 

@Injectable()
export class LoginService {
    user: User = {
        name: '', // contains name of the current user
        id: ''    // contains id of the current user
    }

    // emit logged-in user's info
    // change navigation bar from 'login' to 'logout'
    userChange: Subject<User> = new Subject<User>();

    // update user object upon login or logout
    constructor() {
        this.userChange.subscribe((value) => {
            this.user = value;
        })
    }

    // take username and id credentials
    login(name= '', id='') {
        this.userChange.next({ name: name, id: id});
    }

    // set name and id to empty strings
    logout() {
        this.userChange.next({ name: '', id: ''});
    }
}