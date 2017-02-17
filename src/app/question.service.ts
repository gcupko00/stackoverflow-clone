import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {
  private questionUrl = 'http://localhost:3000/question/58a73c601072fde2ec7aff73';

  constructor(private http: Http) { }

  getQuestion(): Observable<Question> {
    return this.http.get(this.questionUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body.data);
    return body.data || { };
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

export class Question {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public tags: string[],
    public rating: number,
    public answers: number,
    public views: number
  ) { }
}
