import { Component } from '@angular/core';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent {
  public title: string = "Question title example";
  public description: string = "Lorem ipsum dolor sit amet, interdum nulla, nec quam, feugiat nisl. " +
    "Ac lacinia, a in. Penatibus sit suscipit, vel nam. Et praesent parturient, pharetra nunc mauris. Id arcu.";
  public date: Date = new Date();
  public tags: string[] = ["css", "bootstrap", "javascript"];

  public rating: number = 14;
  public answers: number = 3;
  public views: number = 230;

  constructor() {
  }
}
