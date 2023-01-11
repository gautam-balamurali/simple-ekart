import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: any[] = [];

  constructor() {}

  /**
   * Gets grand total
   */
  get grandTotal() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let total = 0;
    cart.forEach((item: any) => {
      total += item.price * item.cart;
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
  filterTheItemFromCart(id: string) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = cart.filter((item: any) => item.id === id);
    return exits;
  }

  /**
   * Reduces quantity
   * @param id
   */
  reduceQuantity(id: string) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = this.filterTheItemFromCart(id);

    if (exits[0].cart === 1) {
      cart = cart;
    } else {
      cart = cart.map((item: any) => {
        if (item.id === id) {
          return { ...item, cart: item.cart - 1 };
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
    this.cart = cart;
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  /**
   * Values of cart
   * @param id
   * @returns items count
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
   * Disables reduce
   * @param id
   * @returns boolean
   */
  disableReduce(id: string) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cart === 1;
  }

  /**
   * Determines delete is clicked
   * @param id
   */
  onDelete(id: string) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter((item: any) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart = cart;
  }
}
