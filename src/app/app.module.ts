import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { InboundComponent } from './components/inbound/inbound.component';
import { FormsModule } from '@angular/forms';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScanbarcodeComponent } from './components/scanbarcode/scanbarcode.component';
import { BarcodeGeneratorAllModule,QRCodeGeneratorAllModule,DataMatrixGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ShellcomponentComponent } from './components/shellcomponent/shellcomponent.component';
import { ScannerComponent } from './components/scanner/scanner.component';
import {NgxPrintModule} from 'ngx-print';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderpickupComponent } from './components/orderpickup/orderpickup.component';
import { ClientComponent } from './components/client/client.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { PackagesComponent } from './components/packages/packages.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { SquareBoxComponent } from './components/square-box/square-box.component';
import { AnimatedDigitComponent } from './components/animated-digit/animated-digit.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { DeliveryChallansComponent } from './components/delivery-challans/delivery-challans.component';
@NgModule({
  declarations: [
    AppComponent, 
    DashboardComponent,
    SidebarComponent,
    InboundComponent,
    ScanbarcodeComponent,
    LoginComponent,
    LogoutComponent,
    ShellcomponentComponent,
    PackagesComponent,
    ScannerComponent,
    OrdersComponent,
    OrderpickupComponent,
    ClientComponent,
    AddUserComponent,
    WarehouseComponent,
    OrderListComponent,
    SquareBoxComponent,
    AnimatedDigitComponent,
    InvoicesComponent,
    DeliveryChallansComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,NgxBarcodeModule, BarcodeGeneratorAllModule, QRCodeGeneratorAllModule,DataMatrixGeneratorAllModule,
    MatSidenavModule, MatToolbarModule, MatListModule, MatDividerModule,MatIconModule, MatMenuModule,
    ZXingScannerModule,NgxPrintModule,MatDatepickerModule,MatFormFieldModule,MatNativeDateModule,MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
