
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = environment.ApiUrl;
  errorData:any=[];
  
  constructor(private http: HttpClient) {
    
   }

  redirectUrl:any;

  login(email: string, password: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    headers.append('GET', 'POST');
    let options = {headers: headers};
    return this.http.post<any>(`${this.serverUrl+'login'}`, {uemail: email, password: password}, options)
    .pipe(map(user => {
      console.log(user);
        if (user && user.access_token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      }),
      
      catchError(this.handleError)
    );
  }

  
  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.access_token;
  }

  logout() {
    localStorage.removeItem('currentUser');
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
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
