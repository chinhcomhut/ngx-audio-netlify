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
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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
  private changePassUrl = 'https://ndc-music.herokuapp.com/api/auth/changepassword';
  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
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
  changePasswordAuth(changeProfile: ChangePassword): Observable<String> {
    console.log(JwtResponse)
    console.log(this.changePassUrl)
    console.log(this.http)
    console.log(changeProfile)
    console.log(httpOptions)
    return this.http.post<String>(this.changePassUrl, changeProfile, httpOptions);
    console.log("return"+this.http.post<JwtResponse>(this.changePassUrl, changeProfile, httpOptions))
  }
}
