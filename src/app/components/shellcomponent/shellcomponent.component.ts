import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver,BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-shellcomponent',
  templateUrl: './shellcomponent.component.html',
  styleUrls: ['./shellcomponent.component.css']
})
export class ShellcomponentComponent implements AfterViewInit {
  @ViewChild('sideNav') sidenav : any; 
  constructor(private observer: BreakpointObserver) { 

  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res: { matches: any; }) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

}
