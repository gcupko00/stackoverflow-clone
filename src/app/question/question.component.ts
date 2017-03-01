import {Component, OnInit, ApplicationRef} from '@angular/core';
import {QuestionService, Question} from "../question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Answer, AnswerService} from "../answer.service";

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  providers: [QuestionService, AnswerService],
  styleUrls: ['./question.component.css']
})

// This component will be used for a question page
export class QuestionComponent implements OnInit {
  private question: Question;
  private id;
  private answerWarn: boolean = false;
  private newAnswerText: string;

  constructor(
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

  private getQuestion() {
    this.questionService.getQuestion(this.id).subscribe(
      question => this.question = question,
      error => console.log(error)
    );
  }

  private getAnswers() {
    this.answerService.getAnswers(this.id).subscribe(
      answers => this.question.answers = answers,
      error => console.log(error)
    );
  }

  rateQuestion(upDown: number) {
    this.questionService.rateQuestion(this.id, upDown).subscribe(
      status => {
        if (upDown < 0) this.question.rating--;
        else this.question.rating++;
      },
      error => console.log(error)
    );
  }

  private onSubmit(inputAnswer: HTMLInputElement) {
    this.newAnswerText = inputAnswer.value;

    if (this.newAnswerText.length < 16) {
      this.answerWarn = true;
      return;
    }

    let answer = new Answer(null, this.id, this.newAnswerText, 0);

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
