import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { Warehouse } from 'src/app/warehouse';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user : any = {};
  warehouseData :any;
  warehouseList:any = {};
  userList : any = {};
  userName :string = "";
  warehouseId : string = "";
  displayStyle = "none";

  constructor( private productService : ProductServiceService) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('username')!;
    this.warehouseId = sessionStorage.getItem('warehouseId')!;
    let resp3 = this.productService.getWarehouseList();
    resp3.subscribe((data) =>{
      this.warehouseList = data
      console.log(this.warehouseList)
      console.log("type: "+ typeof this.warehouseList)
  }) 
  let resp = this.productService.getEmployeeList();
  resp.subscribe((data) =>{
    this.userList = data
      console.log(this.userList)
  })
  }
  deleteUser(id:string){
    let resp = this.productService.deleteUser(id);
    resp.subscribe((data)=>{
      var a = data
    })
  }
  

  openUserForm(){
    this.displayStyle = "block";
  }
  closeClientForm(){
    this.displayStyle = "none";
  }
  addEmployee(){
    console.log(this.user)
    let resp = this.productService.addUser(this.user);
    resp.subscribe((data) =>{
      this.displayStyle = "none";
      alert("Employee added")
    })
  }

}
