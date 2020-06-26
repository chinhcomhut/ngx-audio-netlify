import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SingerInfo} from "../model/singer/singer-info";

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  private singerUrl = environment.URL+'/api/auth/singer'
  constructor(private http: HttpClient) { }
  getSingerList(): Observable<SingerInfo[]>{
    return this.http.get<SingerInfo[]>(this.singerUrl)
  }
  createSinger(singer: SingerInfo): Observable<SingerInfo> {
    return this.http.post<SingerInfo>(this.singerUrl , singer);
  }
  getSingerById(id: number): Observable<SingerInfo>{
    return this.http.get<SingerInfo>(this.singerUrl+id)
  }

  updateSinger(singer: SingerInfo): Observable<SingerInfo> {
    return this.http.put<SingerInfo>(this.singerUrl + singer.id , singer);
  }

  deleteSinger(id: string): Observable<void> {
    return this.http.delete<void>(this.singerUrl + id);
  }

  searchLineByName(singer: SingerInfo): Observable<SingerInfo[]> {
    return this.http.post<SingerInfo[]>(this.singerUrl + 'search-by-name', singer);
  }
}
