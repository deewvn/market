import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cart: CartService) { }

  ngOnInit(): void {
  }

  remove(index: number): void {
    this.cart.removeItem(index);
  }
}
