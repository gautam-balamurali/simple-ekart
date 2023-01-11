import { Injectable } from '@angular/core';

/**
 * Route Constants file for the application.
 * acts as a config file for all Route constants.
 * list of default routes
 */
@Injectable({ providedIn: 'root' })
export class RouteConstants {
  public static readonly ROUTES = {
    HOME: 'home',
    CART: 'cart',
    PURCHASE:'purchase'
  };
}
