import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { RegisterationService } from 'src/app/service/registeration.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  warehouseList:any = {};
  user : any = {};
  emailId = ''
  password = ''
  warehouseId = ''
  userRole = ''
  invalidLogin = false
  stringObject: any;
  recEmail : any;
  recPassword: any;
  constructor(private router : Router, private loginservice: AuthenticationService,private productService : ProductServiceService) { }

  ngOnInit(): void {
    let resp3 = this.productService.getWarehouseList();
    resp3.subscribe((data) =>{
      this.warehouseList = data
      console.log(this.warehouseList)
      console.log("type: "+ typeof this.warehouseList)
  }) 
  }
  login(){
    /* this.service.loginUserFromRemote(this.user).subscribe(
      data => this.router.navigateByUrl('/dashboard')
    ); */
    let resp = this.loginservice.authenticate(this.emailId,this.password,this.warehouseId);
    resp.subscribe(
      data=>{
        if(data != null){
          this.stringObject = data;
          this.user = JSON.parse(JSON.stringify(this.stringObject));
          console.log(this.user)
          this.recEmail = this.user.map((item: { emailId: any; }) => item.emailId) 
          console.log(this.recEmail);
          this.recPassword = this.user.map((item: { password: any; }) => item.password) 
          console.log(this.recPassword);
          sessionStorage.setItem('username', this.user.map((item: { userName: any; }) => item.userName) )
          sessionStorage.setItem('warehouseId', this.user.map((item: { warehouseId: any; }) => item.warehouseId))
          sessionStorage.setItem('userId', this.user.map((item: { userId: any; }) => item.userId))
          console.log(this.user.map((item: { role: any; }) => item.role));
          for (let role of this.user ) {
            this.userRole = role.role;
            sessionStorage.setItem('role', this.userRole)
       }
          
          this.router.navigate(['/dashboard'])
        this.invalidLogin = false
        }else{
          alert("Invalid User")
          this.invalidLogin = true
        }
        return true;
    });
    
        
    
    
  }
  

}
