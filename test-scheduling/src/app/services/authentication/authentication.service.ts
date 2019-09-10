import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const headers = {
  headers: new HttpHeaders({
    "content-type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private authURL: string = 'http://localhost:3030/authentication/';

  constructor(
    private httpClient: HttpClient,
    public jwtHelper: JwtHelperService
    ) { }


  login(userid:string, password:string) {

    return this.httpClient.post<{accessToken:  string}>(this.authURL, {strategy:'local', uid:userid, userPassword:password}, headers).pipe(tap(res => {
      localStorage.setItem('accessToken', res.accessToken);
      this.decodeToken();
    },
    err => {
    }))
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  isUserLoggedIn() {
    let token = localStorage.getItem('accessToken')
    return !(token === null)
  }

  isAdmin() {
    let permission = localStorage.getItem('gid');
    return (permission === '506' || permission === '505');
  }

  isSuperAdmin() {
    let permission = localStorage.getItem('gid');
    return (permission === '506');
  }

  isManager() {
    let permission = localStorage.getItem('gid');
    return (permission === '505');
  }

  isRequestor() {
    let permission = localStorage.getItem('gid');
    return (permission === '501');
  }

  decodeToken() {
    let token = localStorage.getItem('accessToken');
    let data = this.jwtHelper.decodeToken(token);
    localStorage.setItem('userid', data.uname);
    localStorage.setItem('gid', data.gid);
  }

  getUserName() {
    let username = localStorage.getItem('userid');
    return username;
  }

  getGid() {
    let gid = localStorage.getItem('gid');
    return gid;
  }

}