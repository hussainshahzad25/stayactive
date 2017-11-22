import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';
import { User } from '../user';
@Injectable()
export class DiscountService {

  private searchUrl: string = "http://172.16.27.9:8090/api/searchDiscount";
  constructor(private http: Http) { }
  // currentUser: User;
  // searchDiscount(body: Object): Observable<any> {
  //   var currentUser = localStorage.getItem('currentUser');
  //   console.log(currentUser);
  //   // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this
  //     .http
  //     .post(this.searchUrl, body, options)
  //     .map((res: Response) => {
  //       console.log(JSON.stringify(res));
  //     });
  // }

  searchDiscount(policyNumber: string, memberId: string): Observable<any> {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser.token;
    console.log(token);

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + currentUser.token });
    let options = new RequestOptions({ headers: headers });

    var obj = JSON.parse(JSON.stringify({ policyNumber: policyNumber, memberId: memberId }));
    console.log("Search Body :: " + JSON.stringify({ policyNumber: policyNumber, memberId: memberId }));
    return this.http.post('http://172.16.27.9:8090/searchDiscount', obj)

      .map((response: Response) => {
        let user = response.json();
        return user;
        // console.log(JSON.stringify(user));
      });
  }
}