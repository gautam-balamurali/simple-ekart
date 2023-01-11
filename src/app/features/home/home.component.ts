import { Component, OnInit } from '@angular/core';
import { RouteConstants } from 'src/app/config/route-constants';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  shoppingItems: any = [];
  searchedItems: any = [];
  cartItems: any = JSON.parse(localStorage.getItem('cart') || '[]');

  ROUT_CONST = RouteConstants.ROUTES;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCartData().subscribe((data) => {
      this.shoppingItems = data;
      this.searchedItems = data;
      localStorage.setItem('products', JSON.stringify(data));
    });
  }

  valueOfCart(id: string) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cart;
  }

  disableAddition(id: string) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cart === exits[0]?.quantity;
  }

  hideTheCarts(id: string) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cart > 0;
  }

  filterTheItemFromCart(id: string) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = cart.filter((item: any) => item.id === id);
    return exits;
  }

  onClickAddToCart(item: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = this.filterTheItemFromCart(item.id);
    if (exits.length) {
      cart = cart.map((item: any) => {
        if (item.id === item.id) {
          return { ...item, cart: item.cart ? item.cart + 1 : 1 };
        } else {
          return { ...item };
        }
      });
    } else {
      cart.push({ ...item, cart: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartItems = cart;
  }

  reduceQuantity(id: string) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = this.filterTheItemFromCart(id);

    if (exits[0].cart === 1) {
      cart = cart.filter((item: any) => item.id !== id);
    } else {
      cart = cart.map((item: any) => {
        if (item.id === id) {
          return { ...item, cart: item.cart - 1 };
        } else {
          return { ...item };
        }
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartItems = cart;
  }

  increaseQuantity(id: string) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = this.filterTheItemFromCart(id);

    if (exits[0].cart !== exits[0].quantity) {
      cart = cart.map((item: any) => {
        if (item.id === id) {
          return { ...item, cart: item.cart + 1 };
        } else {
          return { ...item };
        }
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartItems = cart;
  }
}
