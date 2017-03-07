import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { forEach } from "@angular/router/src/utils/collection";
import {Question} from "../../model/Question";
import {User} from "../../model/User";

@Injectable()
export class QuestionService {
  private questionUrl = 'http://localhost:3000/question/';
  private questionsUrl = 'http://localhost:3000/questions/';
  private topQuestionsUrl= 'http://localhost:3000/top-questions';
  private postQuestionUrl = 'http://localhost:3000/post-question';

  constructor(private http: Http) { }

  getQuestion(_id: string): Observable<Question> {
    return this.http.get(this.questionUrl + _id)
      .map(this.extractQuestionData)
      .catch(this.handleError);
  }

  getQuestions(criteria: string, page: number): Observable<Question[]> {
    return this.http.get(this.questionsUrl + criteria + "/" + page.toString())
      .map(this.extractQuestionsData)
      .catch(this.handleError)
  }

  getTopQuestions(): Observable<Question[]> {
    return this.http.get(this.topQuestionsUrl)
      .map(this.extractQuestionsData)
      .catch(this.handleError)
  }

  addQuestion(question: Question): Observable<Question> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    /* TODO: callat kao metodu iz nekog servisa */
    var localStorageJSON = JSON.parse(localStorage.getItem('currentUser'));
    if (localStorageJSON != null) {
      var localStorageJSON = JSON.parse(localStorage.getItem('currentUser'));
      headers.append('Authorization', 'Bearer ' + localStorageJSON.token);
    }

    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.postQuestionUrl, JSON.stringify(question), options)
      .map(this.extractQuestionData)
      .catch(this.handleError);
  }

  getQuestionsCount(criteria: string): Observable<number> {
    return this.http.get("http://localhost:3000/question-count/" + criteria)
      .map(count => count.json().totalQuestionsCount)
      .catch(this.handleError)
  }

  rateQuestion(id: string, user: User, upDown: number): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.questionUrl + id + "/rate", JSON.stringify(Object.assign({}, {upDown: upDown}, {user: user._id})), { headers: headers })
      .map(res => res.ok)
      .catch(this.handleError);
  }

  private extractQuestionData(res: Response) {
    let body = res.json();
    body.data.local._id = body.data._id;
    return body.data.local || { };
  }

  private extractQuestionsData(res: Response) {
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
