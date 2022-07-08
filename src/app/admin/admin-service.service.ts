import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer } from '../models/customer-models/customer';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  
  baseUrl = environment.ApiUrl;
  constructor(private http:HttpClient, private toastr: ToastrService) { }

  // Create Customer
  createCustomer(cdata:any = []){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    headers.append('GET', 'POST');
    let options = {headers: headers};
      return this.http.post<any>(this.baseUrl+'addCustomer', cdata)
      .pipe(
        catchError(this.handleError)
      );
  }  
  // get all customer list
  getCustomers(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };
    return this.http.get<any>(this.baseUrl+'customer').pipe(map(
      (data:any) =>
        data.data || [] 
        ),
      catchError(this.handleError)
    );
  }
  // Get customer By Id
  getCustomerById(id:number){
    return this.http.get<any>(this.baseUrl+'customer_update/'+id+'/show').pipe(
      catchError(this.handleError)
    );
  }
  // Update Customer By Id
  updateCustomerById(cdata:any = [], id: number){
      return this.http.put<any>(this.baseUrl+'customer_update/'+id+'/update', cdata).pipe(
        catchError(this.handleError)
      );
  }
  // Delete Customer By Id
  deleteCustomerById(id:number){
    return this.http.delete(this.baseUrl+'customer_update/'+id+'/delete').pipe(
      catchError(this.handleError)
    )
  }

  // Create Manufacturer
  createManufacturer(cdata:any = []){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    headers.append('GET', 'POST');
    let options = {headers: headers};
      return this.http.post<any>(this.baseUrl+'addManufacturer', cdata)
      .pipe(
        catchError(this.handleError)
      );
  }
  // get all Manufacturer list
  getManufacturers(){
    return this.http.get<any>(this.baseUrl+'manufacturer').pipe(map(
      (data:any) =>
        data.data || [] 
        ),
      catchError(this.handleError)
    );
  }
  // Get customer By Id
  getManufacturerById(id:number){
    return this.http.get<any>(this.baseUrl+'manufacturer_update/'+id+'/show').pipe(
      catchError(this.handleError)
    );
  }
  // Update Customer By Id
  updateManufacturerById(cdata:any = [], id: number){
      return this.http.put<any>(this.baseUrl+'manufacturer_update/'+id+'/update', cdata).pipe(
        catchError(this.handleError)
      );
  }
  // Delete Customer By Id
  deleteManufacturerById(id:number){
    return this.http.delete(this.baseUrl+'manufacturer_update/'+id+'/delete').pipe(
      catchError(this.handleError)
    )
  } 

  // order API Functions for dashboard Count


  // Get all order types 
  getAllOrderTypes(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };
    return this.http.get<any>(this.baseUrl+'ordertypes').pipe(map(
      (data:any) =>
        data.data || [] 
        ),
      catchError(this.handleError)
    );
  }
  // Create New Order
  createOrder(cdata){
   
    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    // headers.append('GET', 'POST');
    // let options = {headers: headers};
      return this.http.post<any>(this.baseUrl+'addOrder', cdata)
      .pipe(
        catchError(this.handleError)
      );
  }

   // Total Overall orders
   getTotalOrders(){
    return this.http.get<any>(this.baseUrl+'orders').pipe(map(
      (data:any) =>
        data.data || [] 
        ),
      catchError(this.handleError)
    );
   }
   // Delete Order  By Id
  deleteOrderById(id:number){
    return this.http.delete(this.baseUrl+'order_delete/'+id).pipe(
      catchError(this.handleError)
    )
  }
  
   // Total Pending orders
   fetchPendingOrders(){
    return this.http.get<any>(this.baseUrl+'pendingorders').pipe(map(
      (data:any) =>
        data.data || [] 
        ),
      catchError(this.handleError)
    );
   }
   // Total Pending orders
   fetchCompletedOrders(){
    return this.http.get<any>(this.baseUrl+'completedorders').pipe(map(
      (data:any) =>
        data.data || [] 
        ),
      catchError(this.handleError)
    );
   }
  //  Fetch Dashboard Count
  fetchDashboardCount(){
    return this.http.get<any>(this.baseUrl+'dashbaordcount').pipe(map(
      (data:any) =>
      data.data || []
    ),
      catchError(this.handleError)
    )
  }

  // Filtes
  fetchOrdersByCustId(id){
    return this.http.get<any>(this.baseUrl+'ordersbycustid/'+id).pipe(map(
      (data:any) =>
        data || [] 
        ),
      catchError(this.handleError)
    );
  }
  fetchOrdersByManufacId(id){
    return this.http.get<any>(this.baseUrl+'ordersbymanufacid/'+id).pipe(map(
      (data:any) =>
        data || [] 
        ),
      catchError(this.handleError)
    );
  }
  fetchOrdersByStatusId(id){
    return this.http.get<any>(this.baseUrl+'ordersbystatusid/'+id).pipe(map(
      (data:any) =>
        data || [] 
        ),
      catchError(this.handleError)
    );
  }
  
  // Custom Error Alert Functions
    // Success Message
  showSuccessMessage(message, title){
    this.toastr.success(message, title);
  }
    // Error Message
  showFailureMessage(message, title){
    this.toastr.error(message, title);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    
    return throwError('Something bad happened. Please try again later.');
  }
}
