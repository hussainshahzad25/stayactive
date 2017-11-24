import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  login(username: string, password: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // console.log(JSON.stringify({ username: username, password: password }));
    var obj = JSON.parse(JSON.stringify({ username: username, password: password }));
    return this.http.post('http://172.16.27.9:8090/login', obj)
      .map((response: Response) => {
        let user = response.json();
        // console.log(JSON.stringify(user));
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }


  update(policyNumber: string, memberId: string, quarterNumber: number, adminDiscount: string, reason: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let user = currentUser.user;

    let username = user.username;
    console.log("username:: "+user.username);


    console.log("Input Value :: "+JSON.stringify({ policyNumber: policyNumber, memberId: memberId, quarterNumber:quarterNumber,adminDiscount:adminDiscount,updatedBy:username ,reason:reason}));
    var obj = JSON.parse(JSON.stringify({ policyNumber: policyNumber, memberId: memberId, quarterNumber:quarterNumber,adminDiscount:adminDiscount,updatedBy:username ,reason:reason}));
    return this.http.post('http://172.16.27.9:8090/updateDiscount', obj)
    .map((response: Response) => {
      let user = response.json();    
      
      console.log("User Value :: "+JSON.stringify(user));
      return user; 
      // if (user && user.token) {
      //   localStorage.setItem('currentUser', JSON.stringify(user));
      // }
    });
  }

 
}