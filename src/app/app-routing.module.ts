import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ClientComponent } from './components/client/client.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'; 
import { DeliveryChallansComponent } from './components/delivery-challans/delivery-challans.component';
import { InboundComponent } from './components/inbound/inbound.component'; 
import { InvoicesComponent } from './components/invoices/invoices.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderpickupComponent } from './components/orderpickup/orderpickup.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PackagesComponent } from './components/packages/packages.component';
import { ScanbarcodeComponent } from './components/scanbarcode/scanbarcode.component';
import { ShellcomponentComponent } from './components/shellcomponent/shellcomponent.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { AuthGaurdService } from './service/auth-gaurd.service';

const routes: Routes = [
  {path: 'login',component:LoginComponent}, 
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGaurdService] },
  {
    path: '', 
    component:ShellcomponentComponent, canActivate:[AuthGaurdService] , 
    children: [
        { path:'dashboard', component: DashboardComponent},
        {path: 'inbound', component: InboundComponent},
        {path: 'dashboard', component: DashboardComponent},
        {path:'scanbarcode', component: ScanbarcodeComponent},
        {path: 'packages',component: PackagesComponent},
        {path: 'orders', component: OrdersComponent},
        {path: 'orderlist', component:OrderListComponent},
        {path: 'order-pickup', component:OrderpickupComponent},
        {path: 'clientele' , component:ClientComponent},
        {path: 'addUser', component: AddUserComponent},
        {path: 'warehouse', component: WarehouseComponent},
        {path: 'invoices', component: InvoicesComponent},
        {path: 'delivery-challan', component: DeliveryChallansComponent}
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
