import { Component,OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminServiceService } from "./admin-service.service";
import { Subject } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as $ from 'jquery';
@Component({
    selector: 'app-viewcustomer',
    template: `<app-nav></app-nav>
    <app-aside></app-aside>
    <div class="content-wrapper mb-5">
       <section class="content-header">
          <div class="container-fluid">
             <div class="row mb-2">
                <div class="col-sm-6">
                   <h1>View Customer</h1>
                </div>
                <div class="col-sm-6">
                   <ol class="breadcrumb float-sm-right">
                      <li class="breadcrumb-item"><a href="#">Home</a></li>
                      <li class="breadcrumb-item active">View Customer</li>
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
                            <div class="col-md-6">
                               <h3 class="card-title">Customer List</h3>
                            </div>
                            <div class="col-md-6">
                               <button  class="btn btn-danger float-right" data-toggle="modal" data-target="#myModal" (click)="addCustomer()" ><i class="fas fa-plus mr-2"></i>Add Customer</button>
                            </div>
                         </div>
                      </div>
                      <div class="card-body">
                         <div class="row">
                            <div class="col-12">
                               <div class="table-responsive">
                                  <table datatable [dtOptions]="dtOptions" [dtTrigger]="dtTrigger" id="CustomerTable" class="table table-bordered table-sm table-hover text-center text-sm" >
                                  <thead>
                                     <tr>
                                        <th>SL.No</th>
                                        <th>Customer</th>
                                        <th>Phone No.</th>
                                        <th>Desc</th>
                                        <th> Action </th>
                                     </tr>
                                  </thead>
                                  <tbody>
                                     <tr *ngFor="let cdata of this.customerList; let i=index">
                                        <td>{{ i+1 }}</td>
                                        <td>{{ cdata.cust_name }}</td>
                                        <td>{{ cdata.cust_phone }}</td>
                                        <td>{{ cdata.cust_desc }}</td>
                                        <td>
                                           <a class="badge badge-success mr-2" (click)="updateCustomer(cdata.id)" data-toggle="modal" data-target="#myModal" style="cursor: pointer;"><i class="fas fa-edit text-white"></i></a>        
                                           <a class="badge badge-danger" (click)="deleteCustomer(cdata.id)" style="cursor:pointer"><i class="fas fa-trash text-white"></i></a>
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
       <!-- Modal Fo Adding New Customer -->
       <div class="modal fade" id="myModal" role="dialog">
          <div class="modal-dialog modal-lg">
             <div class="modal-content">
                <div class="modal-header">
                   <h5 class="text-left">{{pageTitle}} Customer</h5>
                </div>
                <form class="form-horizontal" [formGroup]="customerForm" (ngSubmit)="onSubmit()" id="createCustomer">
                <input type="hidden" formControlName="id">
                <div class="modal-body text-center">
                   <div class="row">
                      <div class="col-md-6">
                         <div class="form-group row">
                            <label for="inputforname" class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                               <input type="text" class="form-control"  id="inputforname" placeholder="Customer Name" formControlName="cust_name">
                            </div>
                         </div>
                      </div>
                      <div class="col-md-6">
                         <div class="form-group row">
                            <label for="inputforphone" class="col-sm-2 col-form-label">Contact</label>
                            <div class="col-sm-10">
                             <input type="text"  class="form-control" id="inputforphone" placeholder="Enter Phone Number" formControlName="cust_phone">
                            </div>
                         </div>
                      </div>
                   </div>
                   <div class="row">
                      <div class="col-md-12">
                         <div class="form-group row">
                            <label for="inputofraddress" class="col-sm-1 col-form-label">Desc</label>
                            <div class="col-sm-11">
                               <textarea class="form-control"  name="address" id="inputofraddress" placeholder="Enter Customer Address" formControlName="cust_desc">  </textarea>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
                <div class="modal-footer">
                   <button type="submit" class="btn btn-info" >{{pageTitle}} Customer</button>
                   <a  #closebutton  data-dismiss="modal" class="btn btn-default float-right">Cancel</a>
                </div>
                </form>
             </div>
          </div>
       </div>
       <!-- End Here -->
    </div>
    <app-footer></app-footer>`,
    styles: [``]
})
export class ViewCustomerComponent implements OnDestroy, OnInit {

