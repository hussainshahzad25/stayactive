import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }
  
  login(username: string, password: string):Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log(JSON.stringify({ username: username, password: password }));

    var obj = JSON.parse(JSON.stringify({ username: username, password: password }));
    return this.http.post('http://172.16.27.9:8090/login', obj)
    
      .map((response: Response) => {        
        let user = response.json();
        console.log("User Object == ");
        console.log(JSON.stringify(user));
        if (user && user.token) {          
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  logout() {    
    localStorage.removeItem('currentUser');
  }
}