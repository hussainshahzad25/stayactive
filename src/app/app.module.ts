import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DiscountComponent } from './discount/discount.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { DiscountService } from './discount/discount.service';

// FOR HASING
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [{
  'path': "",
  "component": LoginComponent
},{
  'path': "register",
  "component": RegisterComponent
},{
  'path': "discount",
  "component": DiscountComponent
},{
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
    LoginService, RegisterService,DiscountService, { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }