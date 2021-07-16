import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import { IProduct } from '../models/product';
import { ICategory } from '../models/category';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  products: IProduct[] = [];
  categories: ICategory[] = [];

  constructor(private http: HttpClient) { }

  getReferences(): Observable<any> {
    return forkJoin([this.getCategories(), this.getProducts()]);
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`assets/products.json`)
      .pipe(tap(res => this.products = res));
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`assets/categories.json`)
      .pipe(tap(res => this.categories = res));
  }
}
