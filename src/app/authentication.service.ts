import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  login(username: string, password: string):Observable<any> {
    // return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log(JSON.stringify({ username: username, password: password }));

    var obj = JSON.parse(JSON.stringify({ username: username, password: password }));
    return this.http.post('http://172.16.27.9:8090/login', obj)
    
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}