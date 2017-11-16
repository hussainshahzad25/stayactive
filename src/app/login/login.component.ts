// import { Component, OnInit } from '@angular/core';

// import { Router, ActivatedRoute } from '@angular/router';
// import { LoginService } from "./login.service"
// import { AlertService } from '../alert.service';
// import { AuthenticationService } from '../authentication.service';

// // import 'rxjs/add/operator/map';
// // import 'rxjs/add/operator/catch';
// // import 'rxjs/add/observable/throw';
// // import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   shortInfo = [];
//   fullInfo = [];
//   user = [];

//   model: any = {};
//   loading = false;
//   returnUrl: string;


//   constructor(private loginService: LoginService, private route: ActivatedRoute,
//     private router: Router,
//     private authenticationService: AuthenticationService,
//     private alertService: AlertService) { }

//   ngOnInit() {
//     this.authenticationService.logout();
//     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//   }

//   message: string;
//   login(value) {
//     this.loading = true;
//     this
//       .loginService
//       .login(value)
//       .subscribe(data => {
//         console.log("Data : " + JSON.stringify(data));
//         this.router.navigate(['/discount']);
//       }, error => {
//         console.log(JSON.parse(error._body));
//         this.alertService.error(error);
//         this.loading = false;

//       });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../alert.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }
}

