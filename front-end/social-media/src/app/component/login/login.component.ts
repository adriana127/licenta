import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  registerForm: any;

  constructor(private router: Router,
             private authenticationService: AuthenticationService,
             private profileService:ProfileService) {
    if(authenticationService.getCurrentUser()==null)
    this.router.navigateByUrl("\home");
    this.authenticationService.logout()

    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.email

      ]),
      password: new FormControl('',
        [Validators.required,
        Validators.minLength(6)
        ])
    });
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      nickname: new FormControl('', [
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
  async login() {
    this.authenticationService.login(this.loginForm.getRawValue())
      .subscribe(async data => {
          await this.profileService.loadData()
          this.router.navigateByUrl("/home");

      }, err => {
        alert(err.message)
      });
  };
  register() {
    this.authenticationService.register(this.registerForm.getRawValue())
      .subscribe(data => {
        console.log(data)
        if (data.status === 201) {
          this.authenticationService.login({
            username: this.registerForm.getRawValue().username,
            password: this.registerForm.getRawValue().password
          }).subscribe(data => {
          }, err => {
            alert(err.message)
          });
        }
      });
  }
}
