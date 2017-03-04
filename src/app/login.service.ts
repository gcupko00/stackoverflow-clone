import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { User } from "./signup.service";
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  private loginUrl = 'http://localhost:3000/login';
  public token: string;
  public username: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.username = currentUser && currentUser.username;
  }

  public getUsername() {
    var localStorageJSON = JSON.parse(localStorage.getItem('currentUser'));
    if (localStorageJSON != null)
      return localStorageJSON.username;
    return null;
  }

  public getToken() {
    var localStorageJSON = JSON.parse(localStorage.getItem('currentUser'));
    if (localStorageJSON != null)
      return localStorageJSON.token;
    return null;
  }

  public postUser(user: User): Observable<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.loginUrl, JSON.stringify(user), options)
      .map(this.extractUserData)
      .catch(this.handleError);
  }

  private extractUserData(res: Response) {
    let token = res.json() && res.json().token;

    if (token) {
      this.token = token;
      this.username = res.json().username;

      // store username and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify({ username: res.json().username, token: token }));
      return true;
    }

    return false;
  }

  public logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    this.username = null;
    localStorage.removeItem('currentUser');
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
