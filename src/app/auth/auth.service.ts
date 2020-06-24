import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import {environment} from "../../environments/environment";
import {ChangePassword} from "./change-password";
// import {UpdateInfo} from '../model/userManager/UpdateInfo';
// import {ChangePassword} from '../model/userManager/ChangePassword';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set('AuthAuthorities','AuthToken'+localStorage.getItem('AuthUsername'))
};
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'https://ndc-music.herokuapp.com/api/auth/signin';
  private signupUrl = 'https://ndc-music.herokuapp.com/api/auth/signup';
  // private updateProfileUrl = 'http://localhost:8080/api/auth/updateuser';
  private changePassUrl = 'https://ndc-music.herokuapp.com/api/auth/changePassword';
  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    console.log(credentials)
    console.log(JwtResponse)
    console.log(httpOptions)
    console.log(this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions))
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }
  loggined() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const username = sessionStorage.getItem(USERNAME_KEY);
    const authority = sessionStorage.getItem(AUTHORITIES_KEY);
    if (username && token && authority) {
      return true;
    }
    return false;
  }
  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
  // updateAuth(info: UpdateInfo): Observable<JwtResponse> {
  //   return this.http.put<JwtResponse>(this.updateProfileUrl, info, httpOptions);
  // }
  //
  changePasswordAuth(info: ChangePassword): Observable<JwtResponse> {
    console.log(JwtResponse);
    console.log(this.http.put<JwtResponse>(this.changePassUrl, info, httpOptions));
    return this.http.put<JwtResponse>(this.changePassUrl, info, httpOptions);
  }
  updatePassword(users: ChangePassword): Observable<ChangePassword> {
    return this.http.put<ChangePassword>(this.changePassUrl, users);
  }
    changePassword(data){
    var headers = new HttpHeaders()
        .set('AuthAuthorities', 'AuthToken ' + localStorage.getItem('AuthUsername'));

    var options =  {
      headers: headers
    };
    return this.http
        .put(this.changePassUrl,data, options)
  }
}
