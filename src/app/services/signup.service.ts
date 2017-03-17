import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from "../../model/User";

@Injectable()
export class SignupService {
  private signupUrl = 'http://localhost:3000/signup';

  public token: string;
  public username: string;

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
    let token = res.json() && res.json().token;
    console.log(res.json());

    if (token) {
      this.token = token;
      this.username = res.json().user.username;
      // store username and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify({ username: res.json().user.username, token: token }));
      localStorage.setItem('user', JSON.stringify(res.json().user));
      return true;
    }

    return false;
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
