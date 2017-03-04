import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SignupService {
  private signupUrl = 'http://localhost:3000/signup';

  constructor(private http: Http) { }

  postUser(user: User): Observable<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.signupUrl, JSON.stringify(user), options)
      .map(this.extractUserData)
      .catch(this.handleError);
  }

  private extractUserData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

export class User {
  constructor(
    public _id: string,
    public username: string,
    public email: string,
    public password: string,
    public imageUrl: string,
    public reputation: number) {
  }
}
