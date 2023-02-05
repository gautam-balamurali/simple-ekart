import { Component, OnInit } from '@angular/core';
import { CartModel } from 'src/app/models/cart/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: CartModel[] = [];

  constructor() {}

  /**
   * Gets grand total
   */
  get grandTotal() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let total = 0;
    cart.forEach((item: CartModel) => {
      total += item.price * item.cartCount;
    });
    return total;
  }

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
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
   * Reduces quantity
   * @param id
   */
  reduceQuantity(id: number) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = this.filterTheItemFromCart(id);

    if (exits[0].cartCount === 1) {
      cart = cart;
    } else {
      cart = cart.map((item: CartModel) => {
        if (item.id === id) {
          return { ...item, cartCount: item.cartCount - 1 };
        } else {
          return { ...item };
        }
      });
    }
    this.cart = cart;
    localStorage.setItem('cart', JSON.stringify(cart));
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
    this.cart = cart;
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  /**
   * Values of cart
   * @param id
   * @returns items count
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
   * Disables reduce
   * @param id
   * @returns boolean
   */
  disableReduce(id: number) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cartCount === 1;
  }

  /**
   * Determines delete is clicked
   * @param id
   */
  onDelete(id: number) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter((item: CartModel) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart = cart;
  }
}
