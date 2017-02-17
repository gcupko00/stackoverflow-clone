import { Component, OnInit } from '@angular/core';
import {QuestionService, Question} from "../question.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [QuestionService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  questions: Question[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getQuestion().subscribe(
      question => this.questions.push(question, question),
      error => console.log(error)
    );
  }
}
