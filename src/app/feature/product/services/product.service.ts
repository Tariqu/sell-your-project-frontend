import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../product-dailog/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = environment.BASE_URL;
  token: string = `Bearer ${localStorage.getItem('token')}`;

  constructor(private _http: HttpClient) {}

  addProduct(data: IProduct): Observable<IProduct> {
    return this._http
      .post<IProduct>(`${this.baseUrl}/products`, data)
      .pipe(map((res: any) => res.data));
  }

  getProducts(): Observable<IProduct[]> {
    return this._http
      .get<IProduct[]>(`${this.baseUrl}/products`)
      .pipe(map((res: any) => res.data));
  }

  updateProduct(id: number | undefined, payload: IProduct): Observable<any> {
    return this._http.patch(`${this.baseUrl}/products/${id}`, payload);
  }

  deleteProduct(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/products/${id}`);
  }
}
