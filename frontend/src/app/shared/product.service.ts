import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly baseURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  saveProducts(data) {
    return this.http.post(`${this.baseURL}/products`,data);
  }

  getAllProducts() {
    return this.http.get(`${this.baseURL}/products`);
  }
  getProductsById(id) {
    return this.http.get(`${this.baseURL}/productById`+`/${id}`);
  }
  updateProducts(data) {
    return this.http.put(`${this.baseURL}/products`+`/${data.id}`,data);
  }
  deleteProduct(id){
    return this.http.delete(`${this.baseURL}/productsById`+`/${id}`);
  }

}
