import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../auth/auth.guard';
import { ViewCustomerComponent } from './viewCustomer.component';
import { AddorderComponent } from './order/addorder.component';
import { VieworderComponent } from './vieworder.component';
import { ViewManufacturerComponent } from './view-manufacturer.component';
import { ViewPendingOrderComponent } from './viewpendingorder.component';
import { ViewCompletedOrderComponent } from './viewcompletedorder.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'viewCustomer',
    component: ViewCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'viewManufacturer',
    component: ViewManufacturerComponent,
    canActivate: [AuthGuard],
  },
  { path: 'addOrder', component: AddorderComponent, canActivate: [AuthGuard] },
  {
    path: 'viewOrder',
    component: VieworderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pendingOrders',
    component: ViewPendingOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'completedOrders',
    component: ViewCompletedOrderComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
