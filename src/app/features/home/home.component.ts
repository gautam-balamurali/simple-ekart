import { Component, OnInit } from '@angular/core';
import { RouteConstants } from 'src/app/config/route-constants';
import { CartModel } from 'src/app/models/cart/cart.model';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  shoppingItems: CartModel[] = [];

  cartItems: CartModel[] = JSON.parse(localStorage.getItem('cart') || '[]');

  ROUT_CONST = RouteConstants.ROUTES;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCartData().subscribe((data: CartModel[]) => {
      this.shoppingItems = data;
      localStorage.setItem('products', JSON.stringify(data));
    });
  }

  /**
   * Values of cart
   * @param id
   * @returns item count
   */
  valueOfCart(id: number) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cartCount;
  }

  /**
   * Disables addition
   * @param id
   * @returns boolean
   */
  disableAddition(id: number) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cartCount === exits[0]?.quantity;
  }

  /**
   * Hides the carts
   * @param id
   * @returns boolean
   */
  hideTheCarts(id: number) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cartCount > 0;
  }

  /**
   * Filters the item from cart
   * @param id
   * @returns items
   */
  filterTheItemFromCart(id: number) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = cart.filter((item: CartModel) => item.id === id);
    return exits;
  }

  /**
   * Determines whether add to cart is clicked
   * @param item
   */
  onClickAddToCart(item: CartModel) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = this.filterTheItemFromCart(item.id);
    if (exits.length) {
      cart = cart.map((item: CartModel) => {
        if (item.id === item.id) {
          return { ...item, cartCount: item.cartCount ? item.cartCount + 1 : 1 };
        } else {
          return { ...item };
        }
      });
    } else {
      cart.push({ ...item, cartCount: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartItems = cart;
  }

  /**
   * Reduces quantity
   * @param id
   */
  reduceQuantity(id: number) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = this.filterTheItemFromCart(id);

    if (exits[0].cartCount === 1) {
      cart = cart.filter((item: CartModel) => item.id !== id);
    } else {
      cart = cart.map((item: CartModel) => {
        if (item.id === id) {
          return { ...item, cartCount: item.cartCount - 1 };
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
  increaseQuantity(id: number) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = this.filterTheItemFromCart(id);

    if (exits[0].cartCount !== exits[0].quantity) {
      cart = cart.map((item: CartModel) => {
        if (item.id === id) {
          return { ...item, cartCount: item.cartCount + 1 };
        } else {
          return { ...item };
        }
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartItems = cart;
  }
}
