import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';
import { Subject } from "rxjs";
import { ImageModalPopUp } from "../imagemodalpopup.component";
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends ImageModalPopUp implements OnInit,OnDestroy {
  TotalCustomersCount: any;
  TotalManufacturerCount:any;
  TotalPendingOrderCount:any;
  TotalCompeltdOrderCount:any;

  UplaodedImageUrl: any;
  pendingOrderList:any = [];
  completedOrderList:any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  constructor(private srvcobj: AdminServiceService,public route: ActivatedRoute) { super();}

  ngOnInit(): void {
    this.UplaodedImageUrl = environment.UplaodedImageUrl;
    this.fetchdashbaordcount();
    this.fetchPendingOrders();
    this.fetchCompletedOrders();
     // datatanle option initialization
     this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      processing: true
      };
  }
  ngOnDestroy(): void {
    
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  fetchdashbaordcount(){
    this.srvcobj.fetchDashboardCount().subscribe((res:any)=>{
     this.TotalCustomersCount = res.totalcustomers;
     this.TotalManufacturerCount = res.totalmanufacturers;
     this.TotalPendingOrderCount = res.totalpendingorders;
     this.TotalCompeltdOrderCount = res.totalcompletedorders;
    });
  }
   // Fetch All Pending Orders
   fetchPendingOrders(){
    this.srvcobj.fetchPendingOrders().subscribe((res:any)=>{
      this.pendingOrderList = res;
      this.dtTrigger.next(res);
    });
  }
  // Fetch All Pending Orders
  fetchCompletedOrders(){
    this.srvcobj.fetchCompletedOrders().subscribe((res:any)=>{
            this.completedOrderList = res;
            this.dtTrigger.next(res);
    });
  }

}
