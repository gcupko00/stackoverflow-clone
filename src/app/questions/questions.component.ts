import { Component, OnInit } from '@angular/core';
import {QuestionService, Question} from "../question.service";

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  providers: [QuestionService],
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = [];

  constructor(private questionService: QuestionService) {
  }

  ngOnInit() {
    this.questionService.getQuestion().subscribe(
      question => this.questions.push(question, question, question, question, question),
      error => console.log(error)
    );
  }
}
