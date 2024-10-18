import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { RegisterationService } from './registeration.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  product: any;
  user: any;
  
  constructor(private router : Router, private service:RegisterationService, private http : HttpClient) { }

  authenticate(emailId: string, password: string,warehouseId:string) {
    console.log(emailId);
    console.log(password);
    //return this.http.get("http://ehandler-env.eba-ieyumemq.us-east-2.elasticbeanstalk.com/login/"+emailId+"/"+password+"/"+warehouseId);
    return this.http.get("http://localhost:5011/login/"+emailId+"/"+password+"/"+warehouseId);
 
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }
  isUserAdmin(){
    let isAdmin = sessionStorage.getItem('isAdmin');
    return !(isAdmin === "false")
  }

  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('warehouseName');
  }
}
