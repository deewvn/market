import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { IProduct } from '../../models/product';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.scss']
})
export class StorefrontComponent implements OnInit, OnDestroy {

  products: IProduct[] = [];
  categoryId: number | null = null;

  constructor(public config: ConfigService,
              private route: ActivatedRoute,
              private router: Router,
              private cart: CartService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let activatedRoute = this.route.firstChild;
        while (!activatedRoute) {
          // @ts-ignore
          activatedRoute = activatedRoute.firstChild;
        }
      }
    });
  }

  ngOnInit(): void {
    this.config.getReferences().subscribe(_ => {
      this.filter();
    });
  }

  filter(): void {
    this.products = this.config.products.filter((x: IProduct) => {
      if (this.categoryId) {
        return x.category === this.categoryId
      }
      return x;
    })
  }

  onSelectCategory(id: number | null) {
    this.categoryId = id;
    this.filter();
    this.router.navigateByUrl(id ? id.toString() : ''); // плохо спроектировал в голове...
  }

  ngOnDestroy(): void {
  }

  addToCart(product: IProduct): void {
    this.cart.addToCart(product);
  }

}
