import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  cart: any[] = [];

  constructor() {}

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
   * Values of cart
   * @param id 
   * @returns items count 
   */
  valueOfCart(id: string) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cart;
  }
}
