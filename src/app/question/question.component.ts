import {Component, OnInit, ApplicationRef} from '@angular/core';
import {QuestionService} from "../services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AnswerService} from "../services/answer.service";
import {AuthGuardService} from "../services/auth-guard.service";
import {Question} from "../../model/Question";
import {Answer} from "../../model/Answer";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  providers: [QuestionService, AnswerService, AuthGuardService],
  styleUrls: ['./question.component.css']
})

// This component will be used for a question page
export class QuestionComponent implements OnInit {
  private question: Question;
  private answers: Answer[];
  private id;
  private answerWarn: boolean = false;
  private newAnswerText: string;
  private showLogIn: boolean = true;
  private showSignUp: boolean = false;
  public isCollapsed: boolean = true;

  constructor(
    private authGuardService: AuthGuardService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private route: ActivatedRoute
  ) {
    this.id = route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getQuestion();
    // this.getAnswers();
  }

  rateQuestion(upDown: number) {
    if (!this.authGuardService.isLoggedIn()) return;

    this.questionService.rateQuestion(this.id, this.authGuardService.getUser(), upDown).subscribe(
      status => {
        if (upDown < 0) this.question.rating--;
        else this.question.rating++;
      },
      error => console.log(error)
    );
  }

  logInSignUpSwitch() {
    this.showLogIn = !this.showLogIn;
    this.showSignUp = !this.showSignUp;
  }

  private getQuestion() {
    this.questionService.getQuestion(this.id).subscribe(
      question => {
        console.log(question);
        this.question = question;
        this.answers = this.question.answers;
      },
      error => console.log(error)
    );
  }

  private getAnswers() {
    this.answerService.getAnswers(this.id).subscribe(
      answers => this.question.answers = answers,
      error => console.log(error)
    );
  }

  private onSubmit(inputAnswer: HTMLInputElement) {
    this.newAnswerText = inputAnswer.value;

    if (this.newAnswerText.length < 16) {
      this.answerWarn = true;
      return;
    }

    let answer = new Answer(null, this.id, this.newAnswerText, 0, null);

    // post answer
    this.answerService.addAnswer(answer).subscribe(
      answer => {
        this.question.answersCount++;
        this.question.answers.push(answer);
      },
      error => console.log(error)
    );
  }

  private removeAnswerWarn() {
    this.answerWarn = false;
  }
}
