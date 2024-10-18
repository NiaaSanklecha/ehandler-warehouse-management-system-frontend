import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { ShopifyService } from 'src/app/service/shopify.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  userName :string = "";
  warehouseId : string = "";
  orders: any;
  orderObject : any;
  orderDetals: any;
  orderDetalsObject : any;
  received_clientId : string = "";
  clientObject : any;
  orderId: any;
  productId : any; 
  clientId : any;
  orderQuantity: any;
  lineItemId: any;
  isVisible : boolean = false;
  hideOrderList : boolean = true;
  showOrderDetails : boolean = false;
  todayISOString : string = new Date().toISOString();
  constructor(private route : ActivatedRoute,private productService : ProductServiceService,private shopifyServ : ShopifyService) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('username')!;
    this.warehouseId = sessionStorage.getItem('warehouseId')!;
    this.received_clientId = this.route.snapshot.queryParamMap.get('client_id')!;
    let resp = this.productService.getClientDetailsById(this.received_clientId,this.warehouseId);
    resp.subscribe((data)=>{
      this.clientObject = data 
    })
  }
  showOrders(id : any){
    let resp = this.shopifyServ.getOrderList(this.warehouseId,id);
    resp.subscribe(
      data=>{
        console.log(data)
        if(data != null){
          this.orders = data;
          this.orderObject = JSON.parse(JSON.stringify(this.orders));
          console.log(this.orderObject)
        }else{
          alert("Bad Request");
        }
      
    })
  }
  showOrderList(){
    this.showOrderDetails = true;
    this.isVisible = false;
  }
  goBack(){
    this.showOrderDetails = false;
    this.hideOrderList = true;
  }
  hideDiv(string : any){
    this.showOrderDetails = true;
    this.isVisible = false;
  }
  showOrderInDetail(orderId :any){
    this.hideOrderList = false;
    this.showOrderDetails = true;
    let resp1 = this.shopifyServ.getOrderById(this.warehouseId,this.received_clientId,orderId);
    resp1.subscribe((data)=>{
      this.orderDetals = data; 
      this.orderDetalsObject = Array.of(this.orderDetals);
      console.log( this.orderDetalsObject)
    })

  }
  loadPickUp(order_id:any,product_id:any,quantity:any,line_item:any){
    this.showOrderDetails = false;
    this.hideOrderList = false;
    this.orderId = order_id;
    this.productId = product_id;
    this.clientId = this.received_clientId;
    this.orderQuantity = quantity;
    this.lineItemId = line_item;
    this.isVisible = true;
  }

}
