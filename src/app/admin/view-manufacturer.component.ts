import { Component,OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdminServiceService } from './admin-service.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-manufacturer',
  template: `<app-nav></app-nav>
  <app-aside></app-aside>
    <div class="content-wrapper mb-5">
    <section class="content-header">
          <div class="container-fluid">
             <div class="row mb-2">
                <div class="col-sm-6">
                   <h1>View Manufacturer</h1>
                </div>
                <div class="col-sm-6">
                   <ol class="breadcrumb float-sm-right">
                      <li class="breadcrumb-item"><a href="#">Home</a></li>
                      <li class="breadcrumb-item active">View Manufacturer</li>
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
                               <h3 class="card-title">Manufacturer List</h3>
                            </div>
                            <div class="col-md-6">
                               <button  class="btn btn-danger float-right" data-toggle="modal" data-target="#myModal" (click)="addManufacturer()" ><i class="fas fa-plus mr-2"></i>Add Manufacturer</button>
                            </div>
                         </div>
                      </div>
                      <div class="card-body">
                         <div class="row">
                            <div class="col-12">
                               <div class="table-responsive">
                                  <table datatable [dtOptions]="dtOptions" [dtTrigger]="dtTrigger" id="ManufacturerTable" class="table table-bordered table-sm table-hover text-center text-sm" >
                                  <thead>
                                     <tr>
                                        <th>SL.No</th>
                                        <th>Manufacturer</th>
                                        <th>Phone No.</th>
                                        <th>Desc</th>
                                        <th> Action </th>
                                     </tr>
                                  </thead>
                                  <tbody>
                                     <tr *ngFor="let mdata of this.manufacturerList; let i=index">
                                        <td>{{ i+1 }}</td>
                                        <td>{{ mdata.manufac_name }}</td>
                                        <td>{{ mdata.manufac_phone }}</td>
                                        <td>{{ mdata.manufac_desc }}</td>
                                        <td>
                                           <a class="badge badge-success mr-2" (click)="updateManufacturer(mdata.id)" data-toggle="modal" data-target="#myModal" style="cursor: pointer;"><i class="fas fa-edit text-white"></i></a>        
                                           <a class="badge badge-danger" (click)="deleteManufacturer(mdata.id)" style="cursor:pointer"><i class="fas fa-trash text-white"></i></a>
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
       <!-- Modal For Adding New Manufacturer -->
       <div class="modal fade" id="myModal" role="dialog">
          <div class="modal-dialog modal-lg">
             <div class="modal-content">
                <div class="modal-header">
                   <h5 class="text-left">{{pageTitle}} Manufacturer</h5>
                </div>
                <form class="form-horizontal" [formGroup]="manufacturerForm" (ngSubmit)="onSubmit()" id="createCustomer">
                <input type="hidden" formControlName="id">
                <div class="modal-body text-center">
                   <div class="row">
                      <div class="col-md-6">
                         <div class="form-group row">
                            <label for="inputforname" class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                               <input type="text" class="form-control"  id="inputforname" placeholder="Manufacturer Name" formControlName="manufac_name">
                            </div>
                         </div>
                      </div>
                      <div class="col-md-6">
                         <div class="form-group row">
                            <label for="inputforphone" class="col-sm-2 col-form-label">Contact</label>
                            <div class="col-sm-10">
                             <input type="text"  class="form-control" id="inputforphone" placeholder="Enter Phone Number" formControlName="manufac_phone">
                            </div>
                         </div>
                      </div>
                   </div>
                   <div class="row">
                      <div class="col-md-12">
                         <div class="form-group row">
                            <label for="inputofraddress" class="col-sm-1 col-form-label">Desc</label>
                            <div class="col-sm-11">
                               <textarea class="form-control"  name="address" id="inputofraddress" placeholder="Enter Manufacturer Address" formControlName="manufac_desc">  </textarea>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
                <div class="modal-footer">
                   <button type="submit" class="btn btn-info" >{{pageTitle}} Manufacturer</button>
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
export class ViewManufacturerComponent implements  OnInit,OnDestroy {
  manufacturerForm: FormGroup;
  submited = false;
  error: {};
  pageTitle: string = 'Add';

  manufacturerList: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject < any > = new Subject < any > ();

  constructor(private fb: FormBuilder,private srvcobj:AdminServiceService, private router: Router) { }

  ngOnInit(): void {
        this.get_all_manufacturer();
        // datatable option initialization
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true
        };
        // Create Manufacturer Form Validations
        this.manufacturerForm = this.fb.group({
          id: [''],
          manufac_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          manufac_phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
          manufac_desc: ['']
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
 

  // OnClick Actions
  addManufacturer(){
      this.pageTitle = 'Add';
      this.manufacturerForm.reset()
  }
  // Update Manufactuere
  updateManufacturer(id:number){
    if(id){
      this.pageTitle = 'Edit';  
      this.srvcobj.getManufacturerById(id).subscribe((res:any)=>{
         this.manufacturerForm.patchValue({
            id: res.data.id,
            manufac_name: res.data.manufac_name,
            manufac_phone: res.data.manufac_phone,
            manufac_desc: res.data.manufac_desc
         });
      });
     }
  }
  // Delete Manufacturer
  deleteManufacturer(id:number){
    this.srvcobj.deleteManufacturerById(id).subscribe((res: any) => {
      if (res.status == 'DJ200')
          this.srvcobj.showSuccessMessage(res.data, 'Deleted User!');
      else
          this.srvcobj.showFailureMessage(res.data, 'Failure!')
      this.get_all_manufacturer();
    });
  }
  // Get All Manufacturers
  get_all_manufacturer() {
    this.srvcobj.getManufacturers().subscribe((res: any) => {
        this.manufacturerList = res;
        this.dtTrigger.next(res);
    });
  }

  // Manufacturer Create and Edit Actions

  onSubmit() {
    // Manufacturer form data
      const manufacdata = {
        id: this.manufacturerForm.get('id')?.value,
        manufac_name: this.manufacturerForm.get('manufac_name')?.value,
        manufac_phone: this.manufacturerForm.get('manufac_phone')?.value,
        manufac_desc: this.manufacturerForm.get('manufac_desc')?.value,
        status: 1,
      }
      // Update Customer
      const id = this.manufacturerForm.get('id')?.value;
      if (id) {
        this.srvcobj.updateManufacturerById(manufacdata, +id).subscribe((res: any) => {
            if (res === 'error' || res.status != 'DJ200') {
                this.srvcobj.showFailureMessage(res.data, 'Failure');
            } else {
                this.srvcobj.showSuccessMessage(res.data, 'Successfully');
                setTimeout(() => {
                    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                    this.router.navigate(['/viewManufacturer']);
                    this.get_all_manufacturer();
                }, 1000)
                this.manufacturerForm.reset();
                this.close();
            }
        });
      } else {
        // Create Customer 
        this.srvcobj.createManufacturer(manufacdata).subscribe((res: any) => {
            if (res === 'error' || res.status != 'DJ200') {
                this.srvcobj.showFailureMessage(res.data, 'Failure');
            } else {
                this.srvcobj.showSuccessMessage(res.data, 'Successfully');
                setTimeout(() => {
                    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                    this.router.navigate(['/viewManufacturer']);
                    this.get_all_manufacturer();
                }, 1000)
                this.manufacturerForm.reset();
                this.close();
            }
        });
      }
      }

}
