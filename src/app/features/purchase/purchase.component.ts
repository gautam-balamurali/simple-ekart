import { Component, OnInit } from '@angular/core';
import { CartModel } from 'src/app/models/cart/cart.model';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
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
   * Values of cart
   * @param id
   * @returns items count
   */
  valueOfCart(id: number) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cartCount;
  }

  /**
   * Clears cache
   */
  clearCache() {
    localStorage.clear();
  }
}
