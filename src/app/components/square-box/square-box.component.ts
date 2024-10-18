import { Component, Input, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-square-box',
  templateUrl: './square-box.component.html',
  styleUrls: ['./square-box.component.css']
})
export class SquareBoxComponent implements OnInit {

  @Input() locationId : any;
  @Input() warehouseId: any;
  showDiv : boolean = false;
  storageDetails : any;
  constructor(private service : ProductServiceService) { }

  ngOnInit(): void {
   
      console.log(this.locationId + "locatio");
      let resp = this.service.searchStorageLocation(this.locationId,this.warehouseId);
      resp.subscribe((data) =>{
        this.storageDetails = data;
        console.log(this.storageDetails);
      })
   
  }

}
