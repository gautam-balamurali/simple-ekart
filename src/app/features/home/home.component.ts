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

  /**
   * Values of cart
   * @param id 
   * @returns item count 
   */
  valueOfCart(id: string) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cart;
  }

  /**
   * Disables addition
   * @param id 
   * @returns boolean 
   */
  disableAddition(id: string) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cart === exits[0]?.quantity;
  }

  /**
   * Hides the carts
   * @param id 
   * @returns boolean 
   */
  hideTheCarts(id: string) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cart > 0;
  }

  /**
   * Filters the item from cart
   * @param id 
   * @returns items 
   */
  filterTheItemFromCart(id: string) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = cart.filter((item: any) => item.id === id);
    return exits;
  }

  /**
   * Determines whether add to cart is clicked 
   * @param item 
   */
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

  /**
   * Reduces quantity
   * @param id 
   */
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

  /**
   * Increases quantity
   * @param id 
   */
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
