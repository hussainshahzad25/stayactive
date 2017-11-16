import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DiscountService } from './discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent {

  user = [];
  constructor(private discountService: DiscountService, private router: Router) { }

  searchDiscount(value) {

    this
      .discountService
      .searchDiscount(value)
      .subscribe(response => {
        this.user = response
        //this.router.navigate(['/discount']);
      });
  }



}