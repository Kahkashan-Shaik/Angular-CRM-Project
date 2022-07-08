import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-addorder',
 templateUrl:'../order/addorder.component.html',
 styleUrls:['../order/addorder.component.css']
})
export class AddorderComponent implements OnInit {
  orderForm: FormGroup;
  customerForm: FormGroup;
  manufacturerForm: FormGroup;
  error:{};
  pageTitle:any;
  customerList:any=[];
  manufacturerList:any=[]; 
  ordertypesList:any=[];
  file:any;
  constructor(private fb: FormBuilder,private router: Router, private srvcobj: AdminServiceService, private route: ActivatedRoute) { }
  



  ngOnInit(): void {
      this.pageTitle = "Add";
      this.get_all_manufacturer();
      this.get_all_customer();
      this.get_all_ordertypes();
    
    

    // Order Form Validations
    this.orderForm = this.fb.group({
      id: [''],
      order_date: ['', Validators.required],
      date_delivered_to_cust: [''],
      date_delivery_to_cust: ['', Validators.required],
      cust_id: ['', Validators.required],
      manufac_id: ['', Validators.required],
      date_delivery_from_manufac: [''],
      date_delivered_from_manufac: [''],
      order_status_id: ['', Validators.required],
      order_desc: [''],
      order_img: ['']
    });
    // Form Validation of Add Customer
    this.customerForm = this.fb.group({
      id: [''],
      cust_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      cust_phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      cust_desc: ['']
    });
    // Create Manufacturer Form Validations
    this.manufacturerForm = this.fb.group({
      id: [''],
      manufac_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      manufac_phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      manufac_desc: ['']
    });
  }

  // Handeling File Upload event
  onSelectedFile(event:any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      // console.log(this.file.name);
      this.orderForm.get('order_img')?.setValue(this.file);
    }
  }
   // Get All Manufacturers
   get_all_manufacturer() {
    this.srvcobj.getManufacturers().subscribe((res: any) => {
        this.manufacturerList = res;
    });
   }
     // Get all customer list
   get_all_customer() {
    this.srvcobj.getCustomers().subscribe((res: any) => {
        this.customerList = res;
    });
  }
  // Get all Order Status List
  get_all_ordertypes(){
    this.srvcobj.getAllOrderTypes().subscribe((res:any) => {
      this.ordertypesList = res;
    });
  }


  // Form Submit Code
  onSubmit(){
     // Order form data   
    //  console.log(this.orderForm.value);    
     const orderFormData = {
    } 
    const formdata = new FormData();
      formdata.append('id', this.orderForm.get('id')?.value);
      formdata.append('order_date', this.orderForm.get('order_date')?.value);
      formdata.append('date_delivered_to_cust', this.orderForm.get('date_delivered_to_cust')?.value)
      formdata.append('date_delivery_to_cust', this.orderForm.get('date_delivery_to_cust')?.value);
      formdata.append('cust_id', this.orderForm.get('cust_id')?.value)
      formdata.append('manufac_id', this.orderForm.get('manufac_id')?.value)
      formdata.append('date_delivery_from_manufac', this.orderForm.get('date_delivery_from_manufac')?.value)
      formdata.append('date_delivered_from_manufac', this.orderForm.get('date_delivered_from_manufac')?.value)
      formdata.append('order_status_id', this.orderForm.get('order_status_id')?.value)
      formdata.append('order_desc', this.orderForm.get('order_desc')?.value)
      formdata.append('order_img', this.orderForm.get('order_img')?.value)
     
    
     // Create Order 
     this.srvcobj.createOrder(formdata).subscribe((res: any) => {
      if (res === 'error' || res.status != 'DJ200') {
          this.srvcobj.showFailureMessage(res.data, 'Failure');
      } else {
        console.log(res);
          this.srvcobj.showSuccessMessage(res.data, 'Successfully');
          setTimeout(() => {
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              // this.router.navigate(['/viewOrder']);
          }, 1000)
      }
  });
    
  }

  addCustomer(){
    // Customer form data
    const customerdata = {
      id: this.customerForm.get('id')?.value,
      cust_name: this.customerForm.get('cust_name')?.value,
      cust_phone: this.customerForm.get('cust_phone')?.value,
      cust_desc: this.customerForm.get('cust_desc')?.value,
      status: 1,
    }
     // Create Customer 
     this.srvcobj.createCustomer(customerdata).subscribe((res: any) => {
      if (res === 'error' || res.status != 'DJ200') {
          this.srvcobj.showFailureMessage(res.data, 'Failure');
      } else {
          this.srvcobj.showSuccessMessage(res.data, 'Successfully');
          this.get_all_customer();
          this.customerForm.reset();
          this.close_customer_modal();
        }
      });
    }

    addManufacturer(){
      const manufacdata = {
        id: this.manufacturerForm.get('id')?.value,
        manufac_name: this.manufacturerForm.get('manufac_name')?.value,
        manufac_phone: this.manufacturerForm.get('manufac_phone')?.value,
        manufac_desc: this.manufacturerForm.get('manufac_desc')?.value,
        status: 1,
      }
      // Create New Manufacturer
      this.srvcobj.createManufacturer(manufacdata).subscribe((res: any) => {
        if (res === 'error' || res.status != 'DJ200') {
            this.srvcobj.showFailureMessage(res.data, 'Failure');
        } else {
            this.srvcobj.showSuccessMessage(res.data, 'Successfully');
            this.get_all_manufacturer();
            this.manufacturerForm.reset();
            this.close_manufacturer_modal();
        }
    });
    }

    // Modal Click Actions
      // reset Customer Modal Fields
    add_customer(){
      this.customerForm.reset();
    }
     // reset Manufacturer Modal Fields
    add_manfacturer(){
      this.manufacturerForm.reset();
    }

    @ViewChild('closebutton') closebutton;
       public close_customer_modal() {
       this.closebutton.nativeElement.click();
    }
    @ViewChild('closebutton1') closebutton1;
       public close_manufacturer_modal() {
       this.closebutton1.nativeElement.click();
    }

    select2(event){
      console.log(1)
      console.log(<HTMLInputElement>event.target.value);
    }

}
