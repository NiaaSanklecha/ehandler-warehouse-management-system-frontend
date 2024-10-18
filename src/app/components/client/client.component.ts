import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { RegisterationService } from 'src/app/service/registeration.service';
import { ShopifyService } from 'src/app/service/shopify.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  userName :string = "";
  warehouseId : string = "";
  displayStyle = "none";
  url: any; 
	msg = "";
  selectedFile!: File;
  client : any = {};
  image : any;
  shopTitle: string = "";
  clientList: any;
  productList: any;
  constructor(private service : ProductServiceService, private shopifyService: ShopifyService) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('username')!;
    this.warehouseId = sessionStorage.getItem('warehouseId')!;
    let resp = this.service.getClientDetails(this.warehouseId);
    resp.subscribe((data)=>{
      this.clientList = data
    })
  }
  
  
  openClientForm(){
    this.displayStyle = "block";
  }
  closeClientForm(){
    this.displayStyle = "none";
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
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
      this.selectedFile = event.target.files[0];
			this.msg = "";
			this.url = reader.result; 
		}
    
	}
  showProducts(id : any){
    let resp = this.shopifyService.getProductList(this.warehouseId,id);
    resp.subscribe((data)=>{
      this.productList = data
    })
    
  }
  addClientDetails(){
    this.client.warehouseId = this.warehouseId;
    if(this.selectedFile == null){
      this.selectedFile = this.image;
    }
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile);
    uploadImageData.append('product', JSON.stringify(this.client));
    let resp = this.service.addClient(uploadImageData);
    resp.subscribe((data) =>{
      alert("Client Added")
    })
    this.closeClientForm();

  }
}
