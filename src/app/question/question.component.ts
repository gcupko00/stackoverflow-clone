import { Component, OnInit } from '@angular/core';
import { QuestionService } from "../services/question.service";
import { ActivatedRoute } from "@angular/router";
import { AnswerService } from "../services/answer.service";
import { AuthGuardService } from "../services/auth-guard.service";
import { Question } from "../../model/Question";
import { Answer } from "../../model/Answer";

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
  private sub: any;

  constructor(
    private authGuardService: AuthGuardService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    // this.getAnswers();
    this.sub = this.route.params.subscribe(
        params => this.paramsChanged(params['id'])
    );
  }

  private paramsChanged(id: String) {
    this.id = id;
    this.getQuestion();
  }

  rateQuestion(upDown: number) {
    // loš pokušaj
    console.log(this.authGuardService.getUser().ratedQuestions.indexOf(this.id) >= 0);
    if (!this.authGuardService.isLoggedIn()
      || this.authGuardService.getUser().ratedQuestions.indexOf(this.id) >= 0) return;

    this.questionService.rateQuestion(this.id, this.authGuardService.getUser(), upDown).subscribe(
      status => {
        if (upDown < 0) this.question.rating--;
        else this.question.rating++;
        this.authGuardService.getUser().ratedQuestions.push(this.id);
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

  private onSubmit() {
    if (this.newAnswerText.length < 16) {
      this.answerWarn = true;
      return;
    }

    let answer = new Answer(null, this.id, this.newAnswerText, 0, this.authGuardService.getUser());

    // post answer
    this.answerService.addAnswer(answer).subscribe(
      answer => {
        this.question.answersCount++;
        this.question.answers.push(answer);
        this.newAnswerText = "";
      },
      error => console.log(error)
    );
  }

  private removeAnswerWarn() {
    this.answerWarn = false;
  }
}
