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
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  attempedLogin: boolean = false
  attempedRegister: boolean = false
  passwordMatch: boolean = true

  get loginUsername(): any {
    return this.loginForm.get('username');
  }
  get loginPassword(): any {
    return this.loginForm.get('password');
  }
  get registerUsername(): any {
    return this.registerForm.get('nickname');
  }
  get registerEmail(): any {
    return this.registerForm.get('username');
  }
  get registerPassword(): any {
    return this.registerForm.get('password');
  }
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private profileService: ProfileService) {

    if (authenticationService.getCurrentUser())
      this.router.navigateByUrl("\home");

    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.email

      ]),
      password: new FormControl('',
        [Validators.required,
        Validators.minLength(5)
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

  checkPasswordsMatching(password: any) {
    if (password.target.value != this.registerForm.get('password')?.value)
      this.passwordMatch = false
    else
      this.passwordMatch = true
  }

  async login() {
    if (!this.loginForm.valid)
      this.attempedLogin = true
    else
      this.authenticationService.login(this.loginForm.getRawValue())
        .subscribe(async data => {
          this.profileService.getProfile(data.user)
            .then(data => {
              this.profileService.setCurrentProfile(data)
              this.router.navigateByUrl("/home");
            });
        }, error => {
        });
  };

  async register() {
    if (!this.registerForm.valid)
      this.attempedRegister = true
    else
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
