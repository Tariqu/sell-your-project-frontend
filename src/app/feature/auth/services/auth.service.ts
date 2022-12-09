import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.BASE_URL;

  constructor(private _http: HttpClient) {}

  signup(payload: any) {
    return this._http.post(`${this.baseUrl}/auth/signup`, payload);
  }

  login(body: any) {
    return this._http.post(`${this.baseUrl}/auth/login`, body);
  }
}
