import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from './config/route-constants';
import { CartComponent } from './features/cart/cart.component';
import { HomeComponent } from './features/home/home.component';
import { PurchaseComponent } from './features/purchase/purchase.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: RouteConstants.ROUTES.HOME,
        pathMatch: 'full',
      },
      {
        path: RouteConstants.ROUTES.HOME,
        component: HomeComponent,
      },
      {
        path: RouteConstants.ROUTES.CART,
        component: CartComponent,
      },
      {
        path: RouteConstants.ROUTES.PURCHASE,
        component: PurchaseComponent,
      },
      {
        path: '**',
        redirectTo: RouteConstants.ROUTES.HOME,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
