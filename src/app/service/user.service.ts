import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
// import {UpdateInfo} from '../model/userManager/UpdateInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = environment.URL+'/api/auth/user';
  private pmUrl = environment.URL+'/api/test/pm';
  private adminUrl = environment.URL+'/api/test/admin';
  // private updateUserUrl = 'http://localhost:8080/api/auth/updateuser';
  // private getUserUrl = 'http://localhost:8080/api/auth/user';
  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
  // getUpdateUser(username: string): Observable<UpdateInfo> {
  //   return this.http.get<UpdateInfo>(`${this.updateUserUrl}/${username}`);
  // }
  // getUser(username: string): Observable<UpdateInfo> {
  //   return this.http.get<UpdateInfo>(`${this.getUserUrl}/${username}`);
  // }
}
