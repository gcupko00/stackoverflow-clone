import { Component } from '@angular/core';
import { QuestionService } from "../services/question.service";
import { Router } from "@angular/router";
import { AuthGuardService } from "../services/auth-guard.service";
import { Question } from "../../model/Question";

@Component({
  selector: 'question-form',
  templateUrl: './question-form.component.html',
  providers: [QuestionService, AuthGuardService],
  styleUrls: ['./question-form.component.css']
})

export class QuestionFormComponent {
  private newQuestion: Question;

  private title: string = "";
  private description: string = "";
  private tags: string[] = [];

  private titleWarn: boolean = false;
  private descriptionWarn: boolean = false;
  private tagsWarn: boolean = false;

  submitted = false;

  constructor(
    private authGuardService: AuthGuardService,
    private questionService: QuestionService,
    private router: Router) {

    if (!this.authGuardService.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
  }

  private addTag(input: HTMLInputElement) {
    const value = input.value;

    if(value.trim()) {
      this.tags.push(value);
      input.value = "";
    }
  }

  private deleteTag(tag: string) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }

  private onSubmit(inputTitle: HTMLInputElement, inputDescription: HTMLInputElement) {
    this.title = inputTitle.value;
    this.description = inputDescription.value;

    if (this.title.length < 16)
      this.titleWarn = true;

    if (this.description.length < 64)
      this.descriptionWarn = true;

    if (this.tags.length == 0)
      this.tagsWarn = true;

    if (this.titleWarn || this.descriptionWarn || this.tagsWarn)
      return;

    let question = new Question(null, this.title, this.description, this.tags, 0, 0, 0, null, this.authGuardService.getUser());

    this.questionService.addQuestion(question).subscribe(
      question => {
        this.newQuestion = question;
        this.router.navigateByUrl('question/' + question._id);
      },
      error => console.log(error)
    );
  }

  private removeTitleWarn() {
    this.titleWarn = false;
  }

  private removeDescriptionWarn() {
    this.descriptionWarn = false;
  }

  private removeTagsWarn() {
    this.tagsWarn = false;
  }
}
