import { Component, OnInit } from '@angular/core';
import { QuestionService, Question } from '../question.service';
import * as _ from 'lodash';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  providers: [QuestionService],
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = [];
  totalQuestionsCount: number;
  pages: number[] = [1];
  currentPage: number = 1;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit() {
    this.getQuestions();
  }

  private setPage(page: number) {
    if (page < 1 || page > this.pages.length) {
      return;
    }

    this.currentPage = page;

    this.getQuestions();
  }

  private getQuestions() {
    this.questionService.getQuestions(this.currentPage).subscribe(
      questions => this.questions = questions,
      error => console.log(error)
    );

    this.questionService.getQuestionsCount().subscribe(
      count => {
        this.totalQuestionsCount = count;
        this.pages = _.range(1, Math.ceil(this.totalQuestionsCount / 10) + 1);
      },
      error => console.log(error)
    );
  }
}
