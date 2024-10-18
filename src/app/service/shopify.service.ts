import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import typeBundle from './types';

@Injectable({
  providedIn: 'root'
})
export class ShopifyService {

  private baseUrl = 'http://localhost:5013/';
  //private baseUrl = 'http://ehandler-env.eba-ieyumemq.us-east-2.elasticbeanstalk.com/';
  constructor(private http: HttpClient){}
  getOrderList( warehouseId: any,clientId : string){

    return this.http.get(this.baseUrl+"getShopifyOrders/"+warehouseId+"/"+clientId);
  }
  getOrderById( warehouseId: any,clientId : string,orderId:any){
    return this.http.get(this.baseUrl+"getOrderById/"+warehouseId+"/"+clientId+"/"+orderId);
  }
  
  getProductList(warehouseId: any, clientId: any){
    return this.http.get(this.baseUrl+"getProductList/"+warehouseId+"/"+clientId);
  }
  
 }

 