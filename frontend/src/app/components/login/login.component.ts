import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // FormGroup provides login form
  // set initial values of name and id as empty strings
  form = new FormGroup({
    name: new FormControl(''),
    id: new FormControl('')
  });

  constructor(private _loginService: LoginService, private _router: Router) {}

  // called when user clicks on submit button
  login() {
    this._loginService.login(
      this.form.controls['name'].value!,
      this.form.controls['id'].value!
    );

    // check if login is successful
    if (
      this._loginService.user.name.length > 0 &&
      this._loginService.user.id.length > 0
    ) {
      // route to homepage
      this._router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

}
