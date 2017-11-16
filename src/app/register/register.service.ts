import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs';

@Injectable()
export class RegisterService {   
     
    private registerUrl : string = "http://172.16.27.9:8090/register";
    constructor(private http : Http) {}

    register(body : Object) : Observable < any > {
        // let json = JSON.stringify(body);
        // console.log(json);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this
            .http
            .post(this.registerUrl, body, options)
            .map((res : Response) => alert("register Success"));        
    }
}