import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorefrontComponent } from './components/storefront/storefront.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {
    path: 'cart',
    pathMatch: 'full',
    component: CartComponent
  },
  {
    path: '',
    component: StorefrontComponent,
    children: [
      {
        path: ':id',
        component: StorefrontComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
