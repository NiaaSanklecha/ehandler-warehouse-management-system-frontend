import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductServiceService } from 'src/app/service/product-service.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-inbound',
  templateUrl: './inbound.component.html',
  styleUrls: ['./inbound.component.css']
})
export class InboundComponent implements OnInit {

  //For Product
  myImgUrl:string='~/images/open-box.png';
  
  product : any = {}; 
  recProduct : any;
  stringJson: any;
  stringObject: any; 
  quantity :number | undefined;
  identification_no : string | undefined; 
  userName :string = "";
  warehouseId : string = "";
  showhideDiv : boolean = false ;
  showhideDiv1 : boolean = false;
  url: any; 
	msg = "";
  selectedFile!: File;
  productList : any = {};
  productObject :any; 
  hideButton : boolean = false;
  hideImageInput :boolean = false;
  displayStyle = "none";
  defaultImage = 'assets/images/open-box.png';

  //For Location
  location : any = {};
  recDetails : any;
  locationJson : any;
  displayStyleLocation = "none";
  clientList: any;
  
  constructor(private service: ProductServiceService, private router : Router) { }

  ngOnInit() {
    this.product.quantity = "1"; 
    
    this.userName = sessionStorage.getItem('username')!;
    this.warehouseId = sessionStorage.getItem('warehouseId')!;
    this.product.warehouseId = this.warehouseId;
    let resp = this.service.getProductsNotStored(this.warehouseId);
    resp.subscribe((data)=>{
      this.productList = data;
      console.log(this.productList)
    })
    let resp1 = this.service.getClientDetails(this.warehouseId);
    resp1.subscribe((data)=>{
      this.clientList = data
    })
    
    
    
  }
  // Product Methods
  showDiv(){
    this.showhideDiv = !this.showhideDiv;
  }
  showDiv1(){
    this.showhideDiv1 = !this.showhideDiv1;
  }
  selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
      this.selectedFile = event.target.files[0];
			this.msg = "";
			this.url = reader.result; 
		}
    this.hideImageInput = true;
	}
  }
  public addProduct(){ 
    
    console.log(this.product);
    console.log(typeof this.url)
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile);
    uploadImageData.append('product', JSON.stringify(this.product));
    let resp = this.service.addProductDetails(uploadImageData);
    resp.subscribe(data=>{
      this.recProduct=data
      this.stringObject = JSON.parse(this.recProduct);
      console.log(this.stringObject,"Type: " , typeof this.stringObject);
      this.displayStyle = "block";
    });
     
  }
  closePopup() {
    this.displayStyle = "none";
    this.displayStyleLocation = "none";
  }
  printBarcode(){
    this.displayStyle = "none";
    const data = document.getElementById('barcode1');
      if(data){
      html2canvas(data ).then(canvas => {
        // Few necessary setting options
        var imgWidth = 80;
        var pageHeight = 70;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
         
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('l', 'pt', [40, 90]); // A4 size page of PDF
        for(var i = 0; i< this.product.quantity; i++){
       
        var position = 1;
        pdf.addImage(contentDataURL, 'PNG', 0, position, 90, 30)
        pdf.addPage();
        }
         pdf.autoPrint();
//This is a key for printing
      pdf.output('dataurl');
        this.product.productName = "";
        this.product.productDescription = "";
        this.product.productCategory = "";
        this.product.serialNo = "";
        this.product.quantity = "1";
        this.stringObject = [{}];
        });
      }
      else{
        alert("error")
      }
    
  
  }
  
  //Location Methods

  addLocationButton(){
    console.log(this.location);
    let resp = this.service.addLocation(this.location,this.warehouseId).subscribe(
      data => { 
        this.locationJson = data
        this.recDetails = JSON.parse(this.locationJson);
        this.displayStyleLocation = "block";
      })
  }

  savePDF(){
    this.displayStyleLocation = "none";
      const data = document.getElementById('barcode');
      if(data){
      html2canvas(data).then(canvas => {
        // Few necessary setting options
        var imgWidth = 80;
        var pageHeight = 70;
        var imgHeight = data.offsetHeight;
        var heightLeft = imgHeight;
         
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'pt', [200, 90]); // A4 size page of PDF
       
        var position = 1;
        pdf.addImage(contentDataURL, 'PNG', 0, 0,  90, 200)
        
        pdf.autoPrint();
//This is a key for printing
pdf.output('dataurl');
        this.location.brandName = "";
        this.location.rowNo = "";
        this.location.columnNumber = "";
        this.recDetails = [{}];
        
        });
      }
  }

}




