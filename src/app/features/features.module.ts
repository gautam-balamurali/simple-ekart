import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import {
  AccountBookFill,
  AlertFill,
  AlertOutline,
  ShoppingCartOutline,
} from '@ant-design/icons-angular/icons';
import { AppRoutingModule } from '../app-routing.module';
import { PurchaseComponent } from './purchase/purchase.component';

const icons: IconDefinition[] = [
  AccountBookFill,
  AlertOutline,
  AlertFill,
  ShoppingCartOutline,
];

@NgModule({
  declarations: [HomeComponent, CartComponent, PurchaseComponent],
  imports: [
    CommonModule,
    NzIconModule.forRoot(icons),
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatBadgeModule,
    AppRoutingModule,
  ],
})
export class FeaturesModule {}
