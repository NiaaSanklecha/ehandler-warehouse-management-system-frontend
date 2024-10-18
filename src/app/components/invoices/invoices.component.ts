import { Component, OnChanges, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/service/product-service.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  userName :string = "";
  warehouseId : string = "";
  clientList: any;
  invoiceList :any
  invoice : any = {}; 
  displayStyle = "none";
  hidden :boolean = true;
  searchId: string = "";
  searchedInvoice : any;
  stringObject : any = null;
  amount : number = 0;
  extraCharges : number = 0;
  constructor(private service: ProductServiceService) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('username')!;
    this.warehouseId = sessionStorage.getItem('warehouseId')!;
    this.invoice.invoiceNo = "Inv-"
    let resp1 = this.service.getClientDetails(this.warehouseId);
    resp1.subscribe((data)=>{
      this.clientList = data
    })
    let resp = this.service.getInvoices();
    resp.subscribe((data)=>{
      this.invoiceList = data
      console.log(this.invoiceList)
    })

  
  }
 
  viewForm(){
    this.hidden= false;
  }
  search(){
    let resp = this.service.getInvoiceById(this.searchId);
    resp.subscribe((data)=>{
      this.searchedInvoice = data
      this.stringObject = JSON.parse(JSON.stringify(this.searchedInvoice));
      console.log(this.stringObject)
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
    this.invoice.total = this.amount+this.extraCharges+temp;
    console.log("total" +this.invoice.total);
  }
  addInvoice(){
    console.log(this.invoice)
    this.displayStyle = "block";
  }
  printInvoice(){
    this.displayStyle = "none";
    this.hidden= true;
    let resp = this.service.addInvoice(this.invoice);
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
        pdf.addImage(contentDataURL, 'PNG', 0, 0,210, 290)
        
        pdf.autoPrint();
//This is a key for printing
pdf.output('dataurl');
        
        
        });
      }
  }

}
