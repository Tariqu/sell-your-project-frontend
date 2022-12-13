import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = environment.BASE_URL;
  token: string = `Bearer ${localStorage.getItem('token')}`;

  constructor(private _http: HttpClient) {}

  getDetail() {
    return this._http
      .get(`${this.baseUrl}/users/me`, {
        headers: {
          Authorization: this.token,
        },
      })
      .pipe(map((res: any) => res.data));
  }
}
