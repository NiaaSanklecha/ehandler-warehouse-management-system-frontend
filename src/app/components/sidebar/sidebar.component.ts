import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  role : string = " ";
  showSubmenu: boolean = false;
  constructor(public loginService: AuthenticationService) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role')!;
    console.log("role",this.role)
  }

}
