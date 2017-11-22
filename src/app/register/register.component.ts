import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdminComponent } from '../admin/admin.component';
import { AlertService } from '../alert.service';
import { UserService } from '../user.service';


@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html'
})

export class RegisterComponent {


  selectedRole: AdminComponent = new AdminComponent(2, 'ADMIN');
  roles = [
    new AdminComponent(1, 'USER'),
    new AdminComponent(2, 'ADMIN'),
    new AdminComponent(3, 'SUPERADMIN')
  ];


  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  register() {
    console.log("going to create account");
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
      data => {
        this.alertService.success('Registration successful', true);
        this.router.navigate(['/login']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }
}


// import {Component} from '@angular/core';
// import { Router } from '@angular/router';
// import {RegisterService} from './register.service';

// @Component({
//   selector: 'app-register', 
//   templateUrl: './register.component.html', 
//   styleUrls: ['./register.component.css']})
// export class RegisterComponent  {

//   info = [];

//   infos = [];

//   user = [];
//   constructor(private registerService : RegisterService,private router: Router) {}

//   register(value) {

//     let jsonData = JSON.stringify(value);
//     console.log(jsonData);

//     this
//       .registerService
//       .register(value)
//       .subscribe(response =>{
//         this.user = response
//         this.router.navigate(['/']);
//       });
//   }

// }