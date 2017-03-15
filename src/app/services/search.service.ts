import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Question} from "../../model/Question";

@Injectable()
export class SearchService {

  private shortSearchUrl = 'http://localhost:3000/short-search/';

  constructor(private http: Http) { }

  getPreviewResults(term: String): Observable<Question[]> {
    return this.http.get(this.shortSearchUrl + term)
      .map(this.extractShortSearchResults)
      .catch(this.handleError);
  }

  private extractShortSearchResults(res: Response) {
    let body = res.json();
    let questions = [];
    for (let obj of body.data) {
      obj.local._id = obj._id;
      questions.push(obj.local);
    }
    return questions || { };
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
