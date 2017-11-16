import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';

@Injectable()
export class DiscountService {

  private searchUrl: string = "http://172.16.27.9:8090/api/searchDiscount";
  constructor(private http: Http) { }

  searchDiscount(body: Object): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this
      .http
      .post(this.searchUrl, body, options)
      .map((res: Response) => {
        console.log(JSON.stringify(res));
      });
  }
}