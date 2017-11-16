import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {RegisterService} from './register.service';

@Component({
  selector: 'app-register', 
  templateUrl: './register.component.html', 
  styleUrls: ['./register.component.css']})
export class RegisterComponent  {

  info = [];

  infos = [];

  user = [];
  constructor(private registerService : RegisterService,private router: Router) {}

  register(value) {

    let jsonData = JSON.stringify(value);
    console.log(jsonData);
    
    this
      .registerService
      .register(value)
      .subscribe(response =>{
        this.user = response
        this.router.navigate(['/']);
      });
  }

  

}