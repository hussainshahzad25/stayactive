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
  searchDiscount(policyNumber: string, memberId: string): Observable<any> {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser.token;
    console.log("Token :: " + token);

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + currentUser.token });
    let options = new RequestOptions({ headers: headers });

    var obj = JSON.parse(JSON.stringify({ policyNumber: policyNumber, memberId: memberId }));
    console.log("Search Body :: " + JSON.stringify({ policyNumber: policyNumber, memberId: memberId }));
    return this.http.post('http://172.16.27.9:8090/searchDiscount', obj)

      .map((response: Response) => {
        let user = response.json();
        return user;
      });
  }

  update(policyNumber: string, memberId: string, quarterNumber: string, adminDiscount: string, reason: string) {

    // alert(quarterNumber);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let user = currentUser.user;

    let username = user.username;
    console.log("username:: " + user.username);


    console.log("Input Value :: " + JSON.stringify({ policyNumber: policyNumber, memberId: memberId, quarterNumber: quarterNumber, adminDiscount: adminDiscount, updatedBy: username, reason: reason }));
    var obj = JSON.parse(JSON.stringify({ policyNumber: policyNumber, memberId: memberId, quarterNumber: quarterNumber, adminDiscount: adminDiscount, updatedBy: username, reason: reason }));
    return this.http.post('http://172.16.27.9:8090/updateDiscount', obj)
      .map((response: Response) => {
        let user = response.json();

        console.log("User Value :: " + JSON.stringify(user));
        return user;
        // if (user && user.token) {
        //   localStorage.setItem('currentUser', JSON.stringify(user));
        // }
      });
  }
}