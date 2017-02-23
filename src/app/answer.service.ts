import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class AnswerService {
  private answersUrl: string;

  constructor(private http: Http) { }

  getAnswers(): Observable<Answer[]> {
    return this.http.get(this.answersUrl)
      .map(this.extractAnswersData)
      .catch(this.handleError);
  }

  private extractAnswersData(res: Response) {
    let body = res.json();
    let answers = [];
    for (let obj of body.data) {
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
    public text: string,
    public rating: number,
  ) { }
}
