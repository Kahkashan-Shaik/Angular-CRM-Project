import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { AdminServiceService } from './admin-service.service';
import { Subject } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import * as $ from "jquery";
import { ImageModalPopUp } from './imagemodalpopup.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-vieworder',
  template: `<app-nav></app-nav>
  <app-aside></app-aside>
      <div class="content-wrapper mb-5">
          <section class="content-header">
              <div class="container-fluid">
                  <div class="row mb-2">
                      <div class="col-sm-6">
                          <h1>All Order Detailes Report</h1>
                      </div>
                      <div class="col-sm-6">
                          <ol class="breadcrumb float-sm-right">
                              <li class="breadcrumb-item"><a href="#">Home</a></li>
                              <li class="breadcrumb-item active">All Order Detailes Report</li>
                          </ol>
                      </div>
                  </div>
              </div>
          </section>
          
          <section class="content">
              <div class="container-fluid">
                  <div class="row">
                      <div class="col-12">
                          <div class="card">
                              <div class="card-header">
                                  <div class="row">
                                      <div class="col-lg-6 col-md-6 col-sm-12">
                                            <h3 class="card-title">All Order Detailes Report</h3>
                                      </div>
                                      <div class="col-lg-6 col-md-6 col-sm-12">
                                            <a routerLink="/addOrder" class="btn btn-danger float-right"><i class="fas fa-plus mr-3"></i>Add Order</a>
                                      </div>
                                  </div>
                                  <div class="row mt-4">
                                        <div class="col-lg-4 col-md-4 col-sm-6">
                                           <div class="form-group">
                                                <select class="form-control text-xs  col-sm-9"  id="cust_id" (change)="filterbycust($event)">
                                                    <option value="">---Select Customer Name---</option>
                                                    <option *ngFor="let cdata of ListallCustomers" [value]="cdata.id" > 
                                                        {{ cdata.cust_name }}
                                                    </option>
                                                </select>
                                           </div> 
                                      </div>
                                      <div class="col-lg-3 col-md-3 col-sm-6">
                                          <div class="form-group">
                                                <select class="form-control text-xs  col-sm-9"  id="manufac_id" (change)="filterbymanufac($event)">
                                                    <option value="">---Select Manufacturer Name---</option>
                                                    <option *ngFor="let manufacdata of ListallManufacturers" [value]="manufacdata.id" > 
                                                        {{ manufacdata.manufac_name }}
                                                    </option>
                                                </select>
                                           </div>
                                      </div>
                                      <div class="col-lg-3 col-md-3 col-sm-12">
                                      <div class="form-group">
                                                <select class="form-control text-xs  col-sm-9"  id="status_id" (change)="filterbystatus($event)">
                                                    <option value="">---Select Status Name---</option>
                                                    <option *ngFor="let statusdata of Listallstatus" [value]="statusdata.id" > 
                                                        {{ statusdata.order_type }}
                                                    </option>
                                                </select>
                                           </div>
                                      </div>
                                      <div class="col-lg-2 col-md-2 col-sm-2">
                                         <div class="form-group">
                                            <button class="btn btn-danger btn-border btn-sm" (click)="clearFilters()"><i class="fas fa-filter"></i>Clear Filter</button> 
                                        </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="card-body">
                                  <div class="row">
                                      <div class="col-12">
                                          <div class="table-responsive">
                                              <table datatable [dtOptions]="dtOptions" [dtTrigger]="dtTrigger"  class="table table-bordered table-sm  nowrap  text-center text-sm" >
                                                  <thead>
                                                      <tr>
                                                          <th>SL.No</th>
                                                          <th>Order Image</th>
                                                          <th>Order Date</th>
                                                          <th>Customer</th>
                                                          <th>Manufacturer</th>
                                                          <th>Delivery Date From Manufacturer</th>
                                                          <th>Delivery Date To Customer</th>
                                                          <th>Delevered To Customer</th>
                                                          <th>Description</th>
                                                          <th>Status</th>
                                                          <th>Action</th>
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                   
                                                    <tr *ngFor="let odata of this.listallOrders; let i=index">
                                                        <td>{{ i+1 }}</td>  
                                                        <td><span id="imageModal" (click)="imageModalOpen1(odata.order_img)"  data-toggle="modal" data-target="#myModal" ><img src="{{ this.UplaodedImageUrl }}{{odata.order_img }}" height="50px" width="50px" ></span></td>
                                                        <td>{{ odata.order_date }}</td>  
                                                        <td>{{ odata.cust_name }}</td> 
                                                        <td>{{ odata.manufac_name }}</td>
                                                        <td>{{ odata.date_delivery_from_manufac }}</td> 
                                                        <td>{{ odata.date_delivery_to_cust }}</td> 
                                                        <td>{{ odata.date_delivered_to_cust }}</td> 
                                                        <td>{{ odata.order_desc }}</td> 
                                                        <td><span class="badge badge-{{ this.orderstatuscolors[odata.order_status_id] }} text-sm">{{ odata.order_status_name }}</span></td> 
                                                        <td>
                                                                <a class="badge badge-success mr-2" (click)="updateOrder(odata.id)" data-toggle="modal" data-target="#myModal" style="cursor: pointer;"><i class="fas fa-edit text-white"></i></a>        
                                                                <a class="badge badge-danger" (click)="deleteOrder(odata.id)" style="cursor:pointer"><i class="fas fa-trash text-white"></i></a>
                                                        </td>
                                                    </tr>
                                                  </tbody>
                                                  </table>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
              <!-- <app-imagemodalpopup></app-imagemodalpopup> -->
              <div class="modal fade" id="myModal" role="dialog">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="text-left"> Image Preview</h5>
                          <button type="button" #closebutton class="close float-right" data-dismiss="modal">&times;</button>
                      </div>
                      <div class="modal-body text-center">
                          <img src="{{ this.defaultImagePath }}" height="400px" width="400px">
                          
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-danger" id="closeModal"  (click)="close()">Close</button>
                      </div> 
                  </div>
             </div>
            </div>
          </div>
      <app-footer></app-footer>`,
  styles: [` `]
})
export class VieworderComponent extends ImageModalPopUp implements OnDestroy, OnInit {
  listallOrders:any=[];
  ListallCustomers:any=[];
  ListallManufacturers:any=[];
  Listallstatus:any=[];
  cust_id:any; 
  manufac_id:any;
  status_id:any;
  UplaodedImageUrl:any;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  orderstatuscolors = {
      "1": "danger",
      "2": "success",
      "3": "warning",
      "4": "info"
  }
  constructor(private srvcobj: AdminServiceService, public route: ActivatedRoute, private router: AdminRoutingModule ) { 
      super();
  }
    
