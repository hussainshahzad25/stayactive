import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiscountService } from './discount.service';
import { User } from '../user';
import { Discountlist } from '../discountlist';
import { Discount } from '../discount';
import { AlertService } from '../alert.service';
import { AuthenticationService } from '../authentication.service';

import { UserService } from '../user.service';
@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {


  ngOnInit() {
    // this.discountService
    //   .searchDiscount(this.model.policyNumber, this.model.memberId)
    //   .subscribe((res) => {
    //     this.object = res;
    //     this.quarters = res.discountQuarters;
    //     this.adminQuarters = res.adminQuarters;
    //   },
    //   error => {
    //     this.alertService.error("Discount Not Found ? Please check Policy Number and Member Id");
    //     this.loading = false;
    //   });
  }
  loading = false;
  model: any = {
    policyNumber: "",
    memberId: "",
    quarterNumber: 0,
    adminDiscount: "",
    reason: ""
  };
  res: any;
  currentUser: User;
  private object: any;
  private quarters: any;
  private adminQuarters: any;
  private editQ: any;
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
  constructor(private authenticationService: AuthenticationService, private alertService: AlertService, private discountService: DiscountService, private router: Router, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  searchDiscount(value) {
    this.loading = true;
    this.discountService
      .searchDiscount(this.model.policyNumber, this.model.memberId)
      .subscribe((res) => {
        this.object = res;
        // console.log(this.object.discountQuarters);
        console.log(res.discountQuarters);
        this.quarters = res.discountQuarters;
        console.log(res.adminQuarters);
        this.adminQuarters = res.adminQuarters;
      },
      error => {
        this.alertService.error("Discount Not Found ? Please check Policy Number and Member Id");
        this.loading = false;
      });
  }

  displayCondition(adminquarter: string, quarter: string) {
    if (adminquarter === quarter) {
      return true;
    }
  }


  clicked(quarter: any) {
    this.editQ = quarter;
    this.model.quarterNumber = quarter.quarterNumber;
    console.log(JSON.stringify(quarter));
  }


  update() {
    this.loading = true;
    console.log("check data", this.model);
    this.discountService.update(this.model.policyNumber, this.model.memberId, this.model.quarterNumber, this.model.adminDiscount, this.model.reason)
      .subscribe(
      data => {
        console.log(JSON.stringify(data));
      },
      error => {
        this.alertService.error("could not update Discount");
        this.loading = false;
      });
  }

  // ngOnInit() {
  //   this.loadAllUsers();
  // }

  // private loadAllUsers() {
  //   this.userService.getAll().subscribe(users => { this.users = users; });
  // }
}