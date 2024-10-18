import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  warehouse : any = {};
  user :string = "";
  warehouseId : string = "";
  locationList : any;
  locationDetail : any;
  constructor(private service : ProductServiceService) { }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('username')!;
    this.warehouseId = sessionStorage.getItem('warehouseId')!;
    let resp1 = this.service.getLocationList(this.warehouseId);
    resp1.subscribe((data) =>{
      this.locationList = data;
      console.log(this.locationList)
    })
  }

  addWarehouse(){
    console.log(this.warehouse);
    let resp = this.service.addWareHouse(this.warehouse);
    resp.subscribe((data)=>{
      var message = data
      alert(message);
    })
    
    console.log("Invoked")
    
  }
  searchDetails(name:string){
    let resp = this.service.getLocationLDetails(name,this.warehouseId);
    resp.subscribe((data) =>{
      this.locationDetail = data;
      console.log(this.locationDetail)
    })
  }
  

}
