import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class RegisterationService {

  constructor(private http : HttpClient) { }
 

  connectShopify(){
    return this.http.get('http://localhost:9058/getClientDetails')
  }
}
