import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, HashLocationStrategy ,LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './nav/nav.component';
import { AsideComponent } from './aside/aside.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer.component';
import { ViewCustomerComponent } from './viewCustomer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AddorderComponent } from './order/addorder.component';
import { VieworderComponent } from './vieworder.component';
import { ToastrModule } from 'ngx-toastr';
import { ViewManufacturerComponent } from './view-manufacturer.component';
import { ViewPendingOrderComponent } from './viewpendingorder.component';
import { ViewCompletedOrderComponent } from './viewcompletedorder.component';
import { ImageModalPopUp } from './imagemodalpopup.component';

@NgModule({
  declarations: [
    NavComponent,
    AsideComponent,
    DashboardComponent,
    FooterComponent,
    ViewCustomerComponent,
    AddorderComponent,
    VieworderComponent,
    ViewManufacturerComponent,
    ViewPendingOrderComponent,
    ViewCompletedOrderComponent,
    ImageModalPopUp
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    ToastrModule.forRoot()
  
  ],
  providers: [
    // httpInterceptorProviders
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
})
export class AdminModule { }
