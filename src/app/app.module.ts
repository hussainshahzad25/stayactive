import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { HttpModule, BaseRequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule,FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DiscountComponent } from './discount/discount.component';

import { AlertComponent } from './alert/alert.component';
import { AuthGuard } from './auth.guard';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { DiscountService } from './discount/discount.service';

import { AlertService } from './alert.service';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';



// FOR HASING
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {
    'path': "",
    "component": DiscountComponent, canActivate: [AuthGuard]
  }, {
    'path': "login",
    "component": LoginComponent
  }, {
    'path': "register",
    "component": RegisterComponent
  }, {
    'path': "**",
    "component": PagenotfoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagenotfoundComponent,
    DiscountComponent,
    AlertComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),

  ],
  providers: [
    LoginService, RegisterService, DiscountService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }