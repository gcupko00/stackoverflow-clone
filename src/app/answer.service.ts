import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class AnswerService {
  private postAnswerUrl = 'http://localhost:3000/post-answer';
  private getAnswersUrl = 'http://localhost:3000/answers/';

  constructor(private http: Http) { }

  getAnswers(_id: string): Observable<Answer[]> {
    return this.http.get(this.getAnswersUrl + _id)
      .map(this.extractAnswersData)
      .catch(this.handleError);
  }

  addAnswer(answer: Answer): Observable<Answer> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.postAnswerUrl, JSON.stringify(answer), options)
      .map(res => console.log(res))
      .catch(this.handleError);
  }

  private extractAnswersData(res: Response) {
    let body = res.json();
    let answers = [];
    for (let obj of body.data) {
      obj.local._id = obj._id;
      answers.push(obj.local);
    }
    return answers || { };
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

export class Answer {
  constructor(
    public _id: string,
    public _question: string,
    public text: string,
    public rating: number
  ) { }
}
