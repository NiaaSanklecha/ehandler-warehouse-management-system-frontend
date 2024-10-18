import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})

export class ProductServiceService {

 //private baseUrl = 'http://ehandler-env.eba-ieyumemq.us-east-2.elasticbeanstalk.com/';
                    
  private baseUrl = 'http://localhost:5013/';

  constructor(private http:HttpClient) { }
  private  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*'); 
  /* ----Product Methods (Start) ------------ */
  public addProductDetails(uploadImageData: FormData){
    
    console.log("add product");
    return this.http.post(this.baseUrl+"addproduct",uploadImageData, {responseType : 'text' as 'json'});
  }

  public searchProductDetails(searchProduct : any,warehouseId:any){
    return this.http.get(this.baseUrl+"searchproduct/"+searchProduct+"/"+warehouseId, {responseType : 'text' as 'json'});
  }

  updateProduct(productIdentificationNo: string, product: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}update/${productIdentificationNo}`,product, {responseType : 'text' as 'json'});
  }

  public getProductsNotStored(warehouseId:any){
    return this.http.get(this.baseUrl+"getProductsNotStored/"+warehouseId);
  }

  /* ----Product Methods (End) ------------ */

  /* ----Storage Methods (Start) ------------ */

  addProductInStore(productIdentificationNo: string, location: string, storage : any,warehouseId:any){
    return this.http.post(this.baseUrl+"storeItems/"+productIdentificationNo+"/"+location+"/"+warehouseId,storage, {responseType : 'text' as 'json'});
  }
  searchDetailsInStore(productId : string,warehouseId:any){
    return this.http.get(this.baseUrl+"searchOrderedProduct/"+productId+"/"+warehouseId, {responseType : 'text' as 'json'});
  }

  updateInStore(updateStore: any){
    return this.http.post(this.baseUrl+"updateInStore/",updateStore, {responseType : 'text' as 'json'});
  }

  getStorage(warehouseId:any){
    return this.http.get(this.baseUrl+"getStorage/"+warehouseId);
  }
  searchStorageLocation(locationId:any,warehouseId:any){
    return this.http.get(this.baseUrl+"searchStorageLocation/"+locationId+"/"+warehouseId);
  }
  /* ----Storage Methods (End) ------------ */

   /* ----Location Methods (Start) ------------ */
  addLocation(location: any,warehouseId:string){
    return this.http.post(this.baseUrl+"addLocation/"+warehouseId,location, {responseType : 'text' as 'json'});
  }

  searchLocation(locationId : any,warehouseId:any){
    return this.http.get(this.baseUrl+"searchlocation/"+locationId+"/"+warehouseId, {responseType : 'text' as 'json'});
  }
  getLocationList(warehouseId:any){
    return this.http.get(this.baseUrl+"getLocationList/"+warehouseId);
  }
  getLocationLDetails(brandName:string,warehouseId:string){
    return this.http.get(this.baseUrl+"getLocationLDetails/"+brandName+"/"+warehouseId);
  }
   /* ----Location Methods (End) ------------ */

  /* ----User Methods (Start) ------------ */
  addUser(user:any){
    return this.http.post(this.baseUrl+"addUser",user, {responseType: 'text' as 'json'});
  }
  getEmployeeList(){
    return this.http.get(this.baseUrl+"getUserList");
  }
  deleteUser(id:string){
    return this.http.delete(this.baseUrl+"deleteUser/"+id);
  }

  /* ----User Methods (End) ------------ */
  /* ----Warehouse Methods (Start) ------------ */

  addWareHouse(warehouse:any){
    console.log("in service" + warehouse);
    return this.http.post(this.baseUrl+"addwarehouse",warehouse, {responseType: 'text' as 'json'});
  }
getWarehouseList(){
    return this.http.get(this.baseUrl+"getWarehouseList/");
  }
  getWarehouseDetails(warehouseId:any){
    return this.http.get(this.baseUrl+"getWarehouseDetails/"+warehouseId);
  }

  /* ----Warehouse Methods (End) ------------ */

  addClient(uploadImageData:FormData){
    return this.http.post(this.baseUrl+"addclient",uploadImageData,{responseType: 'text' as 'json'})
  }
  getClientDetails(warehouseId:any){
    return this.http.get(this.baseUrl+"getClientDetails/"+warehouseId);
  }
  getClientDetailsById(clientId: any,warehouseId:any){
    return this.http.get(this.baseUrl+"getClientById/"+warehouseId+"/"+clientId);
  }

  getPickedUpList(warehouseId:string){
    return this.http.get(this.baseUrl+"getPickedUpItemsList/"+warehouseId);
  }
  getPackOrderById( warehouseId: any,orderId:any){
    return this.http.get(this.baseUrl+"getPackOrderById/"+warehouseId+"/"+orderId);
  }
  updatePickedUpList(warehouseId:any,orderId:any){
    return this.http.post(this.baseUrl+"updatePickedUpList/"+warehouseId+"/"+orderId,{responseType : 'text' as 'json'});
  }
  getPackedUpList(warehouseId:any){
    return this.http.get(this.baseUrl+"getPackedUpList/"+warehouseId);
  }
  getPackedUpListById(warehouseId:any,orderId:any){
    return this.http.get(this.baseUrl+"getPackedUpListById/"+warehouseId+"/"+orderId);
  }
  updateListtoShipped(warehouseId:any,orderId:any){
    return this.http.post(this.baseUrl+"updateListtoShipped/"+warehouseId+"/"+orderId,{responseType : 'text' as 'json'});
  }
  getOrderCount(warehouseId:any){
    return this.http.get(this.baseUrl+"getOrderCount/"+warehouseId);
  }

  addInvoice(invoice:any){
    return this.http.post(this.baseUrl+"addInvoice",invoice,{responseType: 'text' as 'json'});
  }
  getInvoices(){
    return this.http.get(this.baseUrl+"getInvoices");
  }
  getInvoiceById(invoiceNo : string){
    return this.http.get(this.baseUrl+"getInvoicesById/"+invoiceNo);
  }
  addDelivery(delivery:any){
    return this.http.post(this.baseUrl+"addDelivery",delivery,{responseType: 'text' as 'json'});
  }
  getDelivery(){
    return this.http.get(this.baseUrl+"getDeliverys");
  }
  getDeliveryById(deliveryNo : string){
    console.log("delivery")
    return this.http.get(this.baseUrl+"getDeliveryById/"+deliveryNo);
  }
}
