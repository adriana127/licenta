import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:any;
  registerForm:any;

  constructor(private authenticationService: AuthenticationService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
  
      ]),
      password: new FormControl('',
        [Validators.required,
        Validators.minLength(6)
        ])
    });
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      username: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('',
        [Validators.required,
        Validators.minLength(6)
        ])
    });
   }

  ngOnInit(): void {
  }
  login() {
    this.authenticationService.login(this.loginForm.getRawValue())
      .subscribe(data => {

      }, err => {
        alert(err.message)
      });
  };
  register() {
    this.authenticationService.register(this.registerForm.getRawValue())
      .subscribe(data => {

      }, err => {
        alert(err.message)
      });
  };
}
