import {Component, OnInit, OnDestroy} from '@angular/core';
import { QuestionService, Question } from '../question.service';
import * as _ from 'lodash';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  providers: [QuestionService],
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  private criteria: string = 'new';

  private sub: any;

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
    this.sub = this.route.params.subscribe(params => {
      if (params['criteria'] == 'top' || params['criteria'] == 'new' || params['criteria'] == 'unanswered')
        this.criteria = params['criteria'];
      this.getQuestions();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private setPage(page: number) {
    if (page < 1 || page > this.pages.length) {
      return;
    }

    this.currentPage = page;

    this.getQuestions();

    document.body.scrollTop = 0;
  }

  private getQuestions() {
    this.questionService.getQuestions(this.criteria, this.currentPage).subscribe(
      questions => this.questions = questions,
      error => console.log(error)
    );

    // install lodash using command
    // > npm install @types/lodash@ts2.0
    this.questionService.getQuestionsCount(this.criteria).subscribe(
      count => {
        this.totalQuestionsCount = count;
        this.pages = _.range(1, Math.ceil(this.totalQuestionsCount / 10) + 1);
      },
      error => console.log(error)
    );
  }
}