  ngOnInit(): void {
    this.UplaodedImageUrl = environment.UplaodedImageUrl;
    this.getTotalOders();

    this.srvcobj.getCustomers().subscribe((res:any)=>{
        this.ListallCustomers = res;
    });
    this.srvcobj.getManufacturers().subscribe((res:any)=>{
        this.ListallManufacturers = res;
    });
    this.srvcobj.getAllOrderTypes().subscribe((res:any)=>{
        this.Listallstatus = res;
    });

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
  
  getTotalOders(){
     // get all orders list data
     this.srvcobj.getTotalOrders().subscribe((res:any)=>{
        this.listallOrders = res;
        this.dtTrigger.next(res);
     });
  }
  updateOrder(order_id:number){

  }
  deleteOrder(order_id:number){
    this.srvcobj.deleteOrderById(order_id).subscribe((res: any) => {
        if (res.status == 'DJ200')
            this.srvcobj.showSuccessMessage(res.data, 'Deleted User!');
        else
            this.srvcobj.showFailureMessage(res.data, 'Failure!')
            this.getTotalOders();
      });
  }
  filterbycust(event){
     this.cust_id = (<HTMLInputElement>event.target).value;
     this.srvcobj.fetchOrdersByCustId(this.cust_id).subscribe((res:any)=>{
        if(res.status == 'DJ200'){
            this.listallOrders = res.data;
            this.dtTrigger.next(this.listallOrders);
        }else{
            this.srvcobj.showFailureMessage(res.data, 'Alert!');
            this.getTotalOders();
        }
     })
  }

  filterbymanufac(event){
    this.manufac_id = (<HTMLInputElement>event.target).value;
    this.srvcobj.fetchOrdersByManufacId(this.manufac_id).subscribe((res:any)=>{
       if(res.status == 'DJ200'){
           this.listallOrders = res.data;
           this.dtTrigger.next(this.listallOrders);
       }else{
           this.srvcobj.showFailureMessage(res.data, 'Alert!');
           this.getTotalOders();
       }
    })
 }

 filterbystatus(event){
    this.status_id = (<HTMLInputElement>event.target).value;
    this.srvcobj.fetchOrdersByStatusId(this.status_id).subscribe((res:any)=>{
       if(res.status == 'DJ200'){
           this.listallOrders = res.data;
           this.dtTrigger.next(this.listallOrders);
       }else{
           this.srvcobj.showFailureMessage(res.data, 'Alert!');
           this.getTotalOders();
       }
    })
 }
  
 clearFilters(){
    $('#cust_id, #manufac_id, #status_id').val('');
    this.getTotalOders();
 }
  
}
