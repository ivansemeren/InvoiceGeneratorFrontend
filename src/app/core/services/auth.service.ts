import { LoginRsp, SignupRsp } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(body: User): Observable<LoginRsp> {
    return this.httpClient.post<LoginRsp>(`${environment.api_url}/users/login`, body);
  }
  signup(body: User): Observable<SignupRsp> {
    return this.httpClient.post<SignupRsp>(`${environment.api_url}/users/signup`, body);
  }
}
