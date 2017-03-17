import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from "../../model/User";

@Injectable()
export class LoginService {
  private loginUrl = 'http://localhost:3000/login';
  public token: string;
  public username: string;

  constructor(private http: Http, private router: Router) {
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

  public extractUserData(res: Response) {
    let token = res.json() && res.json().token;

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

  public logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    this.username = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
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
