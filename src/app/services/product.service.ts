import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private REST_API_SERVER ="https://localhost:5001/api/products";

  constructor(private http: HttpClient) {

  }
  getProducts():Observable<Product[]> {
    return this.http.get<Product[]>(this.REST_API_SERVER);
  }

  getProduct(productId: number) {
    return this.http.get(`${this.REST_API_SERVER}/${productId}`);
  }

  addOrUpdateProduct(product: Product) {
    return this.http.post(this.REST_API_SERVER,product);
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.REST_API_SERVER}/${productId}`);
  }
}
