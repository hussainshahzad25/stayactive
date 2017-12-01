import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatDialogModule, MdDialogRef, MDCDialog } from '@material/dialog';


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


  constructor(private authenticationService: AuthenticationService, private alertService: AlertService, private discountService: DiscountService, private router: Router, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() closeModalEvent = new EventEmitter<boolean>();

  ngOnInit() {
  }
  loading = false;
  model: any = {
    policyNumber: "",
    memberId: "",
    quarterNumber: 0,
    adminDiscount: "",
    reason: ""
  };
  res: {};
  currentUser: User;
  private object: {};
  private quarters: {};
  private adminQuarters: {};
  private editQ: {};
  abc = {
    "riskStartDate": "20/10/2016",
    "memberId": "10008098757",
    "policyNumber": "AA00187296",
    "days": "398",
    "lastCalculationOn": "29/09/2017"
  };

  modalVisible = true;
  dialogRef: MdDialogRef<any>;

  searchDiscount(value) {
    this.loading = true;
    this.discountService
      .searchDiscount(this.model.policyNumber, this.model.memberId)
      .subscribe((res) => {
        this.object = res;
        console.log("Total Qtr :: " + res.discountQuarters);
        this.quarters = res.discountQuarters;
        console.log("Admin Qtr :: " + res.adminQuarters);
        this.adminQuarters = res.adminQuarters;
      },
      error => {
        this.object =null;
        this.quarters =null;
        this.adminQuarters =null;
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
        // this.modalVisible = false;
        // MDCDialog.close() 
        // this.dialogRef.close();
        // this.dialogRef.afterClosed();
        this.alertService.success("Discount Update Success");
        this.discountService
          .searchDiscount(this.model.policyNumber, this.model.memberId)
          .subscribe((res) => {
            this.object = res;
            console.log("Total Qtr :: " + res.discountQuarters);
            this.quarters = res.discountQuarters;
            console.log("Admin Qtr :: " + res.adminQuarters);
            this.adminQuarters = res.adminQuarters;
          });

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