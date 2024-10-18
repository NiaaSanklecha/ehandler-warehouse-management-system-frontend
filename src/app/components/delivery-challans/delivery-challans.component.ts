import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import { ProductServiceService } from 'src/app/service/product-service.service';
@Component({
  selector: 'app-delivery-challans',
  templateUrl: './delivery-challans.component.html',
  styleUrls: ['./delivery-challans.component.css']
})
export class DeliveryChallansComponent implements OnInit {
  userName :string = "";
  warehouseId : string = "";
  clientList: any;
  delivery : any = {}; 
  deliveryList : any;
  displayStyle = "none";
  hidden :boolean = true;
  searchId : string = "";
  searchedDelivery : any;
  stringOject: any = null;
  amount : number = 0;
  extraCharges : number = 0;
  constructor(private service: ProductServiceService) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('username')!;
    this.warehouseId = sessionStorage.getItem('warehouseId')!;
    this.delivery.deliveryNo = "DC-"
    let resp1 = this.service.getClientDetails(this.warehouseId);
    resp1.subscribe((data)=>{
      this.clientList = data
    })
    let resp = this.service.getDelivery()
    resp.subscribe((data)=>{
    this.deliveryList = data
    console.log(this.deliveryList)
    })

  
  }
 
  viewForm(){
    this.hidden= false;
  }
  search(){
    let resp = this.service.getDeliveryById(this.searchId);
    resp.subscribe((data)=>{
      this.searchedDelivery = data
      this.stringOject = JSON.parse(JSON.stringify(this.searchedDelivery));
      console.log("qwe"+this.stringOject)
    })
  }
  amountchange(newValue: any) {  
    this.amount = newValue
    console.log(this.amount);
    this.calculate();
  }
  extraChargeschange(newValue: any) {  
    this.extraCharges = newValue
    console.log(this.extraCharges);
    this.calculate();
  }
  calculate(){
    var temp = (this.amount+this.extraCharges)*0.18;
    console.log("temp "+temp)
    this.delivery.total = this.amount+this.extraCharges+temp;
    console.log("total" +this.delivery.total);
  }
  addDelivery(){
    console.log(this.delivery );
    this.displayStyle = "block";
  }
  printInvoice(){
    this.displayStyle = "none";
    this.hidden = true;
    let resp = this.service.addDelivery(this.delivery);
    resp.subscribe((data)=>{
      var list = data
    })
      const data = document.getElementById('invoice');
      if(data){
      html2canvas(data).then(canvas => {
        // Few necessary setting options
        var imgWidth = 80;
        var pageHeight = 70;
        var imgHeight = data.offsetHeight;
        var heightLeft = imgHeight;
         
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
       
        var position = 1;
        pdf.addImage(contentDataURL, 'PNG', 0, 0,210, 230)
        
        pdf.autoPrint();
//This is a key for printing
pdf.output('dataurl');
        
        
        });
      }
  }
}
