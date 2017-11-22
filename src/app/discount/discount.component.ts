import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DiscountService } from './discount.service';
import { User } from '../user';
import { Discountlist } from '../discountlist';
import { Discount } from '../discount';


import { UserService } from '../user.service';
@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent {


  model: any = {};
  res: any;
  currentUser: User;
  private object: any;
  private quarters: any;
  private adminQuarters: any;
  abc = {
    "riskStartDate": "20/10/2016",
    "memberId": "10008098757",
    "policyNumber": "AA00187296",
    "days": "398",
    "lastCalculationOn": "29/09/2017"
  };

  // users: User[] = [];
  // object: Discount;  
  // public discountObject: Discountlist;
  constructor(private discountService: DiscountService, private router: Router, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }


  searchDiscount(value) {
    // this
    //   .discountService
    //   .searchDiscount(value)
    //   .subscribe(response => {
    //     this.user = response
    //     //this.router.navigate(['/discount']);
    //   });
    this.discountService
      .searchDiscount(this.model.policyNumber, this.model.memberId)
      .subscribe((res) => {
        this.object = res;
        console.log(res.policyNumber);
        // console.log("response1: " + this.object);
        console.log("response2: " + JSON.stringify(this.object));
        console.log(res.discountQuarters);
        this.quarters = res.discountQuarters;
        console.log(res.adminQuarters);
        this.adminQuarters = res.adminQuarters;

      });
  }

  displayCondition(adminquarter: String, quarter: string) {
    if (adminquarter === quarter) {
      return true;
    }
  }
  // ngOnInit() {
  //   this.loadAllUsers();
  // }

  // private loadAllUsers() {
  //   this.userService.getAll().subscribe(users => { this.users = users; });
  // }
}