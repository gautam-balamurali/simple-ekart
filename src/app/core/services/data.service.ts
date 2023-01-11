import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConfig } from 'src/app/config/app-config';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = GlobalConfig.apiEndpoint;

  constructor(private http: HttpClient) {}

  public getCartData() {
    return this.http.get(this.baseUrl);
  }
}
