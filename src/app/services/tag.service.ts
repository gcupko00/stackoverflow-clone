import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {Tag} from "../../model/Tag";

@Injectable()
export class TagService {
  private postTagUrl = 'http://localhost:3000/post-tag';
  private getTagsUrl = 'http://localhost:3000/tags/';
  private getTagUrl = 'http://localhost:3000/tag/';

  constructor(private http: Http) { }

  postTag(tag: Tag) : Observable<Tag> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let localStorageJSON = JSON.parse(localStorage.getItem('currentUser'));
    if (localStorageJSON != null) {
      localStorageJSON = JSON.parse(localStorage.getItem('currentUser'));
      headers.append('Authorization', 'Bearer ' + localStorageJSON.token);
    }

    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.postTagUrl, JSON.stringify(tag), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTag(name: String) : Observable<Tag> {
    return this.http.get(this.getTagUrl + name)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTags(page: Number, filter: String) : Observable<Tag[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getTagsUrl + page.toString(), JSON.stringify({filter: filter}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    if (body)
      return body.data;
    else
      return { };
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