   customerForm: FormGroup;
   submited = false;
   error: {};
   pageTitle: string = 'Add';

   customerList: any = [];
   dtOptions: DataTables.Settings = {};
   dtTrigger: Subject < any > = new Subject < any > ();

   constructor(private fb: FormBuilder, private srvcobj: AdminServiceService, private router: Router, private route: ActivatedRoute) {}

   // Delete Customer By Id
   deleteCustomer(id: number) {
       this.srvcobj.deleteCustomerById(id).subscribe((res: any) => {
           if (res.status == 'DJ200')
               this.srvcobj.showSuccessMessage(res.message, 'Deleted User!');
           else
               this.srvcobj.showFailureMessage('Could not able to delete try again letter', 'Failure!')
           this.get_all_customer();
       })
   }
   // Update Customer By Id
   updateCustomer(id: number){
     if(id){
      this.pageTitle = 'Edit';  
      this.srvcobj.getCustomerById(id).subscribe((res:any)=>{
         this.customerForm.patchValue({
            id: res.data.id,
            cust_name: res.data.cust_name,
            cust_phone: res.data.cust_phone,
            cust_desc: res.data.cust_desc
         });
      });
     }
   }
   // add Customer
   addCustomer(){
      this.pageTitle = 'Add';
      this.customerForm.reset();
   }

   // Create Customer
   onSubmit() {
       this.submited = true;
       // Customer form data
       const customerdata = {
           id: this.customerForm.get('id')?.value,
           cust_name: this.customerForm.get('cust_name')?.value,
           cust_phone: this.customerForm.get('cust_phone')?.value,
           cust_desc: this.customerForm.get('cust_desc')?.value,
           status: 1,
       }
       // Update Customer
       const id = this.customerForm.get('id')?.value;
       if(id){
         this.srvcobj.updateCustomerById(customerdata, +id).subscribe((res: any) => {
            if (res === 'error' || res.status != 'DJ200') {
                this.srvcobj.showFailureMessage(res.data, 'Failure');
            } else {
                this.srvcobj.showSuccessMessage(res.data, 'Successfully');
                setTimeout(() => {
                    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                    this.router.navigate(['/viewCustomer']);
                    this.get_all_customer();
                }, 1000)
                this.customerForm.reset();
                this.close();
            }
        });
       }
       else{
          // Create Customer 
       this.srvcobj.createCustomer(customerdata).subscribe((res: any) => {
         if (res === 'error' || res.status != 'DJ200') {
             this.srvcobj.showFailureMessage(res.data, 'Failure');
         } else {
             this.srvcobj.showSuccessMessage(res.data, 'Successfully');
             setTimeout(() => {
                 this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                 this.router.navigate(['/viewCustomer']);
                 this.get_all_customer();
             }, 1000)
             this.customerForm.reset();
             this.close();
         }
     });
       }

   }

   ngOnInit(): void {
       this.get_all_customer();
       // datatable option initialization
       this.dtOptions = {
           pagingType: 'full_numbers',
           pageLength: 10,
           processing: true
       };
       // Create Customer Form Validations
       this.customerForm = this.fb.group({
           id: [''],
           cust_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
           cust_phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
           cust_desc: ['']
       });
   }
   ngOnDestroy(): void {
       // Do not forget to unsubscribe the event
       this.dtTrigger.unsubscribe();
   }
   @ViewChild('closebutton') closebutton;
   public close() {
       this.closebutton.nativeElement.click();
   }
   get_all_customer() {
       // Get all customer list
       this.srvcobj.getCustomers().subscribe((res: any) => {
           this.customerList = res;
           this.dtTrigger.next(res);
       });
   }
}