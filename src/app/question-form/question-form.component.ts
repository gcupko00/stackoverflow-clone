import { Component } from '@angular/core';

@Component({
  selector: 'question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent {
  private tags: string[] = [];

  constructor() {
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
}
