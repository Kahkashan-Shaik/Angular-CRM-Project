import { HashLocationStrategy, LocationStrategy   } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// admin module for admin operations
import {AdminModule} from './admin/admin.module';
// Login Module for authentications
import {AuthModule} from './auth/auth.module';
// importing Intercepter class
// import { httpInterceptorProviders } from './http-interceptors/index';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
    
  ],
  providers: [
    // httpInterceptorProviders
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
