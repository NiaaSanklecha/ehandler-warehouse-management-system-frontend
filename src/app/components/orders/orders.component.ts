import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  product_id : string ="";
  location_id : string ="";
  quantity : string = "";
  clientList : any;
  userName :string = "";
  warehouseId : string = "";
  defaultImage = 'assets/images/client_image.png';

  constructor(private router : Router,private service : ProductServiceService) { 

  }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('username')!;
    this.warehouseId = sessionStorage.getItem('warehouseId')!;
    let resp = this.service.getClientDetails(this.warehouseId);
    resp.subscribe((data)=>{
      this.clientList = data
    })
  }
  showClientDetails(id:any){
    console.log(id);
    this.router.navigate(['/orderlist'], {queryParams: {client_id:id}});
  }
  order_pick(){
    this.router.navigate(['/order-pickup'], {queryParams: {product_id:this.product_id,location_id:this.location_id,quantity:this.quantity}});
  }
}
