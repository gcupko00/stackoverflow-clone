import {Component, OnInit} from '@angular/core';
import {QuestionService, Question} from "../question.service";
import {ActivatedRoute} from "@angular/router";
import {Answer} from "../answer.service";

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  providers: [QuestionService],
  styleUrls: ['./question.component.css']
})

// This component will be used for a question page
export class QuestionComponent implements OnInit {
  private question: Question;
  private answers: Answer[] = [];
  private id;
  private answerWarn: boolean = false;
  private newAnswerText: string;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) {
    this.id = route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getQuestion();
  }

  private getQuestion() {
    this.questionService.getQuestion(this.id).subscribe(
      question => this.question = question,
      error => console.log(error)
    );
  }

  private getAnswers() {
    // get answers based on question id
  }

  private submitAnswer(inputAnswer: HTMLInputElement) {
    this.newAnswerText = inputAnswer.value;

    if (this.newAnswerText.length < 16) {
      this.answerWarn = true;
      return;
    }

    let answer = new Answer(null, this.newAnswerText, 0);

    // post answer
  }

  private removeAnswerWarn() {
    this.answerWarn = false;
  }
}
