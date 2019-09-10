import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { first } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'otovar';
  password = 'password';
  error = '';
  invalidLogin = false

  constructor(
    private router: Router,
    private loginservice: AuthenticationService,
    public jwtHelper: JwtHelperService
    ) { }

  ngOnInit() {
  }

  checkLogin() {
    this.loginservice.login(this.username, this.password)
    .pipe(first())
    .subscribe(
        data => {
          this.router.navigate(['']);
          this.invalidLogin = false;
        },
        error => {
          this.invalidLogin = true;
          this.error = error;
        });
  }

}