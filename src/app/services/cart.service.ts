import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: IProduct[] = []

  constructor() {
    const stored = localStorage.getItem("cart");
    if (stored) {
      this.items = JSON.parse(stored) || [];
    }
  }

  addToCart(item: IProduct) {
    this.items.push(item);
    this.saveCart();
  }

  removeItem(index: number) {
    if (index > -1) {
      this.items.splice(index, 1);
    }
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

}
