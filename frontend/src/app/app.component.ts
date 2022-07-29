import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import User from 'src/app/interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'frontend';
  constructor(private _loginService: LoginService) {}

  ngOnInit(): void {}

  // expose LoginServices user object for use in template
  get userInfo(): User {
    return this._loginService.user;
  }

  // call LoginService's logout function
  logout() {
    this._loginService.logout();
  }
}
