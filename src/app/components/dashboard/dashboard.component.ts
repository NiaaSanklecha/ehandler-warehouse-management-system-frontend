import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName :string = "";
  warehouseId : string = "";
  warehouseList: any;
  constructor(private service : ProductServiceService) { }

  ngOnInit(): void {
    
    this.userName = sessionStorage.getItem('username')!;
    this.warehouseId = sessionStorage.getItem('warehouseId')!;

    let resp = this.service.getWarehouseDetails(this.warehouseId);
    resp.subscribe((data)=>{
      this.warehouseList =data;
    })
    var chart = new Chart("myChart", {
      type: 'line',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: 'red ',
              borderColor: 'red ',
              fill:true
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
    /* let resp1 = this.service.getOrderCount(this.warehouseId);
    resp1.subscribe((data)=>{
      console.log(data)
    }) */
  }
 

}
