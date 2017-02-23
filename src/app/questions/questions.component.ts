import { Component, OnInit } from '@angular/core';
import { QuestionService, Question } from '../question.service';
import * as _ from 'lodash';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  providers: [QuestionService],
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  private selectedId: number;

  private questions: Question[] = [];
  private totalQuestionsCount: number;
  private pages: number[] = [1];
  private currentPage: number = 1;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getQuestions();

    this.route.params.subscribe(params => {
      this.selectedId = +params['id'];
    });
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

    // install lodash using command
    // > npm install @types/lodash@ts2.0
    this.questionService.getQuestionsCount().subscribe(
      count => {
        this.totalQuestionsCount = count;
        this.pages = _.range(1, Math.ceil(this.totalQuestionsCount / 10) + 1);
      },
      error => console.log(error)
    );
  }

  private onSelect(question: Question) {
    this.router.navigate(['/hero', question._id]);
  }
}
