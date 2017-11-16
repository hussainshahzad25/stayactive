// import { Injectable, OnInit } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

// import { Observable } from 'rxjs';
// @Injectable()
// export class LoginService implements OnInit {

//     private userListUrl: string = "http://localhost:8090/api/userList";
//     private registerUrl: string = "http://localhost:8090/api/register";
//     private loginUrl: string = "http://172.16.27.9:8090/login";

//     constructor(private http: Http, private router: Router) { }
//     ngOnInit() { }

//     getInfo() {
//         return [
//             {
//                 "id": 1,
//                 "firstName": "Shahzad",
//                 "lastName": "Hussain",
//                 "email": "shahzad@gmail.com"
//             }, {
//                 "id": 2,
//                 "firstName": "Gaurav",
//                 "lastName": "Bhoparia",
//                 "email": "gaurav@gmail.com"
//             }
//         ]

//     }

//     getInfos(): Observable<any> {
//         return this
//             .http
//             .get(this.userListUrl)
//             .map((response: Response) => response.json())
//             .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
//     }

//     login(body: Object): Observable<any> {
//         let headers = new Headers({ 'Content-Type': 'application/json' });
//         let options = new RequestOptions({ headers: headers });

//         return this
//             .http
//             .post(this.loginUrl, body, options)
//             .map((res: Response) => {
//                 let data = res.json();
//                 console.log(data);
//                 return data;
//             });

//     }
// }


import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../user';

@Injectable()
export class LoginService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}